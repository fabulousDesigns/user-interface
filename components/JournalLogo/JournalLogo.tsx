import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@/constants/Colors";

export default function JournalLogo() {
  return (
    <View style={styles.container}>
      <View style={[styles.wing, styles.leftWing]} />
      <View style={[styles.wing, styles.rightWing]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  wing: {
    position: "absolute",
    width: 50,
    height: 60,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  leftWing: {
    transform: [{ rotate: "-30deg" }, { scaleX: -1 }],
    left: 10,
  },
  rightWing: {
    transform: [{ rotate: "30deg" }],
    right: 10,
  },
});
