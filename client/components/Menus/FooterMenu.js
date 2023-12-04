import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FooterMenu = () => {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name === "Home" ? "yellowgreen" : "white"}
        />
        <Text
          style={{ color: route.name === "Home" ? "yellowgreen" : "white" }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="camera"
          style={styles.iconStyle}
          color={route.name === "Post" ? "yellowgreen" : "white"}
        />
        <Text
          style={{ color: route.name === "Post" ? "yellowgreen" : "white" }}
        >
          Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("My Posts")}>
        <FontAwesome5
          name="list"
          style={styles.iconStyle}
          color={route.name === "My Posts" ? "yellowgreen" : "white"}
        />
        <Text
          style={{ color: route.name === "My Posts" ? "yellowgreen" : "white" }}
        >
          My Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" ? "yellowgreen" : "white"}
        />
        <Text
          style={{ color: route.name === "Account" ? "yellowgreen" : "white" }}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});

export default FooterMenu;
