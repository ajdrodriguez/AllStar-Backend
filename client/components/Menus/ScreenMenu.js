import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/authContext";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import Account from "../../screens/Account";
import MyPosts from "../../screens/MyPosts";
import Index from "../../screens/auth/Index";

const ScreenMenu = () => {
  //Global State
  const [state] = useContext(AuthContext);
  // Auth Condition of True/False
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Index">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: `Hi, ${state?.user.name}!`,
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: { color: "white" },
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: { color: "white" },
              headerRight: () => <HeaderMenu />,
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="My Posts"
            component={MyPosts}
            options={{
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: { color: "white" },
              headerRight: () => <HeaderMenu />,
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: { color: "white" },
              headerRight: () => <HeaderMenu />,
              headerTintColor: "white",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Index"
            component={Index}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
