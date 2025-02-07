"use client";

import Image from "next/image";
import React, { useState } from "react";

const Experties = () => {
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
          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Hydronic systems
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Geothermal
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Oil
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Furnaces
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            AC
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Water heaters
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Ventilation systems
          </span>

          <span className="font-24 font-normal leading-8 px-5 gap-3 rounded-2xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.66 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z"
                fill="#70A9F2"
              />
            </svg>
            Ductless mini-split systems{" "}
          </span>
        </div>
      </div>

      <div className="mt-14 flex flex-col justify-center items-center text-center gap-8">
        <h1 className="font-32 font-bold leading-10">
          Do you have Training or Authorization <br /> from Any Brand
        </h1>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <div className="grid sm:grid-cols-2 gap-8">
          <div class="relative float-label-input mt-8">
            <input
              type="text"
              placeholder="Enter Your Brand Name"
              class=" w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
            />
            <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 regular-class px-3">
              Brand Name
            </label>
          </div>
          <div class="relative float-label-input mt-8">
            <input
              type="text"
              placeholder="Enter Your Date of Training"
              class=" w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
            />
            <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 regular-class px-3">
              Date of Training
            </label>
          </div>
        </div>

        <div className="text-start">
          <h1 className="font-24 font-normal leading-7 md:leading-10 text-start">
            Upload Training or Authorization Certificate here
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
                Upload Contractor Insurance Here
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

export default Experties;
