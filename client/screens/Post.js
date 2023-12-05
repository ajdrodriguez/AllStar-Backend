import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const categories = [
  { label: "Road Obstruction", value: "Road Obstruction" },
  { label: "Stray Animals", value: "Stray Animals" },
  { label: "Waste Management", value: "Waste Management" },
  { label: "Others", value: "Others" },
];

const Post = ({ navigation }) => {
  // Global State
  const [posts, setPosts] = useContext(PostContext);
  // Local State
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to update your photo.");
      }
    })();
  }, []);

  // Form Data Post Function
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!category) {
        alert("Please select a category.");
      }
      if (!title) {
        alert("Please add a post title.");
      }
      if (!description) {
        alert("Please add a post description.");
      }
      if (!image) {
        alert("Please add a post description.");
      }
      const { data } = await axios.post("/post/create-post", {
        category,
        title,
        description,
        image,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={{ color: "gray" }}
            iconStyle={styles.iconStyle}
            data={categories}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Choose topic"
            value={category}
            onChange={(type) => {
              setCategory(type?.value);
            }}
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Add post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
              <Text>{image ? "Edit" : "Upload"} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={18} /> Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e7d7bc",
    flex: 1,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 5,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    paddingLeft: 15,
    width: 320,
    marginTop: 30,
    backgroundColor: "white",
  },
  uploadBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Post;
