import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const CategoryDropdownStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
  },
  headerText: {
    color: colors.bg,
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: colors.bg,
    fontSize: 16,
  },
});

export default CategoryDropdownStyles;
