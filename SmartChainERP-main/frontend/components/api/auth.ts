import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // ✅ Updated base URL

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, {
      username, // ✅ Changed from 'email' to 'username'
      password,
    });

    const { access, refresh } = response.data; // JWT tokens

    // ✅ Store tokens for authentication
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    return response.data; // Returns token data
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
