import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getOrdersByStatus = async (status) => {
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
      `${API_BASE_URL}/contractor/order/${status}`,
      axiosConfig
    );
    
    return response.data; // Ensure this is the correct data format returned from the API
  } catch (error) {
    // console.error("Error fetching orders:", error);
    throw error.response ? error.response.data : error.message;
  }
};
