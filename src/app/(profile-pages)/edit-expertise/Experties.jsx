"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";
import { getProfileSummary } from "@/api/profile/getProfileSummary";
import { useRouter } from "next/navigation"; // Import useRouter

const Experties = () => {
  const router = useRouter(); // Initialize router
  // State for areas of expertise
  const [selectedOptions, setSelectedOptions] = useState([]);
  // States for brand details
  const [brandName, setBrandName] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  // State for certificate image upload
  const [uploadedImage, setUploadedImage] = useState(null);
  // API loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const options = [
    "Hydronic systems",
    "Geothermal",
    "Oil",
    "Furnaces",
    "AC",
    "Water heaters",
    "Ventilation systems",
    "Ductless mini-split systems",
  ];

  // Fetch the profile summary on mount to prefill expertise data
  useEffect(() => {
    const fetchProfileSummary = async () => {
      try {
        const response = await getProfileSummary();
        const expData = response.data?.Experties;
        if (expData) {
          setSelectedOptions(
            expData[
              "please_indicate_your_main_areas_of_specialty_and_any_relevant_training_or_brand_authorizations."
            ] || []
          );
          // Optional: prefill other fields if needed
          setBrandName(expData.brand_name || "");
          setTrainingDate(expData.date_of_training || "");
          setUploadedImage(expData.training_certificate || null);
        }
      } catch (error) {
        console.error("Error fetching expertise data:", error);
      }
    };

    fetchProfileSummary();
  }, []);

  // Toggle expertise options
  const toggleSelection = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Handle image change for certificate upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setUploadedImage(newImageUrl);
    }
  };

  // API submission handler
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Build payload using keys expected by the backend.
    const payload = {
      "please_indicate_your_main_areas_of_specialty_and_any_relevant_training_or_brand_authorizations.":
        selectedOptions,
      brand_name: brandName,
      date_of_training: trainingDate,
      training_certificate: uploadedImage || null,
    };

    try {
      await saveOnboardingData("Experties", payload);
      console.log("Expertise data saved successfully:", payload);
      router.push("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container m-auto">
      <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
        <h1 className="font-32 font-bold leading-10">
          What is Your Areas of Expertise?
        </h1>
        <p className="font-16 font-normal leading-5 opacity-60">
          Please indicate your main areas of specialty and any relevant training
          or brand authorizations.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <div className="flex flex-col items-start justify-start flex-wrap gap-3">
          {options.map((option) => (
            <span
              key={option}
              className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center cursor-pointer"
              onClick={() => toggleSelection(option)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <g opacity={selectedOptions.includes(option) ? "1" : "0.2"}>
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                    fill="#114786"
                  />
                </g>
              </svg>
              {option}
            </span>
          ))}
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

export default Experties;
