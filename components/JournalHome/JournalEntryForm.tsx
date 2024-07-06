import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "@/constants/Colors";
import CategoryDropdown from "./CategoryDropdown";

const { width } = Dimensions.get("window");

interface JournalEntryFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (entry: {
    title: string;
    content: string;
    categoryId: number | any;
    images: string[];
  }) => Promise<void>;
}

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Entry</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor={colors.bg}
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}

        <Text style={styles.label}>Category</Text>
        <CategoryDropdown
          selectedCategory={category}
          onSelectCategory={(categoryName, id) => {
            setCategory(categoryName);
            setCategoryId(id);
          }}
        />
        {errors.category ? (
          <Text style={styles.errorText}>{errors.category}</Text>
        ) : null}

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          value={content}
          onChangeText={setContent}
          placeholder="Write your journal entry here"
          placeholderTextColor={colors.bg}
          multiline
        />
        {errors.content ? (
          <Text style={styles.errorText}>{errors.content}</Text>
        ) : null}

        {/* <Text style={styles.label}>Images</Text> */}
        {/* <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color={colors.white} />
          <Text style={styles.imagePickerButtonText}>Add Image</Text>
        </TouchableOpacity> */}
        <ScrollView style={styles.imagePreviewContainer}>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
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
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: colors.bg,
    fontSize: 16,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  imagePickerButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 1,
  },
  imagePreviewContainer: {
    height: 150,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: (width - 60) / 4,
    height: (width - 60) / 4,
    margin: 5,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 12,
    padding: 2,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default JournalEntryForm;
