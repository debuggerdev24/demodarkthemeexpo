import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Checkbox from "expo-checkbox"; // Import Checkbox from expo-checkbox
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../theme/ThemeContext";

const { height, width } = Dimensions.get("screen");

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const { themeChoice, setThemeChoice } = useThemeContext(); // Use themeChoice and setter from context

  // Update the selected option based on the current theme choice
  const [checkedTheme, setCheckedTheme] = useState(themeChoice);

  const handleThemeChange = (value: string) => {
    setCheckedTheme(value); // Update local checked state
    setThemeChoice(value); // Update the context state
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.title_txt, fontSize: 18, marginBottom: 20 }}>
        Select Theme
      </Text>

      <View style={styles.optionContainer}>
        <Checkbox
          value={checkedTheme === "light"}
          onValueChange={() => handleThemeChange("light")}
          color={checkedTheme === "light" ? colors.check_box : undefined}
        />
        <Text style={{ color: colors.title_txt, marginLeft: 10 }}>
          Light Theme
        </Text>
      </View>

      <View style={styles.optionContainer}>
        <Checkbox
          value={checkedTheme === "dark"}
          onValueChange={() => handleThemeChange("dark")}
          color={checkedTheme === "dark" ? colors.check_box : undefined}
        />
        <Text style={{ color: colors.title_txt, marginLeft: 10 }}>
          Dark Theme
        </Text>
      </View>

      <View style={styles.optionContainer}>
        <Checkbox
          value={checkedTheme === "system"}
          onValueChange={() => handleThemeChange("system")}
          color={checkedTheme === "system" ? colors.check_box : undefined}
        />
        <Text style={{ color: colors.title_txt, marginLeft: 10 }}>
          System Default
        </Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width / 20,
    paddingTop: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
