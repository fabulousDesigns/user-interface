import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "@/constants/Colors";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(app)")}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={pickImage}
          >
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("@/assets/images/default-profile.jpg")
              }
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="pencil" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.editText}>Edit Profile Picture</Text>
        </View>
        <Text style={styles.promptText}>
          Personalize your profile information
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={colors.light}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.light}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            placeholderTextColor={colors.light}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor={colors.light}
            secureTextEntry
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    alignSelf: "flex-start",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 8,
  },
  editText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  promptText: {
    color: colors.light,
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 5,
  },
  inputLabel: {
    color: colors.light,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.bgVariant,
    borderRadius: 10,
    color: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  aboutInput: {
    height: 100,
    textAlignVertical: "top",
  },
  updateButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    margin: 20,
    borderRadius: 30,
  },
  updateButtonText: {
    color: colors.white,
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16,
  },
});
