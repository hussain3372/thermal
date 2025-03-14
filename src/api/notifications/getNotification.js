import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getNotification = async () => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.error("Frontend Error: Authorization token is missing.");
      return { success: false, message: "Missing auth token", data: [] };
    }

    const response = await axios.get(`${BASE_URL}/notification/all-read`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Ensure the response contains valid data
    if (!response.data || !response.data.data) {
      console.error("Backend Error: Invalid API response format", response.data);
      return { success: false, message: "Invalid API response format", data: [] };
    }

    // Parse notifications safely
    const parsedNotifications = response.data.data.map((notification) => ({
      ...notification,
      data: typeof notification.data === "string"
        ? JSON.parse(notification.data) // Parse only if it's a string
        : notification.data, // Otherwise, keep it as is
    }));

    return { success: true, message: "Data fetched successfully", data: parsedNotifications };
  } catch (error) {
    if (error.response) {
      // API responded with an error (Backend Error)
      console.error("Backend Error:", error.response.data);
      return { success: false, message: error.response.data?.message || "Backend error", data: [] };
    } else if (error.request) {
      // No response from the server (Network Issue)
      console.error("Network Error: No response received from server", error.request);
      return { success: false, message: "Network error", data: [] };
    } else {
      // Something else went wrong (Frontend Error)
      console.error("Frontend Error:", error.message);
      return { success: false, message: "Frontend error", data: [] };
    }
  }
};
