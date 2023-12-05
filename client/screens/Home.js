import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/postContext";
import PostCard from "../components/PostCard";
import Dashboard from "./admin/Dashboard";
import MyPosts from "./MyPosts";

const Home = () => {
  //global state
  const [state] = useContext(AuthContext);

  const userRole = state?.user.role;

  return (
    <View style={styles.container}>
      {userRole === "admin" ? (
        <>
          <Dashboard />
          <FooterMenu />
        </>
      ) : (
        <MyPosts />
      )}

      {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
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

export default Home;
