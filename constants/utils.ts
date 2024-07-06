import { TextStyle } from "react-native";
import colors from "./Colors";

export const API_BASE_URL = "http://localhost:5001/api";
export const URL = "http://localhost:5001/api/categories";
export const API_URL = "http://localhost:5001";

export interface OverlayMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: any;
}

export interface Category {
  id: number;
  name: string;
}

export interface JournalEntry {
  id: number | any;
  title: string;
  content: string;
  date: string;
  category: Category;
}

export interface JournalEntryItemProps {
  entry: JournalEntry;
  onPress?: (entry: JournalEntry) => void;
  onEdit: (entry: JournalEntry) => void;
  onBookmark?: (entry: JournalEntry) => void;
  onDelete: (entry: JournalEntry) => void;
}

export interface CategoryDropdownProps {
  selectedCategory: string;
  onSelectCategory: (category: string, id: number) => void;
}

export interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export interface EditJournalEntryFormProps {
  entry: { title: string; content: string };
  onSave: (updatedEntry: { title: string; content: string }) => void;
  onCancel: () => void;
}

export interface JournalEntryFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (entry: {
    title: string;
    content: string;
    categoryId: number | any;
    images: string[];
  }) => Promise<void>;
}

export interface AnimatedInputProps {
  placeholder: any;
  value: any;
  onChangeText: any;
  secureTextEntry: any;
  keyboardType: any;
}
export interface CustomTextStyle extends TextStyle {
  outlineStyle?: string | any;
}

export const chartConfig = {
  backgroundGradientFrom: colors.bg,
  backgroundGradientTo: colors.bg,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForLabels: {
    fontSize: 14,
  },
  propsForVerticalLabels: {
    fontSize: 16,
  },
  barColors: ["#3F3FFF"],
};
