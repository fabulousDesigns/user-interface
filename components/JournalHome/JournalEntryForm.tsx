import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
  // Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
import colors from "@/constants/Colors";
import CategoryDropdown from "./CategoryDropdown";
import { JournalEntryFormProps } from "@/constants/utils";
import JournalEntryFormStyles from "@/styles/JournalEntryFormStyles";

// const { width } = Dimensions.get("window");

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: "",
  });

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { title: "", content: "", category: "" };

    if (!title.trim()) {
      newErrors.title = "Please enter a title.";
      hasError = true;
    }
    if (!content.trim()) {
      newErrors.content = "Please enter the content.";
      hasError = true;
    }
    if (!categoryId) {
      newErrors.category = "Please select a category.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setIsLoading(true);

    try {
      await onSubmit({ title, content, categoryId, images });
      resetForm();
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      Alert.alert("Error", "Failed to submit journal entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setCategoryId(null);
    setImages([]);
    setErrors({ title: "", content: "", category: "" });
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      resetForm();
    });
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     setImages([...images, result.assets[0].uri]);
  //   }
  // };

  // const removeImage = (index: number) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={JournalEntryFormStyles.header}>
        <Text style={JournalEntryFormStyles.headerTitle}>New Entry</Text>
        <TouchableOpacity
          style={JournalEntryFormStyles.closeButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView style={JournalEntryFormStyles.formContainer}>
        <Text style={JournalEntryFormStyles.label}>Title</Text>
        <TextInput
          style={JournalEntryFormStyles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor={colors.bg}
        />
        {errors.title ? (
          <Text style={JournalEntryFormStyles.errorText}>{errors.title}</Text>
        ) : null}

        <Text style={JournalEntryFormStyles.label}>Category</Text>
        <CategoryDropdown
          selectedCategory={category}
          onSelectCategory={(categoryName, id) => {
            setCategory(categoryName);
            setCategoryId(id);
          }}
        />
        {errors.category ? (
          <Text style={JournalEntryFormStyles.errorText}>
            {errors.category}
          </Text>
        ) : null}

        <Text style={JournalEntryFormStyles.label}>Content</Text>
        <TextInput
          style={[
            JournalEntryFormStyles.input,
            JournalEntryFormStyles.contentInput,
          ]}
          value={content}
          onChangeText={setContent}
          placeholder="Write your journal entry here"
          placeholderTextColor={colors.bg}
          multiline
        />
        {errors.content ? (
          <Text style={JournalEntryFormStyles.errorText}>{errors.content}</Text>
        ) : null}

        {/* <Text style={JournalEntryFormStyles.label}>Images</Text> */}
        {/* <TouchableOpacity style={JournalEntryFormStyles.imagePickerButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color={colors.white} />
          <Text style={JournalEntryFormStyles.imagePickerButtonText}>Add Image</Text>
        </TouchableOpacity> */}
        {/* <ScrollView style={JournalEntryFormStyles.imagePreviewContainer}>
          <View style={JournalEntryFormStyles.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={JournalEntryFormStyles.imageWrapper}>
                <Image source={{ uri: image }} style={JournalEntryFormStyles.image} />
                <TouchableOpacity
                  style={JournalEntryFormStyles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons
                    name="close-circle"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView> */}
      </ScrollView>
      <TouchableOpacity
        style={[
          JournalEntryFormStyles.submitButton,
          isLoading && JournalEntryFormStyles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={JournalEntryFormStyles.submitButtonText}>
          {isLoading ? "Submitting..." : "Save Entry"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "90%",
    backgroundColor: colors.bgVariant,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default JournalEntryForm;
