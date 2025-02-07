import Image from "next/image";
import React, { useState } from "react";

const ContractorInsurance = () => {

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
    <div>
      <div className="mt-14">
        {/* Third Section */}
        <div className="flex flex-col gap-8">
          <h1 className="font-32 font-bold leading-10">
            Do You Have Contractor Insurance?
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-start flex-wrap gap-5">
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
                yes
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
                no
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
                Upload Contractor Insurance Here{" "}
              </h1>
            </div>
          ) : (
            <div
              className="border border-[#00000066] rounded-xl py-16 flex flex-col justify-center items-center gap-3 cursor-pointer"
              onClick={() => document.getElementById("imageUpload").click()}
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
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractorInsurance;
