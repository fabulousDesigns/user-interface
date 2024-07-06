import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import CategoryMenuStyles from "@/styles/CategoryMenuStyles";
import { Category, CategoryMenuProps } from "@/constants/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        CategoryMenuStyles.categoryItem,
        selectedCategory?.id === item.id &&
          CategoryMenuStyles.selectedCategoryItem,
      ]}
      onPress={() => onSelectCategory(item)}
    >
      <Text
        style={[
          CategoryMenuStyles.categoryText,
          selectedCategory?.id === item.id &&
            CategoryMenuStyles.selectedCategoryText,
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
        contentContainerStyle={CategoryMenuStyles.listContentContainer}
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
});

export default CategoryMenu;
