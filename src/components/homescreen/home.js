import { View, SafeAreaView } from "react-native";
import styles from "./style";
import {
  IconButton,
  MD3Colors,
  Text,
  SegmentedButtons,
} from "react-native-paper";
import React from "react";
import PostScreen from "../postscreen/posts";
import LikePage from "../likescreen/likes";

const Home = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    setValue("posts");
  }, []);

  const handleProfileTap = () => {
    navigation.navigate("Logout");
  };

  const headerComponent = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.description}>
          What would you like to have today?
        </Text>
      </View>
      <View>
        <IconButton
          icon="account-circle"
          color={MD3Colors.primary50}
          size={50}
          onPress={handleProfileTap}
        />
      </View>
    </View>
  );

  const renderSegmentContent = () => {
    if (value === "posts") {
      return <PostScreen />;
    } else if (value === "likes") {
      return <LikePage />;
    } else {
      return null;
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {headerComponent()}
        <SegmentedButtons
          style={styles.segmentButton}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "posts",
              label: "Posts",
              icon: "post-outline",
            },
            {
              value: "likes",
              label: "Likes",
              icon: "heart",
            },
          ]}
        />
        {renderSegmentContent()}
      </SafeAreaView>
    </>
  );
};

export default Home;
