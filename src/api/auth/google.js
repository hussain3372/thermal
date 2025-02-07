import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const googlelogin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/google/login`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
