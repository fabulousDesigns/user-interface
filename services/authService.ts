import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export async function register(data: RegisterData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    if (response.data && response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      return response.data.token;
    } else {
      throw new Error("Login failed: No token received");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      throw new Error("Error setting up the request: " + error.message);
    }
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const isLoggedIn = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    return userToken !== null;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};
