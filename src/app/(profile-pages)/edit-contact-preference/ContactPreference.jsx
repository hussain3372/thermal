"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";
import { getProfileSummary } from "@/api/profile/getProfileSummary";

const ContactPreferences = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch profile summary to prefill contact preference data
  useEffect(() => {
    const fetchProfileSummary = async () => {
      try {
        const response = await getProfileSummary();
        const contactData = response.data?.Heating_System_Capacity;
        if (contactData) {
          setSelectedOption(contactData.preferred_contact_method || null);
          setSelectedResponse(contactData.interested_in_80km_work_orders || null);
        }
      } catch (err) {
        console.error("Error fetching contact preferences:", err);
      }
    };

    fetchProfileSummary();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Build payload with keys matching backend expectations
    const payload = {
      "preferred_contact_method": selectedOption,
      "interested_in_80km_work_orders": selectedResponse,
    };

    try {
      await saveOnboardingData("Heating_System_Capacity", payload);
      console.log("Contact Preferences saved successfully:", payload);
      router.push("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container m-auto">
        <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
          <h1 className="font-32 bold-font leading-10">
            What is Your Contact Preferences?
          </h1>

          <p className="font-16 font-normal leading-5 opacity-60">
            Please select your preferred way of receiving work orders and
            communications.
          </p>

          <div className="flex items-center justify-center">
            {/* First Set: SMS/Email */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-start justify-start flex-wrap gap-5">
                {["SMS", "Email"].map((option) => (
                  <span
                    key={option}
                    className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center cursor-pointer"
                    onClick={() => setSelectedOption(option)}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity={selectedOption === option ? "1" : "0.2"}>
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                          fill="#1559A8"
                        />
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </g>
                    </svg>
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="float-end gap-5 mt-16 py-3">
          <button
            className="secondary-blue-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default ContactPreferences;
