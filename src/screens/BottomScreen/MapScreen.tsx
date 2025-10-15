import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>지도</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 지도 */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
            mapType="standard"
          >
            <Marker
              coordinate={{
                latitude: 37.5665,
                longitude: 126.978,
              }}
              title="테스트 마커"
              description="이것은 테스트 마커입니다"
            />
          </MapView>
        </View>

        {/* 로딩 메시지 */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  filterButton: {
    padding: 8,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loadingText: {
    color: "#fff",
    fontSize: 14,
  },
});
