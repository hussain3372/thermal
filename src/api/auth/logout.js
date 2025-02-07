import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const logout = async () => {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem("auth_token");
    
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`, 
      {}, // Empty body for the POST request
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      }
    );

    // Optionally, clear the token from local storage
    localStorage.removeItem("auth_token");

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
