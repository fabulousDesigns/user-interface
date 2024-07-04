import React, { useState, useCallback, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Splash from "@/components/splash/Splash";
import { AuthProvider } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
      router.replace("/login");
    }
  }, [isReady, router]);

  if (!isReady) {
    return <Splash onFinish={() => setIsReady(true)} />;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        onLayout={onLayoutRootView}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthProvider>
  );
}
