import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const readNotification = async (id) => {
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

    // Make the API call with the correct argument structure
    const response = await axios.post(
      `${BASE_URL}/notification/read/${id}`,
      {}, // Empty body, since it's a POST request
      { headers } // Headers should be in the third argument
    );

    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};
