import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export const MapScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
});
