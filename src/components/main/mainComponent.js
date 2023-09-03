import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../loginscreen/login";
import Home from "../homescreen/home";
import Logout from "../logoutscreen/logout";
import AddPost from "../AddPost/addPost";
import { AuthContext } from "../../contexts/AuthContext";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const theme = {
  colors: {
    "primary": "rgb(142, 78, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 220, 193)",
    "onPrimaryContainer": "rgb(46, 21, 0)",
    "secondary": "rgb(115, 89, 67)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 220, 193)",
    "onSecondaryContainer": "rgb(42, 23, 7)",
    "tertiary": "rgb(91, 98, 56)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(223, 231, 178)",
    "onTertiaryContainer": "rgb(24, 30, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 27, 23)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 27, 23)",
    "surfaceVariant": "rgb(243, 223, 209)",
    "onSurfaceVariant": "rgb(81, 68, 58)",
    "outline": "rgb(131, 116, 105)",
    "outlineVariant": "rgb(214, 195, 182)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(53, 47, 43)",
    "inverseOnSurface": "rgb(250, 239, 232)",
    "inversePrimary": "rgb(255, 183, 121)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(249, 242, 242)",
      "level2": "rgb(246, 237, 235)",
      "level3": "rgb(243, 232, 227)",
      "level4": "rgb(241, 230, 224)",
      "level5": "rgb(239, 227, 219)"
    },
    "surfaceDisabled": "rgba(32, 27, 23, 0.12)",
    "onSurfaceDisabled": "rgba(32, 27, 23, 0.38)",
    "backdrop": "rgba(58, 46, 37, 0.4)"
  },
};

const MainComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Logout" component={Logout} />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddPost"
                component={AddPost}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default MainComponent;
