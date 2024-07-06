import colors from "@/constants/Colors";
import { CustomTextStyle } from "@/constants/utils";
import { StyleSheet } from "react-native";

const AnimatedInputStyles = StyleSheet.create({
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
  } as CustomTextStyle,
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

export default AnimatedInputStyles;
