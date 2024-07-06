import { StyleSheet } from "react-native";
import colors from "@/constants/Colors";
const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    alignSelf: "flex-start",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 8,
  },
  editText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  promptText: {
    color: colors.light,
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 5,
  },
  inputLabel: {
    color: colors.light,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.bgVariant,
    borderRadius: 10,
    color: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    margin: 20,
    borderRadius: 30,
  },
  updateButtonText: {
    color: colors.white,
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16,
  },
});

export default settingsStyles;
