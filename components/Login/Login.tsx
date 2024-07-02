import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { CustomText } from "../CustonText/CustomText";
import AnimatedInput from "../AnimatedInput/AnimatedInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    //Todo: Perform login logic here
    //Todo: If login is successful:
    router.replace("/(app)");
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <CustomText style={styles.loginButtonText}>Login</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subTitle: {
    marginBottom: 20,
    color: colors.light,
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
});
