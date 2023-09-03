import React, { useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Appbar,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./style";
import Toast from 'react-native-root-toast';

const AddPostScreen = () => {
  const { uploadPost } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPost = () => {
    if (!title || !description || !imageUri) {
      let toast = Toast.show('Please fill in all the fields and select an image.', {
        duration: Toast.durations.LONG,
      });      
      return;
    }
    else{
      uploadPost(title, description, imageUri);

      let toast = Toast.show('Post uploaded successfully.', {
        duration: Toast.durations.LONG,
      });

      setTitle("");
      setDescription("");
      setImageUri("");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    try {
      setIsLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const pickedImageUri = result.assets[0].uri;
        setImageUri(pickedImageUri);
      } else {
        setImageUri(null);
      }
    } catch (error) {
      console.error("error->" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Add a New Post" />
      </Appbar.Header>

      <TextInput
        style={{ marginHorizontal: 20, marginTop: 10 }}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{ marginHorizontal: 20, marginTop: 10 }}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} color="blue" size="large" />
      ) : (
        <View style={styles.imageContainer}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button mode={"outlined"} onPress={pickImage} style={styles.button}>
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            Pick Image
          </Text>
        </Button>

        <Button
          mode={"contained-tonal"}
          onPress={handleAddPost}
          disabled={isLoading}
          style={styles.button}
        >
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            Upload Post
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default AddPostScreen;