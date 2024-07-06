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
import OverlayMenuStyles from "@/styles/OverlayMenuStyles";
import { OverlayMenuProps } from "@/constants/utils";

const { width } = Dimensions.get("window");

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
      <View style={OverlayMenuStyles.menuContainer}>
        <TouchableOpacity
          style={OverlayMenuStyles.menuItem}
          onPress={() => {
            onClose();
            router.push("/summary");
          }}
        >
          <Text style={OverlayMenuStyles.menuText}>📊 Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={OverlayMenuStyles.menuItem}
          onPress={() => {
            onClose();
            router.push("/settings");
          }}
        >
          <Text style={OverlayMenuStyles.menuText}>👤 Profile</Text>
        </TouchableOpacity>
        <View style={OverlayMenuStyles.spacer}></View>
        <TouchableOpacity
          style={[OverlayMenuStyles.menuItem, OverlayMenuStyles.logoutButton]}
          onPress={onLogout}
        >
          <Text
            style={[OverlayMenuStyles.menuText, OverlayMenuStyles.logoutText]}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={OverlayMenuStyles.closeButton}
          onPress={onClose}
        >
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
});

export default OverlayMenu;
