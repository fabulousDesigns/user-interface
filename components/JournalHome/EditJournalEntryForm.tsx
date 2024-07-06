import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "@/constants/Colors";
import JournalEntryItemStyles from "@/styles/JournalEntryItemStyles";

interface EditJournalEntryFormProps {
  entry: { title: string; content: string };
  onSave: (updatedEntry: { title: string; content: string }) => void;
  onCancel: () => void;
}

const EditJournalEntryForm: React.FC<EditJournalEntryFormProps> = ({
  entry,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <View style={JournalEntryItemStyles.editFormContainer}>
      <Text style={JournalEntryItemStyles.label}>Title:</Text>
      <TextInput
        style={JournalEntryItemStyles.editFormInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={JournalEntryItemStyles.label}>Content:</Text>
      <TextInput
        style={[JournalEntryItemStyles.editFormInput, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
      />
      <View style={JournalEntryItemStyles.editFormButtons}>
        <TouchableOpacity
          style={[
            JournalEntryItemStyles.editFormButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleSave}
        >
          <Text style={JournalEntryItemStyles.editFormButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            JournalEntryItemStyles.editFormButton,
            { backgroundColor: colors.error },
          ]}
          onPress={onCancel}
        >
          <Text style={JournalEntryItemStyles.editFormButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditJournalEntryForm;
