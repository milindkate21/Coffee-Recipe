import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, IconButton, Avatar, MD3Colors, Modal, Portal, Text } from "react-native-paper";
import styles from "./style";
import { AuthContext } from "../../contexts/AuthContext";

const LikePage = () => {
  const { fetchUserLikedPosts, updateLikeStatus } = useContext(AuthContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = { backgroundColor: 'white', paddingBottom: 10, paddingHorizontal: 10 };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const likedPosts = await fetchUserLikedPosts();
      setLikedPosts(likedPosts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    }
  };

  const handleLikePress = async (postId, liked) => {
    try {
      await updateLikeStatus(postId, liked);
      fetchData();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalVisible(false);
  };

  const CustomCard = ({ post, onLikePress }) => {
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => openModal(post)}>
          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Avatar.Image source={{ uri: post.imageUrl }} size={60} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{post.title}</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon={post.liked ? "heart" : "heart-outline"}
                iconColor={post.liked ? MD3Colors.error50 : MD3Colors.secondary50}
                size={20}
                onPress={() => handleLikePress(post.id, !post.liked)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={likedPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CustomCard post={item} />}
      />

      <Portal>
        <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={containerStyle} style={{ marginHorizontal: 30 }}>
          {selectedPost && (
            <>
              <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                <Text style={{marginTop:10}} variant="titleLarge">{selectedPost.title}</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={closeModal}
                />
              </View>
              <Text variant="bodyLarge">
                {selectedPost.description}
              </Text>
            </>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

export default LikePage;