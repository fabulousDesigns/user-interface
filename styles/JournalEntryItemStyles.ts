import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const JournalEntryItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgVariant,
    borderRadius: 12,
    padding: 15,
    marginBottom: 17,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
    color: colors.white,
    letterSpacing: 1,
  },
  content: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    textAlign: "justify",
    paddingRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 1,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    backgroundColor: colors.bgVariant,
    borderRadius: 10,
    padding: 10,
    width: 150,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.white,
    paddingRight: 30,
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: colors.error,
  },
  seeMore: {
    color: colors.primary,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  editFormContainer: {
    backgroundColor: colors.bg,
    padding: 16,
    borderRadius: 8,
    shadowColor: colors.dark,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  editFormInput: {
    backgroundColor: colors.white,
    fontSize: 16,
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    color: colors.bg,
  },
  editFormButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editFormButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    borderRadius: 8,
  },
  editFormButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  label: {
    color: colors.white,
    letterSpacing: 1,
    fontSize: 15,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default JournalEntryItemStyles;
