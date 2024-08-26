import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import MapView from "react-native-maps";
import { MultiSelect } from "react-native-element-dropdown";

const { height, width } = Dimensions.get("screen");

const AddNewLocation = () => {
  const data = [
    { label: "Category 1", value: "1" },
    { label: "Category 2", value: "2" },
    { label: "Category 3", value: "3" },
    { label: "Category 4", value: "4" },
    { label: "Category 5", value: "5" },
    { label: "Category 6", value: "6" },
    { label: "Category 7", value: "7" },
    { label: "Category 8", value: "8" },
  ];
  const [selected, setSelected] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [notes, setnotes] = useState("");
  const [sourceurl, setsourceurl] = useState("");

  const { colors } = useTheme(); // Access the theme's colors

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={{ ...styles.sub_view }}>
        <View
          style={{
            ...styles.header,
            backgroundColor: colors.maintitleBackground,
          }}
        >
          <Text
            style={{
              color: "#f7f7f7",
              fontSize: 22,
              fontWeight: "500",
            }}
          >
            Add New Location
          </Text>
        </View>
        <View style={{ padding: width / 25, paddingBottom: 100 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                ...styles.sub_title_txt,
                color: colors.title_txt,
                paddingTop: 0,
              }}
            >
              Title
            </Text>
            <TextInput
              value={title}
              onChangeText={settitle}
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                color: colors.title_txt,
                height: 50,
              }}
              placeholder="Enter title"
              placeholderTextColor={colors.txt_input_placeholder}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={setdescription}
              multiline
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                height: 70,
                color: colors.title_txt,
              }}
              placeholder="Enter description"
              placeholderTextColor={colors.txt_input_placeholder}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Notes
            </Text>
            <TextInput
              value={notes}
              onChangeText={setnotes}
              multiline
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                height: 70,
                color: colors.title_txt,
              }}
              placeholder="Enter notes"
              placeholderTextColor={colors.txt_input_placeholder}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Source URL
            </Text>
            <TextInput
              value={sourceurl}
              onChangeText={setsourceurl}
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                color: colors.title_txt,
                height: 50,
              }}
              placeholder="Enter URL"
              placeholderTextColor={colors.txt_input_placeholder}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Add Images
            </Text>
            <TouchableOpacity
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                height: 50,
              }}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Map Location
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 200,
                padding: 0,
              }}
            >
              <MapView
                liteMode={false}
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  backgroundColor: colors.maintitleBackground,
                  padding: 5,
                  borderRadius: 8,
                  bottom: 10,
                  left: 10,
                }}
              >
                <Text style={{ color: "#f7f7f7" }}>Edit Location</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Category
            </Text>
            <View
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                padding: 10,
              }}
            >
              <MultiSelect
                mode="modal"
                style={styles.dropdown}
                placeholderStyle={{
                  ...styles.placeholderStyle,
                  color: colors.txt_input_placeholder,
                }}
                selectedTextStyle={{
                  ...styles.selectedTextStyle,
                  color: colors.title_txt,
                }}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={selected}
                onChange={(item) => {
                  setSelected(item);
                }}
                selectedStyle={styles.selectedStyle}
                itemContainerStyle={{
                  borderWidth: 0,
                }}
                containerStyle={{
                  height: 300,
                  borderWidth: 0,
                  borderRadius: 8,
                  backgroundColor: colors.txt_input,
                }}
                itemTextStyle={{ color: colors.title_txt }}
                activeColor={colors.active_item}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AddNewLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width / 20,
    paddingTop: 30,
  },
  sub_view: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
  },
  header: {
    height: height / 15,
    alignItems: "center",
    justifyContent: "center",
  },
  txt_input: {
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sub_title_txt: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  category_btn: {
    borderWidth: 1,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
