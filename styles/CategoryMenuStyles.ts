import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const CategoryMenuStyles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 20,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.darkGray,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: colors.white,
  },
});

export default CategoryMenuStyles;
