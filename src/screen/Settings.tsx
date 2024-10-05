import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox"; // Import Checkbox from expo-checkbox
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../theme/ThemeContext";
import { Switch } from "react-native-paper";

const { height, width } = Dimensions.get("screen");

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const { themeChoice, setThemeChoice } = useThemeContext(); // Use themeChoice and setter from context

  // Update the selected option based on the current theme choice
  const [checkedTheme, setCheckedTheme] = useState(themeChoice);
  const [incogniteon, setincogniteon] = useState(false);
  const [autospotlighton, setautospotlighton] = useState(false);

  const handleThemeChange = (value: string) => {
    setCheckedTheme(value); // Update local checked state
    setThemeChoice(value); // Update the context state
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={{
          ...styles.header,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/back.png")}
              style={{ height: 20, width: 20 }}
              tintColor={colors.title_txt}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.title_txt,
              fontSize: 22,
              fontWeight: "500",
            }}
          >
            Settings
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handleSavelocation()}
            style={{ ...styles.save_btn, backgroundColor: colors.title_txt }}
          >
            <Text style={{ color: colors.background }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
          }}
        >
          <Text
            style={{ color: colors.title_txt, fontSize: 18, marginBottom: 20 }}
          >
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
        <View
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
          }}
        >
          <View style={{ ...styles.flex_row }}>
            <Text style={{ color: colors.title_txt }}>
              Incognito Mode for Date
            </Text>
            <Switch
              value={incogniteon}
              onValueChange={() => setincogniteon(!incogniteon)}
              color={colors.title_txt}
            />
          </View>
          <View style={{ height: 1, backgroundColor: colors.title_txt }} />
          <Text style={{ color: colors.txt_input_placeholder, marginTop: 10 }}>
            Only people you've swiped right on already, or swipe right on later
            will see your profile. If you turn on Incognito Mode for Date, this
            won't apply across Bizz of BFF
          </Text>
        </View>
        <View
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
          }}
        >
          <View style={{ ...styles.flex_row }}>
            <Text style={{ color: colors.title_txt }}>Auto-Spotlight</Text>
            <Switch
              value={autospotlighton}
              onValueChange={() => setautospotlighton(!autospotlighton)}
              color={colors.title_txt}
            />
          </View>
          <View style={{ height: 1, backgroundColor: colors.title_txt }} />
          <Text style={{ color: colors.txt_input_placeholder, marginTop: 10 }}>
            We'll use Spotlight automatically to boost your profile when most
            people will see it
          </Text>
        </View>
        <View
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
          }}
        >
          <View style={{ ...styles.flex_row, marginBottom: 10 }}>
            <View style={{ ...styles.flex_row, gap: 10 }}>
              <View
                style={{
                  backgroundColor: colors.title_txt,
                  ...styles.img_background,
                }}
              >
                <Image
                  source={require("../../assets/briefcase.png")}
                  style={{ height: 15, width: 15 }}
                  tintColor={colors.background}
                />
              </View>
              <Text style={{ color: colors.title_txt }}>Travel</Text>
            </View>
            <Text style={{ color: colors.title_txt }}>
              London, United Kingdom
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.title_txt }} />
          <Text style={{ color: colors.txt_input_placeholder, marginTop: 10 }}>
            Travel Mode will end in 6 days
          </Text>
        </View>
        <CmnTouchableComponent txt={"Video autoplay settings"} />
        <CmnTouchableComponent txt={"Notification Settings"} />
        <CmnTouchableComponent txt={"Security & Privacy"} />
        <CmnTouchableComponent txt={"Contact & FAQ"} />
        <TouchableOpacity
          style={{
            ...styles.border_container,
            ...styles.flex_row,
            borderColor: colors.title_txt,
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          <Image
            source={require("../../assets/crown.png")}
            style={{
              height: 30,
              width: 30,
            }}
            tintColor={colors.title_txt}
          />
          <Text style={{ color: colors.title_txt }}>{"Restore Purchases"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
            backgroundColor: colors.title_txt,
            borderRadius: 50,
          }}
        >
          <Text style={{ ...styles.txt_logout, color: colors.background }}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.border_container,
            borderColor: colors.title_txt,
            borderRadius: 50,
          }}
        >
          <Text style={{ ...styles.txt_logout, color: colors.title_txt }}>
            Delete account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const CmnTouchableComponent = ({ txt, onpress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.border_container,
        ...styles.flex_row,
        borderColor: colors.title_txt,
      }}
      onPress={onpress}
    >
      <Text style={{ color: colors.title_txt }}>{txt}</Text>
      <Image
        source={require("../../assets/back.png")}
        style={{
          height: 20,
          width: 20,
          transform: [{ rotate: "180deg" }], // Rotate the image 180 degrees
        }}
        tintColor={colors.title_txt}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width / 20,
    paddingTop: 10,
  },
  header: {
    height: height / 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  save_btn: {
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  flex_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border_container: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  img_background: {
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  txt_logout: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});
