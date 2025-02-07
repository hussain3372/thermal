import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const mailVerification = async (otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, otp, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
