import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const reschedule = async (id, { price, comment, deadline }) => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("User is not authenticated. Token not found.");

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = { price, comment, deadline }; // Formatted data for the API request

    const response = await axios.post(`${API_BASE_URL}/order/dateUpdate/${id}`, data, // Send the data along with the POST request
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.error("Error posting:", error);
    throw error.response ? error.response.data : error.message;
  }
};
