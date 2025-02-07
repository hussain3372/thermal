"use client";

import Image from "next/image";
import React, { useState } from "react";

const Edit = () => {
  const [profileImage, setProfileImage] = useState("/pr3.svg"); // Default profile image

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create URL for the uploaded image
      setProfileImage(newImageUrl); // Update profile image state
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="font-20 font-normal leading-6 flex items-center gap-3">
            Edit Profile
          </div>
        </div>

        <div className="mt-5 relative">
          {/* Profile Image */}
          <div className="rounded-full border-5 border-white shadow-2xl pt-2 w-[160px] h-[160px]">
            <Image
              src={profileImage} // Use state to update the profile image
              width={160}
              height={160}
              alt="profile"
              className="rounded-full"
            />
          </div>

          {/* Edit Button */}
          <div
            className="absolute left-[100px] top-[115px] cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange} // Handle image change on file select
          />
        </div>

        <div className="mt-10">
          <div className="grid sm:grid-cols-2 gap-8">
            <div class="relative float-label-input">
              <input
                type="text"
                placeholder="Enter Text"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Heading Text
              </label>
            </div>
            <div class="relative float-label-input">
              <input
                type="email"
                placeholder="Email Address"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Enter Your Email Address
              </label>
            </div>
            <div class="relative float-label-input">
              <input
                type="text"
                placeholder="Enter Text"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Heading Text
              </label>
            </div>
            <div class="relative float-label-input">
              <input
                type="text"
                placeholder="Your Province"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Select Your Province
              </label>
            </div>
            <div class="relative float-label-input">
              <input
                type="text"
                placeholder="Enter Text"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Heading Text
              </label>
            </div>
            <div class="relative float-label-input">
              <input
                type="text"
                placeholder="Enter Number of Employees"
                class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Number of Employees
              </label>
            </div>
          </div>

          <div class="relative float-label-input mt-8">
            <input
              type="text"
              placeholder="Enter Your Complete Address"
              class="block m-auto w-full text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
            />
            <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
              Address
            </label>
          </div>

          <div className="flex justify-end items-end gap-5 mt-10">
            <button className="secondary-blue-btn-border">Cancel</button>
            <button className="secondary-blue-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
