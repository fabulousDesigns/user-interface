import React from "react";
import { Text as RNText, TextProps } from "react-native";
import useTheme from "@/hooks/useTheme";

export function CustomText(props: TextProps) {
  const { colors } = useTheme();
  return <RNText {...props} style={[{ color: colors.white }, props.style]} />;
}
