import React, { createContext, useState, useEffect } from "react";
import { auth, database, storage } from "../database/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUid(parsedUser.uid);
        }
      } catch (error) {
        console.log("Error retrieving user from storage:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUid(authUser.uid);
        try {
          AsyncStorage.setItem("user", JSON.stringify(authUser));
        } catch (error) {
          console.log("Error storing user in storage:", error);
        }
      } else {
        setUser(null);
        setUid(null);

        try {
          AsyncStorage.removeItem("user");
        } catch (error) {
          console.log("Error removing user from storage:", error);
        }
      }
    });

    checkUser();

    return unsubscribe;
  }, []);


  const login = async (email, password) => {
    try {
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("key", password);
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("key", password);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { uid } = user;

      const usersRef = database.ref("users");

      usersRef.child(uid).set({ email });

      console.log("User registered successfully");
    } catch (error) {
      console.log("Signup error:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("key");
      await auth.signOut();
    } catch (error) {
      console.log("Logout error:", error);
      throw error;
    }
  };

  const fetchPosts = async () => {
    try {
      const postsRef = database.ref("posts");
      const snapshot = await postsRef.once("value");
      const postsData = snapshot.val();

      if (postsData) {
        const userLikesRef = database.ref(`likes/${uid}`);
        const userLikesSnapshot = await userLikesRef.once("value");
        const userLikesData = userLikesSnapshot.val();

        const postsArray = Object.keys(postsData).map((postId) => {
          const postLikesInfo = userLikesData && userLikesData[postId];
          return {
            id: postId,
            title: postsData[postId].title,
            description: postsData[postId].description,
            image: postsData[postId].imageUrl,
            liked: !!postLikesInfo,
          };
        });

        return postsArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  const fetchUserLikedPosts = async () => {
    try {
      const likedPostsRef = database.ref(`likes/${uid}`);
      const likedPostsSnapshot = await likedPostsRef.once("value");
      const likedPostsData = likedPostsSnapshot.val();

      if (likedPostsData) {
        const likedPostIds = Object.keys(likedPostsData);

        const postsRef = database.ref("posts");
        const postsSnapshot = await postsRef.once("value");
        const postsData = postsSnapshot.val();

        if (postsData) {
          const likedPosts = likedPostIds.map((postId) => ({
            id: postId,
            author: postsData[postId].author,
            title: postsData[postId].title,
            description: postsData[postId].description,
            imageUrl: postsData[postId].imageUrl,
            liked: true,
          }));
          return likedPosts;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching user liked posts:", error);
      throw error;
    }
  };

  const createPost = async (title, description, imageUrl) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const postsRef = database.ref("posts");
        const newPostRef = postsRef.push();
        await newPostRef.set({
          author: user.uid,
          title,
          description,
          imageUrl,
        });
        console.log("Post created successfully");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const updateLikeStatus = async (postId, liked) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userLikesRef = database.ref(`likes/${user.uid}`);

        if (liked) {
          // Add a like entry
          await userLikesRef.update({
            [postId]: true,
          });
        } else {
          // Remove the like entry
          await userLikesRef.child(postId).remove();
        }
      }

      // Refresh liked posts after like/unlike
      const likedPosts = await fetchUserLikedPosts();
      // Use the state setter function to update the context's state
      setUserLikedPosts(likedPosts);
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  };

  const uploadPost = async (title, description, imageUri) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user found");
        return;
      }

      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error("Image fetch failed");
      }
      const blob = await response.blob();
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/posts/${user.uid}/${Date.now()}`);
      const snapshot = await imageRef.put(blob);

      if (snapshot.state === "success") {
        const imageUrl = await imageRef.getDownloadURL();
        const postsRef = database.ref("posts");
        const newPostRef = postsRef.push();
        const postData = {
          author: user.uid,
          title: title,
          description: description,
          imageUrl: imageUrl,
        };
        await newPostRef.set(postData);
        console.log("Post data uploaded successfully");
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      throw error;
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        uid,
        login,
        signup,
        logout,
        fetchPosts,
        fetchUserLikedPosts,
        updateLikeStatus,
        createPost,
        uploadPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };