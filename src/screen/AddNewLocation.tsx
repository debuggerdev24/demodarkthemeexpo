import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import MapView, { Marker, Region, MapEvent } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("screen");

interface LocationData {
  title: string;
  description: string;
  notes: string;
  sourceurl: string;
  addimage: string[];
  maplocation: {
    address: string;
    lat: number;
    long: number;
  };
  category: string[];
}

const AddNewLocation = () => {
  const { colors } = useTheme(); // Access the theme's colors

  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [notes, setnotes] = useState<string>("");
  const [sourceurl, setsourceurl] = useState<string>("");
  const [entercategory, setentercategory] = useState<string>("");
  const [currentlocation, setcurrentlocation] = useState<string>("");
  const [activeindex, setactiveindex] = useState<number>(0);
  const [storecategory, setstorecategory] = useState<string[]>([]);
  const [base64image, setbase64image] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
    // getlocationdata();
  }, []);

  const getlocationdata = async () => {
    const getlocationdata = await AsyncStorage.getItem("locationData");
    const formatdata: LocationData | null = getlocationdata
      ? JSON.parse(getlocationdata)
      : null;

    if (formatdata !== null) {
      settitle(formatdata.title);
      setdescription(formatdata.description);
      setnotes(formatdata.notes);
      setsourceurl(formatdata.sourceurl);
      setcurrentlocation(formatdata.maplocation.address);
      setbase64image(formatdata.addimage);
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: formatdata.maplocation.lat,
        longitude: formatdata.maplocation.long,
      }));
      setstorecategory(formatdata.category);
    }
  };

  const handleAddCategory = () => {
    if (entercategory.trim() && !storecategory.includes(entercategory.trim())) {
      setstorecategory([...storecategory, entercategory.trim()]);
      setentercategory(""); // Clear the TextInput after adding
    }
  };

  const handleremovecategory = (index: number) => {
    const updatedCategories = storecategory.filter((_, i) => i !== index);
    setstorecategory(updatedCategories);
    if (activeindex === index) {
      setactiveindex(0); // Reset active index if the active item is removed
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets) {
      setbase64image([...base64image, result.assets[0].base64 || ""]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newBase64Image = base64image.filter((_, i) => i !== index);
    setbase64image(newBase64Image);
  };

  const handleEditLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const { latitude, longitude } = location.coords;

    setRegion({
      ...region,
      latitude,
      longitude,
    });

    setcurrentlocation(address[0].formattedAddress || "");
  };

  const handleLongPress = async (event: MapEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    let address = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));

    setcurrentlocation(address[0].formattedAddress || "");
  };

  const handleSavelocation = async () => {
    if (
      title === "" ||
      description === "" ||
      notes === "" ||
      sourceurl === "" ||
      base64image.length === 0 ||
      currentlocation === "" ||
      storecategory.length === 0
    ) {
      Alert.alert("", "All fields are required");
      return;
    }
    try {
      const obj: LocationData = {
        title,
        description,
        notes,
        sourceurl,
        addimage: base64image,
        maplocation: {
          address: currentlocation,
          lat: region.latitude,
          long: region.longitude,
        },
        category: storecategory,
      };

      const getlocationdata = await AsyncStorage.getItem("locationData");
      const formatdata: LocationData | null = getlocationdata
        ? JSON.parse(getlocationdata)
        : [];

      const jsonvalue = [...formatdata, obj];

      await AsyncStorage.setItem("locationData", JSON.stringify(jsonvalue));

      Alert.alert("", "Location saved successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Clear all fields when OK is pressed
            settitle("");
            setdescription("");
            setnotes("");
            setsourceurl("");
            setcurrentlocation("");
            setbase64image([]);
            setRegion({
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setstorecategory([]);
          },
        },
      ]);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={{ ...styles.sub_view }}>
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
              Add New Location
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleSavelocation()}
              style={{ ...styles.save_btn, backgroundColor: colors.title_txt }}
            >
              <Text style={{ color: colors.background }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 0, paddingBottom: 100 }}>
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
                borderColor: colors.title_txt,
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
                borderColor: colors.title_txt,
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
                borderColor: colors.title_txt,
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
                borderColor: colors.title_txt,
              }}
              placeholder="Enter URL"
              placeholderTextColor={colors.txt_input_placeholder}
            />
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Add Images
            </Text>
            <View
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                borderColor: colors.title_txt,
                paddingVertical: 10,
              }}
            >
              {base64image.length > 0 ? (
                <FlatList
                  data={base64image}
                  horizontal
                  renderItem={({ item, index }) => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          position: "relative",
                          marginRight: 15,
                          marginTop: 10,
                        }}
                      >
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${item}` }} // Format Base64 with data URI
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 8,
                          }}
                        />
                        <TouchableOpacity
                          style={{ ...styles.close_btn_img }}
                          onPress={() => handleRemoveImage(index)}
                        >
                          <Image
                            source={require("../../assets/cancel_red.png")}
                            style={{ height: 20, width: 20 }}
                          />
                        </TouchableOpacity>
                      </View>
                      {index === base64image.length - 1 && (
                        <TouchableOpacity
                          onPress={() => pickImage()}
                          style={{
                            ...styles.add_image_btn,
                            borderColor: colors.txt_input_placeholder,
                            marginTop: 10,
                          }}
                        >
                          <Image
                            source={require("../../assets/addimage.png")}
                            style={{ height: 25, width: 25 }}
                            tintColor={colors.title_txt}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={{
                    ...styles.add_image_btn,
                    borderColor: colors.txt_input_placeholder,
                  }}
                >
                  <Image
                    source={require("../../assets/addimage.png")}
                    style={{ height: 25, width: 25 }}
                    tintColor={colors.title_txt}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Map Location
            </Text>
            <View
              activeOpacity={1}
              style={{
                ...styles.txt_input,
                paddingVertical: 10,
                gap: 10,
                borderColor: colors.title_txt,
              }}
            >
              <View
                style={{ height: 200, borderRadius: 10, overflow: "hidden" }}
              >
                <MapView
                  liteMode={false}
                  style={{ flex: 1 }}
                  region={region} // Use the region from state
                  onLongPress={handleLongPress}
                >
                  <Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                  />
                </MapView>
                <TouchableOpacity
                  style={{
                    ...styles.category_item,
                    borderWidth: 0,
                    position: "absolute",
                    backgroundColor: "#000",
                    bottom: 10,
                    right: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={() => handleEditLocation()}
                >
                  <Image
                    source={require("../../assets/located.png")}
                    style={{ height: 20, width: 20 }}
                    tintColor={"#fff"}
                  />
                  <Text style={{ color: "#fff" }}>Current Location</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.txt_input,
                  backgroundColor: colors.txt_input,
                  color: colors.title_txt,
                  borderColor: colors.title_txt,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/locationpin.png")}
                  style={{ height: 25, width: 25 }}
                  tintColor={colors.title_txt}
                />
                <TextInput
                  style={{
                    ...styles.txt_input,
                    backgroundColor: colors.txt_input,
                    color: colors.title_txt,
                    borderColor: colors.title_txt,
                    height: 48,
                    borderWidth: 0,
                    width: 260,
                  }}
                  value={currentlocation}
                  onChangeText={setcurrentlocation}
                  placeholder="Location"
                  placeholderTextColor={colors.txt_input_placeholder}
                />
              </View>
            </View>
            <Text style={{ ...styles.sub_title_txt, color: colors.title_txt }}>
              Category
            </Text>
            <View
              style={{
                ...styles.txt_input,
                backgroundColor: colors.txt_input,
                padding: 10,
                borderColor: colors.title_txt,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                {storecategory.length > 0 && (
                  <FlatList
                    data={storecategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setactiveindex(index)}
                          style={{
                            ...styles.category_item,
                            backgroundColor:
                              index === activeindex
                                ? colors.title_txt
                                : colors.txt_input,
                            marginLeft: index === 0 ? 0 : 10,
                            borderColor: colors.title_txt,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                index === activeindex
                                  ? colors.background
                                  : colors.title_txt,
                            }}
                          >
                            {item}
                          </Text>
                          {index === activeindex && (
                            <TouchableOpacity
                              onPress={() => handleremovecategory(index)}
                            >
                              <Image
                                source={require("../../assets/cancel.png")}
                                style={{ height: 20, width: 20 }}
                                tintColor={colors.background}
                              />
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </View>
              <TextInput
                value={entercategory}
                onChangeText={setentercategory}
                placeholder="Enter Category"
                placeholderTextColor={colors.txt_input_placeholder}
                style={{
                  ...styles.txt_input,
                  height: 50,
                  borderColor: colors.title_txt,
                  backgroundColor: colors.txt_input,
                  color: colors.title_txt,
                }}
                onSubmitEditing={handleAddCategory} // Add category on submit
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
    paddingTop: 10,
  },
  sub_view: {
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    overflow: "hidden",
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
  txt_input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
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
  category_item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 0.5,
  },
  add_image_btn: {
    borderWidth: 1,
    borderColor: "#000",
    height: 70,
    width: 70,
    borderRadius: 8,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  close_btn_img: {
    position: "absolute",
    right: -10,
    top: -10,
  },
});
