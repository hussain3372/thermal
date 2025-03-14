"use client";

import Image from "next/image";
import React, { useState } from "react";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";

const ContractorInsurance = ({ setSelectedTab }) => {
  const [selected, setSelected] = useState(null);
  const [ContractorCertificate, setContractorCertificate] = useState(null); // State to store the uploaded image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create URL for the uploaded image
      setContractorCertificate(newImageUrl); // Update the uploaded image state
    }
  };

  // Handle API submission
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Build payload matching the backend keys
    const payload = {
      "do_you_have_contractor_insurance": selected,
      "contractor_certificate": ContractorCertificate || null,
    };

    try {
      await saveOnboardingData("Contractor_Insurance", payload);
      console.log("Contractor insurance data saved successfully:", payload);
      setSelectedTab(3); // Move to "Experties" tab
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-14">
        {/* Third Section */}
        <div className="flex flex-col gap-8">
          <h1 className="font-32 font-bold leading-10">
            Do You Have Contractor Insurance?
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-start flex-wrap gap-5">
              {/* Yes Option */}
              <span
                className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center cursor-pointer"
                onClick={() => setSelected("yes")}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity={selected === "yes" ? "1" : "0.2"}>
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
                Yes
              </span>

              {/* No Option */}
              <span
                className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center cursor-pointer"
                onClick={() => setSelected("no")}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity={selected === "no" ? "1" : "0.2"}>
                    <path
                      d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                      fill="#114786"
                    />
                  </g>
                </svg>
                No
              </span>
            </div>
          </div>

          <p className="font-16 font-normal leading-5 opacity-60">
            If Yes, then Please upload your contractor insurance here.
          </p>

          <div className="text-start">
            <h1 className="font-24 font-normal leading-7 md:leading-10 text-center">
              Upload Contractor Insurance here
            </h1>
          </div>

          {ContractorCertificate ? (
            <div className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3">
              <Image
                src={ContractorCertificate}
                width={160}
                height={160}
                alt="uploaded-image"
                className="rounded-lg"
              />
              <h1 className="text-[#1849D6] font-20 font-bold">
                Contractor Insurance Uploaded
              </h1>
            </div>
          ) : (
            <div
              className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3 cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <Image src="/cloud.png" width={60} height={60} alt="cloud" />
              <h1 className="text-[#1849D6] font-20 font-bold">
                Upload Contractor Insurance Here
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

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      <div className="float-end gap-5 mt-16 py-3">
        <button
          className="secondary-blue-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
      <div className="float-start gap-5 mt-16 py-3">
        <button
          className="secondary-blue-btn-border"
          onClick={() => setSelectedTab(1)} // Move back to "Licenses and Qualifications" tab
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ContractorInsurance;
