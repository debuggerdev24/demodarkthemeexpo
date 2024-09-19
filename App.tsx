import React from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screen/Home";
import AddNewLocation from "./src/screen/AddNewLocation";
import Settings from "./src/screen/Settings";
import { ThemeProvider, useThemeContext } from "./src/theme/ThemeContext";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const { theme } = useThemeContext(); // Use theme from ThemeContext

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={theme.dark ? "light-content" : "dark-content"}
          />
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: theme.colors.background,
              },
              headerShown: false,
              tabBarActiveTintColor: theme.colors.title_txt,
              tabBarInactiveTintColor: "#999",
              tabBarHideOnKeyboard: true,
            }}
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <Image
                    resizeMode="contain"
                    source={require("./assets/home.png")}
                    style={{ tintColor: color, width: 20, height: 20 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="AddNewLocation"
              component={AddNewLocation}
              options={{
                tabBarIcon: ({ color }) => (
                  <Image
                    resizeMode="contain"
                    source={require("./assets/place.png")}
                    style={{ tintColor: color, width: 20, height: 20 }}
                  />
                ),
                tabBarLabel: "Add Location",
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ color }) => (
                  <Image
                    resizeMode="contain"
                    source={require("./assets/setting.png")}
                    style={{ tintColor: color, width: 20, height: 20 }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

const styles = StyleSheet.create({});
