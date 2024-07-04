import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { logout } from "@/services/authService";
import OverlayMenu from "../OverlayMenu/OverlayMenu";

export default function JournalHome() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error (show an alert, for example)
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Journal</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={40} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/journal-logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.startText}>Start Journaling</Text>
        <Text style={styles.subText}>Create your personal journal.</Text>
        <Text style={styles.subText}>Tap the plus button to get started.</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={32} color={colors.white} />
      </TouchableOpacity>
      <OverlayMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onLogout={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  startText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  subText: {
    fontSize: 16,
    color: colors.light,
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontWeight: "bold",
  },
});
