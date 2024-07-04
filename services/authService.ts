import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://localhost:5001";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
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

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    if (
      response.data &&
      response.data.accessToken &&
      response.data.refreshToken
    ) {
      await AsyncStorage.setItem("userToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.accessToken;
    } else {
      throw new Error("Login failed: No tokens received");
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

export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}/auth/refresh`,
      {
        refreshToken,
      }
    );

    if (
      response.data &&
      response.data.accessToken &&
      response.data.refreshToken
    ) {
      await AsyncStorage.setItem("userToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.accessToken;
    } else {
      throw new Error("Token refresh failed: No tokens received");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Token refresh failed");
    } else if (error.request) {
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      throw new Error("Error setting up the request: " + error.message);
    }
  }
};

export const getValidToken = async (): Promise<string | null> => {
  try {
    const accessToken = await AsyncStorage.getItem("userToken");
    if (!accessToken) {
      return null;
    }

    const decodedToken: any = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return await refreshToken();
    }

    return accessToken;
  } catch (error) {
    console.error("Error getting valid token:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("refreshToken");
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
