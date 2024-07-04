import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import AnimatedInput from "../AnimatedInput/AnimatedInput";
import { CustomText } from "../CustonText/CustomText";
import SuccessPopup from "../Popups/SuccessPopup";
import { useAuth } from "@/contexts/AuthContext";

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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hey 👋,
        {"\n"}
        Welcome Back 😊
      </Text>
      <View style={styles.formContainer}>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <CustomText style={styles.loginButtonText}>
            {isLoading ? "Logging in..." : "Login"}
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/signup")}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <SuccessPopup
        visible={showSuccessMessage}
        message="Login successful! Redirecting..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 25,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 40,
  },
  headerText: {
    color: colors.light,
    marginRight: 5,
    letterSpacing: 1,
  },
  signUpText: {
    color: colors.primary,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.bg,
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "justify",
    marginBottom: 35,
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 27,
    alignItems: "center",
    marginTop: 30,
    shadowColor: colors.bg,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  loginButtonText: {
    color: colors.bg,
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
