import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { logout, getValidToken } from "@/services/authService";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import JournalEntryForm from "./JournalEntryForm";
import axios from "axios";
import SuccessPopup from "../Popups/secondarySucessPopup";
import ErrorPopup from "../Popups/ErrorPopup";
import JournalHomeStyles from "@/styles/JournalHomeStyles";
import CategoryMenu from "./CategoryMenu";
import JournalEntryItem from "./JournalEntryItem";
import { Category, JournalEntry } from "@/constants/utils";

const API_BASE_URL = "http://localhost:5001";

export default function JournalHome() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const router = useRouter();
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchJournalEntries();
  }, [selectedCategory]);

  const handleEditEntry = (entry: JournalEntry) => {
    setJournalEntries((entries) =>
      entries.map((e) => (e.id === entry.id ? { ...e, ...entry } : e))
    );
  };

  const handleDeleteEntry = (entry: JournalEntry) => {
    setJournalEntries((entries) => entries.filter((e) => e.id !== entry.id));
  };

  const fetchCategories = async () => {
    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error("No valid token found");
      }
      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage("Failed to fetch categories. Please try again.");
      setShowErrorPopup(true);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await axios.get(`${API_BASE_URL}/api/journal-entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJournalEntries(response.data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      setErrorMessage("Failed to fetch journal entries. Please try again.");
      setShowErrorPopup(true);
    }
  };

  const filteredEntries = selectedCategory
    ? journalEntries.filter(
        (entry) => entry.category.id === selectedCategory.id
      )
    : journalEntries;

  const renderContent = () => {
    if (journalEntries.length === 0) {
      return (
        <View style={JournalHomeStyles.content}>
          <View style={JournalHomeStyles.logoContainer}>
            <Image
              source={require("@/assets/images/journal-logo.png")}
              style={JournalHomeStyles.logo}
            />
          </View>
          <Text style={JournalHomeStyles.startText}>Start Journaling</Text>
          <Text style={JournalHomeStyles.subText}>
            Create your personal journal.
          </Text>
          <Text style={JournalHomeStyles.subText}>
            Tap the plus button to get started.
          </Text>
        </View>
      );
    }

    if (filteredEntries.length === 0) {
      return (
        <View style={JournalHomeStyles.content}>
          <View style={JournalHomeStyles.logoContainer}>
            <Image
              source={require("@/assets/images/journal-logo.png")}
              style={JournalHomeStyles.logo}
            />
          </View>
          <Text style={JournalHomeStyles.startText}>Start Journaling</Text>
          <Text style={JournalHomeStyles.subText}>
            Create your personal journal.
          </Text>
          <Text style={JournalHomeStyles.subText}>
            Tap the plus button to get started.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={filteredEntries}
          renderItem={({ item }) => (
            <JournalEntryItem
              entry={item}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={JournalHomeStyles.entriesList}
        />
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmitEntry = async (entry: {
    title: string;
    content: string;
    categoryId: number;
    images: string[];
  }) => {
    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error("No valid token found");
      }

      const formData = new FormData();
      formData.append("title", entry.title);
      formData.append("content", entry.content);
      formData.append("categoryId", entry.categoryId.toString());
      formData.append("date", new Date().toISOString());

      entry.images.forEach((image, index) => {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("images", {
          uri: image,
          name: `image_${index}.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      });

      await axios.post(`${API_BASE_URL}/api/journal-entries`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFormVisible(false);
      setShowSuccessPopup(true);
      fetchJournalEntries();
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      setErrorMessage("Failed to submit journal entry. Please try again.");
      setShowErrorPopup(true);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <View style={JournalHomeStyles.container}>
      <StatusBar style="light" />
      <View style={JournalHomeStyles.header}>
        <Text style={JournalHomeStyles.title}>Journal</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={40} color={colors.white} />
        </TouchableOpacity>
      </View>
      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <View style={{ flex: 1, paddingVertical: 20 }}>{renderContent()}</View>

      <TouchableOpacity
        style={JournalHomeStyles.addButton}
        onPress={toggleForm}
      >
        <Ionicons name="add" size={32} color={colors.white} />
      </TouchableOpacity>
      <OverlayMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onLogout={handleLogout}
      />
      <JournalEntryForm
        isVisible={isFormVisible}
        onClose={toggleForm}
        onSubmit={handleSubmitEntry}
      />
      <SuccessPopup
        isVisible={showSuccessPopup}
        message="Created successfully!"
        onClose={handleCloseSuccessPopup}
      />
      <ErrorPopup
        isVisible={showErrorPopup}
        message={errorMessage}
        onClose={handleCloseErrorPopup}
      />
    </View>
  );
}
