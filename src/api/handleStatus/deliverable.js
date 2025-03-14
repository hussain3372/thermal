// deliverable.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const deliverable = async (data) => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("User is not authenticated. Token not found.");

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Send the payload (data) and then the config
    const response = await axios.post(`${API_BASE_URL}/order/Complete`, data, axiosConfig);

    console.log("api response", response)

    return response.data;
  } catch (error) {
    console.error("Error posting:", error);
    throw error.response ? error.response.data : error.message;
  }
};
