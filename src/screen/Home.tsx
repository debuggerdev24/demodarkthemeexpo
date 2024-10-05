import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import MapView, { Marker, Region } from "react-native-maps";
import { imgdata } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

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

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [savelocationdata, setsavelocationdata] = useState<LocationData[]>([]);
  const [selectedindex, setselectedindex] = useState<number>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getlocationdata();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getlocationdata(); // Call the function when the screen comes into focus
    }, [])
  );

  const getlocationdata = async () => {
    const getlocationdata = await AsyncStorage.getItem("locationData");
    const formatdata: LocationData | null = getlocationdata
      ? JSON.parse(getlocationdata)
      : [];

    // console.log("format", formatdata);

    setsavelocationdata(formatdata);
  };

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const handleexpandsheet = () => {
    bottomSheetRef?.current.expand();
  };

  const renderItem = ({ item, index }) => {
    console.log("index", index);
    return (
      <TouchableOpacity
        style={{
          ...styles.border_container,
          ...styles.flex_row,
          borderColor: colors.title_txt,
        }}
        onPress={() => {
          setselectedindex(index), handleexpandsheet();
        }}
      >
        <View style={{ ...styles.flex_row, gap: 10 }}>
          <Image
            style={{
              height: 70,
              width: 70,
              borderColor: colors.title_txt,
              borderWidth: 0.5,
              borderRadius: 10,
            }}
            source={{ uri: `data:image/jpeg;base64,${item.addimage[0]}` }}
          />
          <View>
            <Text style={{ color: colors.title_txt }}>{item.title}</Text>
            <Text style={{ color: colors.title_txt }}>{item.description}</Text>
            <Text style={{ color: colors.title_txt }}>
              {"John doe | 1 day ago"}
            </Text>
          </View>
        </View>
        <Image
          style={{
            height: 25,
            width: 25,
            transform: [{ rotate: "180deg" }],
          }}
          tintColor={colors.title_txt}
          source={require("../../assets/back.png")}
        />
      </TouchableOpacity>
    );
  };

  // renders
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      {/* <Button title="expand sheet" onPress={handleexpandsheet} /> */}
      <View style={{ ...styles.flex_row }}>
        <Text style={{ color: colors.title_txt, fontSize: 25 }}>
          lvy Lane Grill City
        </Text>
        <View style={{ ...styles.flex_row, gap: 10 }}>
          <Image
            source={require("../../assets/gallery.png")}
            style={{ height: 25, width: 25 }}
            tintColor={colors.title_txt}
          />
          <View
            style={{
              padding: 10,
              backgroundColor: colors.title_txt,
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../../assets/filter.png")}
              style={{ height: 20, width: 20 }}
              tintColor={colors.background}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: 25 }}>
        {savelocationdata.length > 0 && (
          <FlatList
            data={savelocationdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[0.1, "60%"]} // Start closed by default (0%) and can expand to 60%
        backgroundStyle={{
          backgroundColor: colors.background,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
        index={0}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "#000",
          width: 80,
          position: "absolute",
          marginTop: 10,
        }}
        handleStyle={{ padding: 0 }}
      >
        {selectedindex !== null && (
          <View>
            <View style={styles.bottom_sheet_header_container}>
              <MapView
                liteMode={false}
                style={{ flex: 1 }}
                region={{
                  latitude: savelocationdata[selectedindex]?.maplocation.lat,
                  longitude: savelocationdata[selectedindex]?.maplocation.long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: savelocationdata[selectedindex]?.maplocation.lat,
                    longitude:
                      savelocationdata[selectedindex]?.maplocation.long,
                  }}
                />
              </MapView>
            </View>
            <View
              style={{
                position: "relative",
                backgroundColor: colors.background,
                top: -10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 15,
              }}
            >
              <Text
                style={{
                  ...styles.title_txt_bottomsheet,
                  color: colors.title_txt,
                }}
              >
                {savelocationdata[selectedindex]?.title}
              </Text>
              <Text
                style={{
                  ...styles.sub_title_txt_bottomsheet,
                  color: colors.title_txt,
                }}
              >
                {savelocationdata[selectedindex]?.description}
              </Text>
              <View
                style={[
                  styles.flatlist_container,
                  { backgroundColor: colors.active_item },
                ]}
              >
                <FlatList
                  data={savelocationdata[selectedindex]?.addimage}
                  horizontal
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false} // Hide the scroll indicator if you prefer
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        marginLeft: index === 0 ? 0 : 10,
                      }}
                      source={{ uri: `data:image/jpeg;base64,${item}` }}
                    />
                  )}
                />
              </View>
              <View style={{ ...styles.flex_row }}>
                <View style={{ ...styles.flex_row, gap: 5 }}>
                  <TouchableOpacity
                    style={{
                      borderColor: colors.title_txt,
                      borderWidth: 1,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={require("../../assets/like.png")}
                      style={{ height: 25, width: 25 }}
                      tintColor={colors.title_txt}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: colors.title_txt,
                      borderWidth: 1,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={require("../../assets/like.png")}
                      style={{
                        height: 25,
                        width: 25,
                        transform: [{ rotate: "180deg" }], // Rotate the image 180 degrees
                      }}
                      tintColor={colors.title_txt}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ ...styles.flex_row, gap: 5 }}>
                  <BottomComponent
                    img={require("../../assets/center_alignment.png")}
                  />
                  <BottomComponent img={require("../../assets/undo.png")} />
                  <BottomComponent
                    img={require("../../assets/edit_text.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

const BottomComponent = ({ img }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.title_txt,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
      }}
    >
      <Image
        source={img}
        style={{ height: 25, width: 25 }}
        tintColor={colors.background}
      />
    </TouchableOpacity>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottom_sheet_header_container: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title_txt_bottomsheet: {
    fontSize: 21,
    fontWeight: "500",
  },
  sub_title_txt_bottomsheet: {
    fontSize: 18,
  },
  flatlist_container: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  flex_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border_container: {
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
});
