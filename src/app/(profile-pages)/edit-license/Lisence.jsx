"use client";

import Image from "next/image";
import React, { useState } from "react";

const Lisence = () => {
  const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create URL for the uploaded image
      setUploadedImage(newImageUrl); // Update the uploaded image state
    }
  };
  return (
    <div className="mt-16 flex flex-col justify-center items-center text-center gap-8 p-6 container m-auto">
      <h1 className="font-32 font-bold leading-10">
        Licenses and Qualifications
      </h1>
      <p className="font-16 font-normal leading-5 opacity-60">
        To ensure compliance with regulations, please provide your relevant HVAC
        and electrical licenses, as <br /> well as your areas of expertise.
      </p>

      <div className="flex flex-col gap-5">
        <div class="relative float-label-input mt-8">
          <input
            type="text"
            placeholder="Enter Your HVAC License Year"
            class="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
          />
          <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
            HVAC License Year
          </label>
        </div>
        <div class="relative float-label-input mt-8">
          <input
            type="text"
            placeholder="Enter Your License Number"
            class="block m-auto w-[200px] sm:w-[400px] md:w-[600px] lg:w-[823px] text-black font-16 semifont-bold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
          />
          <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
            License Number
          </label>
        </div>

        <div className="text-start">
          <h1 className="font-24 font-normal leading-10">
            Upload HVAC License
          </h1>
        </div>

        <div>
          {/* If an image is uploaded, show the uploaded image, else show the upload prompt */}
          {uploadedImage ? (
            <div className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3">
              <Image
                src={uploadedImage}
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
              onClick={() => document.getElementById("imageUpload").click()} // Trigger file input on div click
            >
              <Image src="/cloud.png" width={60} height={60} alt="cloud" />
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
            onChange={handleImageChange} // Handle image upload
          />
        </div>
      </div>
    </div>
  );
};

export default Lisence;
