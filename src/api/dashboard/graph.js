import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/contractor/dashboard/chart";

export const GraphData = async (filters) => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      toast.error("Unauthorized! Please log in again.");
      console.error("GraphData Error: No auth token found in localStorage.");
      return null;
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: filters,
    };

    const response = await axios.get(BASE_URL, axiosConfig);

    return response.data;
  } catch (error) {
    console.error("GraphData API Error:", error);
    throw error;
  }
};
