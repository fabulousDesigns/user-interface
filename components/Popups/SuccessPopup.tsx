import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import colors from "@/constants/Colors";

interface SuccessPopupProps {
  visible: boolean;
  message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ visible, message }) => {
  const translateY = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.popup}>
        <Text style={styles.icon}> 🎉 </Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  popup: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 15,
    marginRight: 10,
  },
  message: {
    color: colors.bg,
    fontSize: 15,
    // fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default SuccessPopup;
