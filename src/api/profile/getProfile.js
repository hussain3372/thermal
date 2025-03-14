import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getProfile = async () => {
    try {
        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("User is not authenticated. Token not found.");
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await axios.get(`${API_BASE_URL}/profile/contractor`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
