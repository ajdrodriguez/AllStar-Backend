import { View, StyleSheet, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get User Posts Function
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-posts");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // Initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />
        {/*<Text>{JSON.stringify(posts, null, 4)}</Text>*/}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e7d7bc",
    flex: 1,
    paddingTop: 20,
    justifyContent: "space-between",
  },
});

export default MyPosts;
