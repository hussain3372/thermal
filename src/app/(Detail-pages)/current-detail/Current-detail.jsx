"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const CurrentDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [description, setDescription] = useState(""); // Track description input
  const [uploadedImages, setUploadedImages] = useState([]); // Track images in the modal
  const [submittedData, setSubmittedData] = useState({
    description: "",
    images: [],
  }); // Store submitted data
  const modalRef = useRef(null);
  const [status, setStatus] = useState("Ongoing"); // Track status (Ongoing or Pending)

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Submit form
  const handleSubmit = () => {
    // Store the description and uploaded images in the state
    setSubmittedData({ description, images: uploadedImages });
    setStatus("Pending for Reveiew");
    // Clear the modal inputs
    setDescription("");
    setUploadedImages([]);
    // Close the modal
    handleCloseModal();
  };

  // Handle clicking outside the modal to close it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Determine if submit button should be active
  const isSubmitEnabled =
    description.trim() !== "" && uploadedImages.length > 0;

  return (
    <div>
      <div className="font-20 font-bold leading-6">Order Detail</div>

      <div className="flex justify-between items-center mt-7">
        <div className="font-16 font-bold leading-5">Charlie Chaplin</div>
        <div
          className={status === "Ongoing" ? "ongoing-badge" : "pending-badge"}
        >
          {status}
        </div>
      </div>

      <div className="sm:flex justify-between items-center mt-3 border-b border-[#C5C5C5] pb-7 space-y-5 sm:space-y-0">
        <div className="font-22 font-normal leading-normal text-[#5F5F5F]">
          Booking ID: 1326747
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-7">
        <div className="flex justify-between items-center">
          <div className="font-20 font-bold leading-6">Heater Repairing</div>
          <div>
            <Image src="/mes-icon.svg" height={40} width={40} alt="logo" />
          </div>
        </div>

        <div>
          <div className="flex gap-2">
            <Image
              src="/blue-location.svg"
              width={20}
              height={20}
              alt="location"
            />
            <span className="font-14 font-normal leading-normal">
              Location
            </span>
          </div>
        </div>

        <div>
          <p className="font-16 font-normal leading-5 opacity-60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud <br className="hidden md:block" />{" "}
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-7">
        <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
          <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
          <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
            19 Jan 2023
          </h1>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
          <Image src="/clock.svg" width={24} height={24} alt="calendar" />
          <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
            9:00 PM - 10:00PM
          </h1>
        </div>
      </div>

      <div
        className="sm:flex justify-end items-end gap-6 mt-7"
        onClick={handleOpenModal}
      >
        <button className="secondary-blue-btn">
          <Image src="/deleverable.svg" width={20} height={20} alt="accept" />
          Deliverable
        </button>
      </div>

      {/* Submitted description and images */}
      {submittedData.description && (
        <div className="mt-7">
          <div className="font-20 font-bold leading-6">Your Delivery</div>
          <p className="font-16 font-normal leading-5 opacity-60 mt-4">
            {submittedData.description}
          </p>

          <div className="flex gap-4 mt-5 flex-wrap">
            {submittedData.images.map((imgSrc, index) => (
              <Image
                key={index}
                src={imgSrc}
                width={100}
                height={100}
                alt={`submitted-img-${index}`}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef} // Ref to track clicks outside
            className="relative p-4 w-full max-w-2xl max-h-full"
          >
            <div className="relative bg-white rounded-2xl shadow dark:bg-gray-700 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-20 font-normal leading-normal">
                    Add Your Work
                  </h1>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div>
                <div className="flex flex-col gap-7 mt-7">
                  <div className="relative float-label-input">
                    <textarea
                      placeholder="Add Description About Work you have done"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full text-black flex justify-start items-start font-16 font-semibold h-[121px] bg-transparent focus:outline-none focus:shadow-outline border border-[#00000033] rounded-lg py-4 px-5 leading-normal"
                    ></textarea>
                    <label className="absolute bg-[#F4F5F7] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                      Description
                    </label>
                  </div>

                  <div
                    className="border border-[#00000033] rounded-lg flex flex-col justify-center items-center py-9 gap-3 cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <div className="font-20 font-normal leading-6">
                      <Image
                        src="/upload-img.svg"
                        width={60}
                        height={60}
                        alt="upload-img"
                      />
                      Upload
                    </div>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {/* Uploaded Images */}
                  <div className="flex gap-4 mt-5 flex-wrap">
                    {uploadedImages.map((imgSrc, index) => (
                      <Image
                        key={index}
                        src={imgSrc}
                        width={100}
                        height={100}
                        alt={`uploaded-img-${index}`}
                        className="rounded-lg"
                      />
                    ))}
                  </div>

                  <div className="flex justify-end items-center gap-6">
                    <button
                      className="primary-red-btn"
                      onClick={handleCloseModal}
                    >
                      <Image
                        src="/reject.svg"
                        width={20}
                        height={20}
                        alt="cancel"
                      />
                      Cancel
                    </button>

                    {/* Submit button with conditional styling and functionality */}
                    <button
                      onClick={handleSubmit}
                      className={`secondary-blue-btn ${
                        isSubmitEnabled ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!isSubmitEnabled}
                    >
                      <Image
                        src="/deleverable.svg"
                        width={20}
                        height={20}
                        alt="submit"
                      />
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentDetail;
