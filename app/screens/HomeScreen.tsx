import { View, StatusBar } from "react-native";
import useTheme from "@/hooks/useTheme";
import { CustomText } from "@/components/CustonText/CustomText";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <CustomText>
        Edit app/screens/HomeScreen.tsx to edit this screen.
      </CustomText>
    </View>
  );
}
