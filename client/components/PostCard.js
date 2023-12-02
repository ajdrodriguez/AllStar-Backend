import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  // Handle Delete Prompt Function
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention!", "Are you sure you want to delete this post?", [
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Press");
        },
      },
    ]);
  };

  // Delete Post Data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("My Posts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post) => (
        <React.Fragment key={post._id}>
          <View style={styles.card}>
            {myPostScreen && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  <FontAwesome5
                    name="pen"
                    size={18}
                    color={"darkblue"}
                    onPress={() => {
                      setPost(post), setModalVisible(true);
                    }}
                  />
                </Text>
                <Text style={{ textAlign: "right" }}>
                  <FontAwesome5
                    name="trash"
                    size={18}
                    color={"red"}
                    onPress={() => handleDeletePrompt(post?._id)}
                  />
                </Text>
              </View>
            )}
            <Text style={styles.title}>{post?.title}</Text>
            <Text style={styles.desc}>{post?.description}</Text>
            <View style={styles.footer}>
              {post?.postedBy?.name && (
                <Text>
                  {" "}
                  <FontAwesome5 name="camera" color={"orange"} />{" "}
                  {post?.postedBy?.name}
                </Text>
              )}
              <Text>
                {" "}
                <FontAwesome5 name="clock" color={"orange"} />{" "}
                {moment(post?.createdAt).format("MMM DD, YYYY")}
              </Text>
            </View>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
