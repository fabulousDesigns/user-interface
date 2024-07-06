import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { CategoryDropdownProps, URL } from "@/constants/utils";
import CategoryDropdownStyles from "@/styles/CategoryDropdownStyles";

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
        const response = await fetch(`${URL}`);
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
    <View style={CategoryDropdownStyles.container}>
      <TouchableOpacity
        style={CategoryDropdownStyles.header}
        onPress={toggleDropdown}
      >
        <Text style={CategoryDropdownStyles.headerText}>
          {selectedCategory || "Select a category"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.bg}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={CategoryDropdownStyles.dropdownList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={CategoryDropdownStyles.dropdownItem}
              onPress={() => handleSelectCategory(category.name, category.id)}
            >
              <Text style={CategoryDropdownStyles.dropdownItemText}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryDropdown;
