import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AnimatedInput from "../AnimatedInput/AnimatedInput";
import { CustomText } from "../CustonText/CustomText";
import { register } from "@/services/authService";
import SuccessPopup from "../Popups/SuccessPopup";
import SignupStyles from "@/styles/SignUpStyles";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

  const validateInputs = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const showSuccessAndRedirect = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  const handleSignUp = async () => {
    setError("");
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      await register({ username, email, password });
      showSuccessAndRedirect();
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={SignupStyles.container}>
      <Text style={SignupStyles.welcomeText}>
        Let's Get
        {"\n"}
        You Started 🚀
      </Text>
      <View style={SignupStyles.formContainer}>
        <AnimatedInput
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          secureTextEntry={undefined}
        />
        <AnimatedInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          secureTextEntry={undefined}
        />
        <AnimatedInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          keyboardType={undefined}
        />
        <AnimatedInput
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          keyboardType={undefined}
        />
        {error ? <Text style={SignupStyles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={SignupStyles.signUpButton}
          onPress={handleSignUp}
        >
          <CustomText style={SignupStyles.signUpButtonText}>Sign Up</CustomText>
        </TouchableOpacity>
      </View>
      <View style={SignupStyles.header}>
        <Text style={SignupStyles.headerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={SignupStyles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <SuccessPopup
        visible={showSuccessMessage}
        message="Account created successfully!..."
      />
    </View>
  );
}
