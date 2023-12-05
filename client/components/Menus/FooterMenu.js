import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/authContext";

const FooterMenu = () => {
  // Hooks
  const [state] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const userRole = state?.user.role;
  return (
    <View style={styles.container}>
      {userRole === "admin" ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Pending")}>
            <FontAwesome5
              name="exclamation-triangle"
              style={styles.iconStyle}
              color={route.name === "Pending" ? "red" : "white"}
            />
            <Text
              style={{
                color: route.name === "Pending" ? "red" : "white",
              }}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("In Progress")}>
            <FontAwesome5
              name="cogs"
              style={styles.iconStyle}
              color={route.name === "In Progress" ? "orange" : "white"}
            />
            <Text
              style={{
                color: route.name === "In Progress" ? "orange" : "white",
              }}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Completed")}>
            <FontAwesome5
              name="clipboard-check"
              style={styles.iconStyle}
              color={route.name === "Completed" ? "yellowgreen" : "white"}
            />
            <Text
              style={{
                color: route.name === "Completed" ? "yellowgreen" : "white",
              }}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <FontAwesome5
              name="user"
              style={styles.iconStyle}
              color={route.name === "Account" ? "yellowgreen" : "white"}
            />
            <Text
              style={{
                color: route.name === "Account" ? "yellowgreen" : "white",
              }}
            >
              Account
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
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
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <FontAwesome5
              name="user"
              style={styles.iconStyle}
              color={route.name === "Account" ? "yellowgreen" : "white"}
            />
            <Text
              style={{
                color: route.name === "Account" ? "yellowgreen" : "white",
              }}
            >
              Account
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});

export default FooterMenu;
