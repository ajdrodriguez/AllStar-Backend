import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/SubmitButton";
import { AntDesign } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields.");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log(" Login Data ==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  // temporary function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ===> ", data);
  };
  getLocalStorageData();
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate("Index")}
        >
          <AntDesign style={styles.icon} name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/WelcomeLogo.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>LOGIN YOUR ACCOUNT</Text>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        <SubmitButton
          btnTitle="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EADCC1",
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    height: 400,
    width: 300,
  },
  formContainer: {
    flex: 3,
    marginHorizontal: 20,
    gap: 10,
  },
  buttonContainer: {
    backgroundColor: "white",
    width: "50%",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
    elevation: 500,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 20,
    fontFamily: "Poppin",
  },
  buttonBack: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  backButtonContainer: {
    width: "100%",
    position: "absolute",
    left: 20,
    top: 20,
  },
  linkText: {
    textAlign: "center",
  },
  loginLink: {
    color: "blue",
  },
});

export default Login;
