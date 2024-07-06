import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessPopup from "@/components/Popups/secondarySucessPopup";
import ErrorPopup from "@/components/Popups/ErrorPopup";
import settingsStyles from "@/styles/SettingsStyles";
import { getUserDetails, updateProfile } from "@/services/getUserDetails";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No authentication token found");

      const userData = await getUserDetails(token);
      setName(userData.username);
      setEmail(userData.email);

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error loading user data:", error);
      setPopupMessage("Failed to load user data");
      setErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (password !== confirmPassword) {
      setPopupMessage("Passwords do not match");
      setErrorPopupVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No authentication token found");
      const userData = { name, email, newPassword: password };
      const response = await updateProfile(token, userData);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));
      setPopupMessage("Profile updated successfully");
      setSuccessPopupVisible(true);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setPopupMessage("Failed to update profile");
      setErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={settingsStyles.container}
    >
      <ScrollView contentContainerStyle={settingsStyles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <TouchableOpacity
              style={settingsStyles.backButton}
              onPress={() => router.push("/(app)")}
            >
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={settingsStyles.profileSection}>
              <TouchableOpacity style={settingsStyles.profileImageContainer}>
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("@/assets/images/default-profile.jpg")
                  }
                  style={settingsStyles.profileImage}
                />
                <View style={settingsStyles.editIconContainer}>
                  <Ionicons name="pencil" size={16} color={colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={settingsStyles.editText}>Edit Profile Picture</Text>
            </View>
            <Text style={settingsStyles.promptText}>
              Personalize your profile information
            </Text>

            <View style={settingsStyles.inputContainer}>
              <Text style={settingsStyles.inputLabel}>Name</Text>
              <TextInput
                style={settingsStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.light}
              />
            </View>
            <View style={settingsStyles.inputContainer}>
              <Text style={settingsStyles.inputLabel}>Email</Text>
              <TextInput
                style={settingsStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.light}
                keyboardType="email-address"
              />
            </View>
            <View style={settingsStyles.inputContainer}>
              <Text style={settingsStyles.inputLabel}>New Password</Text>
              <TextInput
                style={settingsStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter new password"
                placeholderTextColor={colors.light}
                secureTextEntry
              />
            </View>
            <View style={settingsStyles.inputContainer}>
              <Text style={settingsStyles.inputLabel}>
                Confirm New Password
              </Text>
              <TextInput
                style={settingsStyles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={colors.light}
                secureTextEntry
              />
            </View>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={settingsStyles.updateButton}
        onPress={handleUpdateProfile}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={settingsStyles.updateButtonText}>Update Profile</Text>
        )}
      </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
}
