import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { DarkScheme, LightScheme } from "./src/theme/scheme";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import AddNewLocation from "./src/screen/AddNewLocation";

const LightTheme = {
  ...MD3LightTheme,
  colors: LightScheme,
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: DarkScheme,
};

const App = () => {
  const colorScheme = useColorScheme();
  console.log("color theme", colorScheme);

  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "#121212" : "#f2f2f2"}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <AddNewLocation />
      </PaperProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
