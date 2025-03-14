import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteNotification = async (id) => {
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

    // Make the API call with the correct placement of headers
    const response = await axios.delete(
      `${BASE_URL}/notification/delete/${id}`, 
      { headers } // Headers should be inside an object as the third parameter
    );

    return response.data; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};
