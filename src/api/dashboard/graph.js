import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/contractor/dashboard/chart";

export const GraphData = async (filters) => {
  try {
    const token = localStorage.getItem("auth_token");
    console.log("GraphData: Token =", token);
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

    console.log("GraphData: Axios Config =", axiosConfig);
    console.log("GraphData: URL =", BASE_URL);

    const response = await axios.get(BASE_URL, axiosConfig);

    console.log("GraphData: Full Response =", response);
    console.log("GraphData: Response Data =", response.data);

    return response.data;
  } catch (error) {
    console.error("GraphData API Error:", error);
    if (error.response) {
      console.error("GraphData Error Response Data:", error.response.data);
      console.error("GraphData Error Status:", error.response.status);

      if (error.response.status === 401) {
        toast.error("Unauthorized! Session expired. Please log in again.");
      } else {
        toast.error(`Failed to fetch Graph Data: ${error.response.statusText}`);
      }
    } else {
      toast.error("Failed to fetch Graph Data. See console for details.");
    }
    throw error;
  }
};
