"use client";

import React, { useState, useEffect } from "react";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";
import { getProfileSummary } from "@/api/profile/getProfileSummary";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

const HeatPump = () => {
  const router = useRouter(); // Initialize router
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedMultiple, setSelectedMultiple] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const singleOptions = ["yes", "no"];
  const multipleOptions = [
    "Air source heat pumps",
    "Ductless mini-split heat pumps",
    "Hybrid heat pumps (Combined systems)",
    "Water source heat pumps",
  ];

  // Fetch profile summary to prefill heat pump data
  useEffect(() => {
    const fetchProfileSummary = async () => {
      try {
        const response = await getProfileSummary();
        const heatingData = response.data?.Heating_Appliances;
        if (heatingData) {
          setSelectedSingle(
            heatingData.have_you_installed_air_source_heat_pumps_before || null
          );
          setSelectedMultiple(
            heatingData.types_of_heat_pumps_worked_with || []
          );
        }
      } catch (err) {
        console.error("Error fetching heating appliance data:", err);
      }
    };

    fetchProfileSummary();
  }, []);

  const handleSingleSelect = (option) => {
    setSelectedSingle(option);
  };

  const handleMultipleSelect = (option) => {
    setSelectedMultiple((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const renderOption = (option, isSelected, onClick) => (
    <span
      key={option}
      className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center cursor-pointer"
      onClick={() => onClick(option)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <g opacity={isSelected ? "1" : "0.2"}>
          <path
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
            fill="#114786"
          />
        </g>
      </svg>
      {option}
    </span>
  );

  // API submission handler
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Build payload with separate keys for the single and multiple selections.
    const payload = {
      have_you_installed_air_source_heat_pumps_before: selectedSingle,
      types_of_heat_pumps_worked_with: selectedMultiple,
      image: null,
    };

    try {
      await saveOnboardingData("Heating_Appliances", payload);
      console.log("Heat Pump data saved successfully:", payload);
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
          <h1 className="font-32 font-bold leading-10">
            Tell Us About Your Heat Pump Experience?
          </h1>
          <p className="font-16 font-normal leading-5 opacity-60">
            This information helps us match you with relevant projects.
          </p>

          {/* You can add a UI for single selection here if needed */}
          {/* Example for single selection (optional, not altering current design):
          <div className="flex items-center justify-center gap-5">
            {singleOptions.map((option) =>
              renderOption(option, selectedSingle === option, handleSingleSelect)
            )}
          </div> 
          */}

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-start flex-wrap gap-5">
              {multipleOptions.map((option) =>
                renderOption(
                  option,
                  selectedMultiple.includes(option),
                  handleMultipleSelect
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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
  );
};

export default HeatPump;
