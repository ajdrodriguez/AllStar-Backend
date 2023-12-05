import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Account = () => {
  // Global State
  const [state, setState] = useContext(AuthContext);

  const { user, token } = state;

  // Local State
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // Update User Data Function
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/Profile.jpg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <Text style={styles.warningText}>
        Currently, you can only update your name and password.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput style={styles.inputBox} value={email} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Role</Text>
        <TextInput
          style={styles.inputBox}
          value={state?.user.role}
          editable={false}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateBtnText}>
            {loading ? "Please Wait..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "flex-end" }}>
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
  imgContainer: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    alignSelf: "center",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    paddingTop: 20,
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
export default Account;
