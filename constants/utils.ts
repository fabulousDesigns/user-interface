export const API_BASE_URL = "http://localhost:5001/api";

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
