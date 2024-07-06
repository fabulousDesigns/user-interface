import { API_URL } from "@/constants/utils";
import axios from "axios";

export const getUserDetails = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (token: string, userData: any) => {
  try {
    const response = await axios.put(`${API_URL}/api/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
