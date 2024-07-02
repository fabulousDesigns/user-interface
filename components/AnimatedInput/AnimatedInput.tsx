import React, { useState, useRef } from "react";
import { View, TextInput, Animated, StyleSheet } from "react-native";
import colors from "@/constants/Colors";

interface AnimatedInputProps {
  placeholder: any;
  value: any;
  onChangeText: any;
  secureTextEntry: any;
  keyboardType: any;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const lineScale = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(lineScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(lineScale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.field}>
      <TextInput
        style={[styles.input, isFocused && { paddingBottom: 5 }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={colors.light}
        underlineColorAndroid="transparent"
      />
      <View style={styles.line}>
        <Animated.View
          style={[styles.animatedLine, { transform: [{ scaleX: lineScale }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    position: "relative",
    width: "100%",
    maxWidth: 400,
    margin: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.light,
    padding: 15,
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 15,
    marginBottom: 1,
    letterSpacing: 1,
    width: "100%",
    outlineStyle: "none",
  },
  line: {
    width: "100%",
    height: 3,
    position: "absolute",
    bottom: -1,
    backgroundColor: colors.bg,
  },
  animatedLine: {
    width: "100%",
    height: 3,
    backgroundColor: colors.primary,
    transform: [{ scaleX: 0 }],
  },
});

export default AnimatedInput;
