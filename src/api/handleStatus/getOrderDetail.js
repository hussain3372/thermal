import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getOrdersDetail = async (id) => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("User is not authenticated. Token not found.");

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/order/show/${id}`,
      axiosConfig
    );

    return response.data; // Ensure this is the correct data format returned from the API
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error.response ? error.response.data : error.message;
  }
};
