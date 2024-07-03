import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import AnimatedInput from "../AnimatedInput/AnimatedInput";
import { CustomText } from "../CustonText/CustomText";
import { register } from "@/services/authService";
import SuccessPopup from "../Popups/SuccessPopup";

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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Let's Get
        {"\n"}
        You Started 🚀
      </Text>
      <View style={styles.formContainer}>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <CustomText style={styles.signUpButtonText}>Sign Up</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <SuccessPopup
        visible={showSuccessMessage}
        message="Account created successfully!..."
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
  loginText: {
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
  signUpButton: {
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
  signUpButtonText: {
    color: colors.bg,
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
