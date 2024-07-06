import axios from "axios";
import { getValidToken } from "./authService";
const API_URL = "http://localhost:5001/api";
export const updateProfilePicture = async (imageUri: any) => {
  const token: string | null = await getValidToken();
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("profilePicture", blob, "profile.jpg");
  try {
    const response = await fetch(`${API_URL}/profile-picture`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update profile picture");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
};

export const updateProfile = async (userData: any) => {
  const token: string | null = await getValidToken();

  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
