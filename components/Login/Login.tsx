import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AnimatedInput from "../AnimatedInput/AnimatedInput";
import { CustomText } from "../CustonText/CustomText";
import SuccessPopup from "../Popups/SuccessPopup";
import { useAuth } from "@/contexts/AuthContext";
import LoginStyles from "@/styles/LoginStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const validateInputs = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setError("");
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.replace("/(app)");
      }, 1500);
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.welcomeText}>
        Hey 👋,
        {"\n"}
        Welcome Back 😊
      </Text>
      <View style={LoginStyles.formContainer}>
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
        {error ? <Text style={LoginStyles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={LoginStyles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <CustomText style={LoginStyles.loginButtonText}>
            {isLoading ? "Logging in..." : "Login"}
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={LoginStyles.header}>
        <Text style={LoginStyles.headerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/signup")}>
          <Text style={LoginStyles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <SuccessPopup
        visible={showSuccessMessage}
        message="Login successful! Redirecting..."
      />
    </View>
  );
}
