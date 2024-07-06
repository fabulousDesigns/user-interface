import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
const JournalEntryFormStyles = StyleSheet.create({
  //   container: {
  //     position: "absolute",
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //     height: "90%",
  //     backgroundColor: colors.bgVariant,
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //     padding: 20,
  //     shadowColor: "#000",
  //     shadowOffset: { width: 0, height: -3 },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 3,
  //     elevation: 5,
  //   },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: colors.bg,
    fontSize: 16,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  imagePickerButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 1,
  },
  imagePreviewContainer: {
    height: 150,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  //   image: {
  //     width: (width - 60) / 4,
  //     height: (width - 60) / 4,
  //     margin: 5,
  //     borderRadius: 10,
  //   },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 12,
    padding: 2,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default JournalEntryFormStyles;
