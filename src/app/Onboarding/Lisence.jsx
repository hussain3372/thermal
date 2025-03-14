"use client";

import Image from "next/image";
import React, { useState } from "react";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";

const Lisence = ({ setSelectedTab }) => {
  const [currentSection, setCurrentSection] = useState(1); // Track the current section

  // State for text inputs in both sections
  const [licenseData, setLicenseData] = useState({
    hvac_license_year: "",
    hvac_license_number: "",
    electrical_license_year: "",
    electrical_license_number: "",
  });

  // Separate image states for HVAC and Electrical sections
  const [hvacImage, setHvacImage] = useState(null);
  const [electricalImage, setElectricalImage] = useState(null);

  // API loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle change for text inputs
  const handleChange = (e) => {
    setLicenseData({ ...licenseData, [e.target.name]: e.target.value });
  };

  // Handle image change; set image based on current section
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      if (currentSection === 1) {
        setHvacImage(newImageUrl);
      } else if (currentSection === 2) {
        setElectricalImage(newImageUrl);
      }
    }
  };

  // Function to go to the next section (for section 1)
  const handleNext = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Function to go to the previous section
  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Final submission: call API with the license data then move to the next tab
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Combine data from both sections into the payload.
    // Note: The API key names match those expected by the backend.
    const payload = {
      "hvac_license_year": licenseData.hvac_license_year,
      "license_number": licenseData.hvac_license_number,
      "electrical_license_year": licenseData.electrical_license_year,
      "electrical_license_number": licenseData.electrical_license_number,
      "hvac_image": hvacImage || null,
      "electrical_image": electricalImage || null,
    };

    try {
      await saveOnboardingData("Licenses_And_Qualifications", payload);
      console.log("License data saved successfully:", payload);
      setSelectedTab(2); // Move to "Contractor Insurance" tab
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
        {/* SECTION CONTENT BASED ON currentSection */}
        {currentSection === 1 && (
          <div className="flex flex-col gap-5">
            <h1 className="font-32 font-bold leading-10">
              Licenses and Qualifications
            </h1>
            <p className="font-16 font-normal leading-5 opacity-60">
              To ensure compliance with regulations, please provide your
              relevant HVAC and electrical licenses, as <br /> well as your
              areas of expertise.
            </p>
            {/* First Section */}
            <div className="relative float-label-input mt-8">
              <input
                type="text"
                name="hvac_license_year"
                placeholder="Enter Your HVAC License Year"
                value={licenseData.hvac_license_year}
                onChange={handleChange}
                className="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                HVAC License Year
              </label>
            </div>
            <div className="relative float-label-input mt-8">
              <input
                type="text"
                name="hvac_license_number"
                placeholder="Enter Your License Number"
                value={licenseData.hvac_license_number}
                onChange={handleChange}
                className="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                License Number
              </label>
            </div>

            <div>
              <h1 className="font-24 font-normal leading-10 text-start">
                Upload HVAC License
              </h1>
            </div>
            <div>
              {/* Image Upload Section */}
              <div>
                {hvacImage ? (
                  <div className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3">
                    <Image
                      src={hvacImage}
                      width={160}
                      height={160}
                      alt="uploaded-image"
                      className="rounded-lg"
                    />
                    <h1 className="text-[#1849D6] font-20 font-bold">
                      HVAC License Uploaded
                    </h1>
                  </div>
                ) : (
                  <div
                    className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3 cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <Image
                      src="/cloud.png"
                      width={60}
                      height={60}
                      alt="cloud"
                    />
                    <h1 className="text-[#1849D6] font-20 font-bold">
                      Upload HVAC License Here
                    </h1>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="flex flex-col gap-5">
            <h1 className="font-32 font-bold leading-10">
              Licenses and Qualifications
            </h1>
            <p className="font-16 font-normal leading-5 opacity-60">
              To ensure compliance with regulations, please provide your
              relevant HVAC and electrical licenses, as <br /> well as your
              areas of expertise.
            </p>
            {/* Second Section */}
            <div className="relative float-label-input mt-8">
              <input
                type="text"
                name="electrical_license_year"
                placeholder="Enter Your Electrical License Year"
                value={licenseData.electrical_license_year}
                onChange={handleChange}
                className="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Electrical License Year
              </label>
            </div>
            <div className="relative float-label-input mt-8">
              <input
                type="text"
                name="electrical_license_number"
                placeholder="Enter Your License Number"
                value={licenseData.electrical_license_number}
                onChange={handleChange}
                className="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                License Number
              </label>
            </div>

            <div>
              <h1 className="font-24 font-normal leading-10 text-start">
                Upload Electrical License here
              </h1>
            </div>
            <div>
              {/* Image Upload Section */}
              <div>
                {electricalImage ? (
                  <div className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3">
                    <Image
                      src={electricalImage}
                      width={160}
                      height={160}
                      alt="uploaded-image"
                      className="rounded-lg"
                    />
                    <h1 className="text-[#1849D6] font-20 font-bold">
                      Electrical License Uploaded
                    </h1>
                  </div>
                ) : (
                  <div
                    className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3 cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <Image
                      src="/cloud.png"
                      width={60}
                      height={60}
                      alt="cloud"
                    />
                    <h1 className="text-[#1849D6] font-20 font-bold">
                      Upload Electrical License Here
                    </h1>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>

      {/* BUTTONS */}
      <div className="gap-5 mt-16 py-3">
        {/* Back button (not shown on first section) */}
        {currentSection !== 1 && (
          <button
            onClick={handleBack}
            className="secondary-blue-btn-border float-start"
          >
            Back
          </button>
        )}

        {/* For section 2: Next button submits the data via API */}
        {currentSection === 2 && (
          <div className="float-end gap-5">
            <button
              className="secondary-blue-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </div>
        )}

        {/* For section 1: Next button moves to section 2 */}
        {currentSection !== 2 && (
          <button onClick={handleNext} className="secondary-blue-btn float-end">
            Next
          </button>
        )}
        {currentSection !== 2 && (
          <div className="float-start gap-5">
            <button
              className="secondary-blue-btn-border"
              onClick={() => setSelectedTab(0)} // Move back to "Personal Information" tab
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lisence;
