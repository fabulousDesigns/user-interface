import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

interface CategoryDropdownProps {
  selectedCategory: string;
  onSelectCategory: (category: string, id: number) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<{ name: string; id: number }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCategory = (categoryName: string, categoryId: number) => {
    onSelectCategory(categoryName, categoryId);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>
          {selectedCategory || "Select a category"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.bg}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.dropdownItem}
              onPress={() => handleSelectCategory(category.name, category.id)}
            >
              <Text style={styles.dropdownItemText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CategoryDropdown;
