import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import FooterMenu from "../../../components/Menus/FooterMenu";
import PostCard from "../../../components/PostCard";
import { PostContext } from "../../../context/postContext";

const StrayAnimals = () => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const filteredPosts = posts.filter(
    (post) => post.category === "Stray Animals"
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
        {filteredPosts.length >= 1 ? (
          <PostCard posts={filteredPosts} />
        ) : (
          <Text style={{ color: "green", textAlign: "center", paddingTop: 10 }}>
            No reports yet...
          </Text>
        )}
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

export default StrayAnimals;
