import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const JournalLogoStyles = StyleSheet.create({
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

export default JournalLogoStyles;
