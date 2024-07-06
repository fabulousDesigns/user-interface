import React, { useState, useRef } from "react";
import { View, TextInput, Animated } from "react-native";
import colors from "@/constants/Colors";
import { AnimatedInputProps } from "@/constants/utils";
import AnimatedInputStyles from "@/styles/AnimatedInputStyles";

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
    <View style={AnimatedInputStyles.field}>
      <TextInput
        style={[AnimatedInputStyles.input, isFocused && { paddingBottom: 5 }]}
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
      <View style={AnimatedInputStyles.line}>
        <Animated.View
          style={[
            AnimatedInputStyles.animatedLine,
            { transform: [{ scaleX: lineScale }] },
          ]}
        />
      </View>
    </View>
  );
};

export default AnimatedInput;
