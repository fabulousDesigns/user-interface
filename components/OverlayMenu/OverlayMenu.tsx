import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

interface OverlayMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isVisible,
  onClose,
  onLogout,
}) => {
  const router = useRouter();
  const translateX = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            router.push("/summary");
          }}
        >
          <Text style={styles.menuText}>📊 Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            onClose();
            router.push("/settings");
          }}
        >
          <Text style={styles.menuText}>👤 Profile</Text>
        </TouchableOpacity>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={onLogout}
        >
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.75,
    backgroundColor: colors.bgVariant,
    zIndex: 1000,
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    letterSpacing: 1,
    marginTop: 15,
  },
  menuText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "justify",
    fontWeight: "bold",
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 20,
    backgroundColor: colors.error,
    borderRadius: 30,
  },
  logoutText: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default OverlayMenu;
