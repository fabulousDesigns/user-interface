import { StyleSheet } from "react-native";
import colors from "@/constants/Colors";

const OverlayMenuStyles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    letterSpacing: 1,
    marginTop: 15,
  },
  menuText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "justify",
    fontWeight: "bold",
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 20,
    backgroundColor: colors.error,
    borderRadius: 30,
  },
  logoutText: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default OverlayMenuStyles;
