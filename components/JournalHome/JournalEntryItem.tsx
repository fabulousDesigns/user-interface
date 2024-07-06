import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import colors from "@/constants/Colors";
import { API_BASE_URL, JournalEntryItemProps } from "@/constants/utils";
import JournalEntryItemStyles from "@/styles/JournalEntryItemStyles";
import EditJournalEntryForm from "./EditJournalEntryForm";
import { getValidToken } from "@/services/authService";
import ErrorPopup from "../Popups/ErrorPopup";
import SuccessPopup from "../Popups/AlertPopup";

const JournalEntryItem: React.FC<JournalEntryItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, right: 0 });
  const [showFullContent, setShowFullContent] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleOptions = () => {
    if (!showOptions) {
      buttonRef.current?.measure((fx, fy, width, height, px, py) => {
        const windowHeight = Dimensions.get("window").height;
        const optionsHeight = 180;
        let top = py + height;
        if (top + optionsHeight > windowHeight) {
          top = py - optionsHeight;
        }
        setOptionsPosition({
          top,
          right: Dimensions.get("window").width - (px + width),
        });
      });
    }
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    toggleOptions();
  };

  const handleSaveEdit = async (updatedEntry: any) => {
    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error("No valid token found");
      }

      const response = await axios.put(
        `${API_BASE_URL}/journal-entries/${entry.id}`,
        {
          title: updatedEntry.title,
          content: updatedEntry.content,
          date: entry.date,
          categoryId: entry.category.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onEdit(response.data);
        setShowEditForm(false);
        setPopupMessage("Journal entry updated successfully!");
        setSuccessPopupVisible(true);
      } else {
        throw new Error("Failed to update entry");
      }
    } catch (error) {
      console.error("Error updating journal entry:", error);
      setPopupMessage("Failed to update journal entry. Please try again.");
      setErrorPopupVisible(true);
    }
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  const handleDelete = async () => {
    const token = await getValidToken();
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/journal-entries/${entry.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data.message === "Journal entry deleted successfully") {
          setPopupMessage("Journal entry deleted successfully!");
          setSuccessPopupVisible(true);
          setShowOptions(false);
          onDelete(entry);
        } else {
          throw new Error("Unexpected response from server");
        }
      } else {
        throw new Error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      setPopupMessage("Failed to delete journal entry. Please try again.");
      setErrorPopupVisible(true);
    }
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    if (showFullContent) {
      return (
        <Text>
          {content}
          <Text
            style={JournalEntryItemStyles.seeMore}
            onPress={() => setShowFullContent(false)}
          >
            {" "}
            See less
          </Text>
        </Text>
      );
    }
    return (
      <Text>
        {content.substr(0, maxLength)}
        <Text
          style={JournalEntryItemStyles.seeMore}
          onPress={() => setShowFullContent(true)}
        >
          ... See more
        </Text>
      </Text>
    );
  };

  return (
    <>
      <View style={JournalEntryItemStyles.container}>
        <Text style={JournalEntryItemStyles.title}>
          {entry.title.toUpperCase()}
        </Text>
        <Text style={JournalEntryItemStyles.content}>
          {truncateContent(entry.content, 100)}
        </Text>
        <View style={JournalEntryItemStyles.footer}>
          <Text style={JournalEntryItemStyles.date}>
            {new Date(entry.date).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </Text>
          <TouchableOpacity onPress={toggleOptions} ref={buttonRef}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={showOptions}
          onRequestClose={toggleOptions}
        >
          <TouchableOpacity
            style={JournalEntryItemStyles.modalOverlay}
            onPress={toggleOptions}
          >
            <View
              style={[
                JournalEntryItemStyles.optionsContainer,
                {
                  position: "absolute",
                  top: optionsPosition.top,
                  right: optionsPosition.right,
                },
              ]}
            >
              <TouchableOpacity
                style={JournalEntryItemStyles.option}
                onPress={handleEdit}
              >
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={colors.white}
                />
                <Text style={JournalEntryItemStyles.optionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  JournalEntryItemStyles.option,
                  JournalEntryItemStyles.deleteOption,
                ]}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={24} color={colors.error} />
                <Text
                  style={[
                    JournalEntryItemStyles.optionText,
                    JournalEntryItemStyles.deleteText,
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {showEditForm && (
          <EditJournalEntryForm
            entry={entry}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}

        <SuccessPopup
          isVisible={successPopupVisible}
          message={popupMessage}
          onClose={() => setSuccessPopupVisible(false)}
        />

        <ErrorPopup
          isVisible={errorPopupVisible}
          message={popupMessage}
          onClose={() => setErrorPopupVisible(false)}
        />
      </View>
    </>
  );
};

export default JournalEntryItem;
