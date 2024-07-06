import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  popupMessage: {
    marginBottom: 20,
    textAlign: "center",
    color: colors.darkGray,
  },
  popupButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 5,
  },
  popupButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
