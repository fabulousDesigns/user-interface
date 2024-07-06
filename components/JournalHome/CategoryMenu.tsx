import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "@/constants/Colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Category {
  id: number;
  name: string;
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory?.id === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => onSelectCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory?.id === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    width: SCREEN_WIDTH,
  },
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

export default CategoryMenu;
