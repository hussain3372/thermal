import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Function to send onboarding data dynamically for each onboarding step.
 * @param {string} step - The current onboarding step (e.g., "Personal_Information")
 * @param {object} data - The payload containing user input for the step
 * @returns {Promise<object>} - API response data
 */
export const saveOnboardingData = async (step, data) => {
  try {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem("id");

    console.log("User ID:", userId);

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await axios.post(
      `${API_BASE_URL}/onboarding`,
      {
        id: userId, // Add user ID to the payload

        [step]: data,

      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Data saved successfully in backend:", response);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
