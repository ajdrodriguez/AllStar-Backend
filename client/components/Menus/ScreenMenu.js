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
import Pending from "../../screens/admin/Pending";
import InProgress from "../../screens/admin/InProgress";
import Completed from "../../screens/admin/Completed";
import Dashboard from "../../screens/admin/Dashboard";
import RoadObstruction from "../../screens/admin/categories/RoadObstruction";
import StrayAnimals from "../../screens/admin/categories/StrayAnimals";
import WasteManagement from "../../screens/admin/categories/WasteManagement";
import Others from "../../screens/admin/categories/Others";

const ScreenMenu = () => {
  //Global State
  const [state] = useContext(AuthContext);
  // Auth Condition of True/False
  const authenticatedUser = state?.user && state?.token;
  const userRole = state?.user?.role;
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Index">
      {authenticatedUser ? (
        userRole === "admin" ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: `Hi, ${state?.user.name}!`,
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTitleStyle: { color: "white" },
              }}
            />
            <Stack.Screen
              name="Pending"
              component={Pending}
              options={{
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTitleStyle: { color: "white" },

                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="In Progress"
              component={InProgress}
              options={{
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTitleStyle: { color: "white" },

                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="Completed"
              component={Completed}
              options={{
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTitleStyle: { color: "white" },

                headerTintColor: "white",
              }}
            />

            <Stack.Screen
              name="Road Obstruction"
              component={RoadObstruction}
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
              name="Stray Animals"
              component={StrayAnimals}
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
              name="Waste Management"
              component={WasteManagement}
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
              name="Others"
              component={Others}
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
              name="Home"
              component={Home}
              options={{
                title: `Hi, ${state?.user.name}!`,
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTitleStyle: { color: "white" },
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

                headerTintColor: "white",
              }}
            />
          </>
        )
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
