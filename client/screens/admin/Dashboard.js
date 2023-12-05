import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FooterMenu from "../../components/Menus/FooterMenu";
import { PostContext } from "../../context/postContext";

const Dashboard = ({ navigation }) => {
  const [posts, getAllPosts] = useContext(PostContext);
  const pendingPosts = posts.filter((post) => post.status === "pending");
  const inProgressPosts = posts.filter((post) => post.status === "in progress");
  const completedPosts = posts.filter((post) => post.status === "completed");
  useEffect(() => {}, [getAllPosts]);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", padding: 40 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>DASHBOARD</Text>
        <View style={styles.statusNumbers}>
          <View style={styles.statusNumberContainer}>
            <Text style={styles.textStatusNumberItem}>
              {pendingPosts.length}
            </Text>
            <Text>Pending</Text>
          </View>
          <View style={styles.statusNumberContainer}>
            <Text style={styles.textStatusNumberItem}>
              {inProgressPosts.length}
            </Text>
            <Text>In Progress</Text>
          </View>
          <View style={styles.statusNumberContainer}>
            <Text style={styles.textStatusNumberItem}>
              {completedPosts.length}
            </Text>
            <Text>Completed</Text>
          </View>
        </View>
        <Text style={{ alignSelf: "flex-start", fontSize: 25 }}>
          Search by Category
        </Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Road Obstruction")}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>ROAD OBSTRUCTION</Text>
            <FontAwesome5
              name="road"
              size={50}
              style={styles.iconBottomRight}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Stray Animals")}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>STRAY ANIMALS</Text>
            <FontAwesome5 name="paw" size={50} style={styles.iconBottomRight} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Waste Management")}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>WASTE MANAGEMENT</Text>
            <FontAwesome5
              name="recycle"
              size={50}
              style={styles.iconBottomRight}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Others")}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>OTHERS</Text>
            <FontAwesome5
              name="street-view"
              size={50}
              style={styles.iconBottomRight}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginTop: 1,
    justifyContent: "space-between",
  },
  statusNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E9C9AE",
    borderRadius: 10,
    alignItems: "center",
    margin: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  statusNumberContainer: {
    width: 100,
    height: 100,

    alignItems: "center",
    justifyContent: "center",
  },
  textStatusNumberItem: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    paddingTop: 15,
  },
  categoryButton: {
    width: 145,
    height: 140,
    backgroundColor: "#E9C9AE",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  categoryButtonText: {
    padding: 10,
    fontSize: 18,
  },
  iconBottomRight: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default Dashboard;
