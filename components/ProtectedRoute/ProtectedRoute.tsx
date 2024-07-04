import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import colors from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
