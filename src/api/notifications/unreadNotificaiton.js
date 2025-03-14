import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const markAsUnread = async (id) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Configure headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Make the API call with the token and other required configurations
    const response = await axios.post(
      `${BASE_URL}/notification/unread/${id}`,
      {}, // Empty body, since it's a POST request
      { headers } // Headers should be in the third argument
    );

    return response.data; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};
