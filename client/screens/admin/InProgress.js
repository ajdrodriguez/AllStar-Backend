import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import FooterMenu from "../../components/Menus/FooterMenu";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/postContext";

const InProgress = () => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const filteredPosts = posts.filter(
    (post) => post.category === "Road Obstruction"
  );
  useEffect(() => {}, [getAllPosts]);
  //refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [posts]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={filteredPosts} />
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
    marginTop: 1,
    justifyContent: "space-between",
  },
});

export default InProgress;
