import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  FAB,
  MD3Colors,
  ActivityIndicator,
} from "react-native-paper";
import styles from "./style";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation, useIsFocused} from "@react-navigation/native";

const PostScreen = ({}) => {
  const { fetchPosts, fetchUserLikedPosts, updateLikeStatus } =
    useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [userLikedPostIds, setUserLikedPostIds] = useState([]);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isFocused = useIsFocused(); 

  const loadPosts = async () => {
    try {
      const allPosts = await fetchPosts();
      setPosts(allPosts);

      const likedPosts = await fetchUserLikedPosts();
      setUserLikedPostIds(likedPosts.map((post) => post.id));
      setLoading(false);
    } catch (error) {
      console.error("Error loading posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadPosts();
    }
  }, [isFocused]);

  const handleLikePress = async (postId, liked) => {
    try {
      await updateLikeStatus(postId, liked);

      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, liked } : post
      );
      setPosts(updatedPosts);

      const updatedLikedPostIds = liked
        ? [...userLikedPostIds, postId]
        : userLikedPostIds.filter((id) => id !== postId);
      setUserLikedPostIds(updatedLikedPostIds);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleFABPress = () => {
    navigation.navigate("AddPost");
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset > 0 && currentOffset > offset) {
      setScrollingUp(true);
    } else {
      setScrollingUp(false);
    }
    setOffset(currentOffset);
  };

  const toggleDescription = (postId) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const renderPostCard = ({ item: post }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <View>
          <Card.Cover source={{ uri: post.image }} style={styles.cardImage} />

          <View style={styles.rightContent}>
            <IconButton
              icon={
                userLikedPostIds.includes(post.id) ? "heart" : "heart-outline"
              }
              iconColor={
                userLikedPostIds.includes(post.id)
                  ? MD3Colors.error50
                  : MD3Colors.secondary50
              }
              size={28}
              style={styles.likeIcon}
              onPress={() =>
                handleLikePress(post.id, !userLikedPostIds.includes(post.id))
              }
            />

            <Title style={styles.title}>{post.title}</Title>
          </View>

          <View style={styles.costRatingContainer}>
            <View style={styles.leftContent}>
              <Paragraph
                numberOfLines={showFullDescription[post.id] ? undefined : 2}
                style={styles.descriptionStyle}
              >
                Description: {post.description}
              </Paragraph>

              {post.description.length > 35 && (
                <Text
                  onPress={() => toggleDescription(post.id)}
                  style={styles.showMoreText}
                >
                  {showFullDescription[post.id] ? "Show Less" : "Show More"}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={MD3Colors.primary50}
          size="large"
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={renderPostCard}
          onScroll={handleScroll}
        />
      )}

      <FAB
        style={[styles.fab, scrollingUp ? styles.hidden : null]}
        icon="plus"
        onPress={handleFABPress}
      />
    </View>
  );
};

export default PostScreen;