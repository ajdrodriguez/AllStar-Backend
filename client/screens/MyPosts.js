import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/PostCard";
import { PostContext } from "../context/postContext";

const MyPosts = () => {
  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getPosts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {}, [getAllPosts]);
  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
