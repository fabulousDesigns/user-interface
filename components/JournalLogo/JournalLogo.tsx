import JournalLogoStyles from "@/styles/JournalLogoStyles";
import React from "react";
import { View } from "react-native";

export default function JournalLogo() {
  return (
    <View style={JournalLogoStyles.container}>
      <View style={[JournalLogoStyles.wing, JournalLogoStyles.leftWing]} />
      <View style={[JournalLogoStyles.wing, JournalLogoStyles.rightWing]} />
    </View>
  );
}
