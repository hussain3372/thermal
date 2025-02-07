"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import DateCalendarValue from "./Calendar";

const OrderDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div>
      <div className="font-20 font-bold leading-6">Order Detail</div>

      <div className="flex justify-between items-center mt-7">
        <div className="font-16 font-medium leading-5">Charlie Chaplin</div>
        <div className="new-badge">New</div>
      </div>

      <div className="sm:flex justify-between items-center mt-3 border-b border-[#C5C5C5] pb-7 space-y-5 sm:space-y-0">
        <div className="font-22 font-normal leading-normal text-[#5F5F5F]">
          Order Id: 1326747
        </div>
        <div>
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-start py-3 px-8 w-[166px] border border-[#00000066] rounded-lg gap-[10px] font-14 font-normal leading-normal tracking-[0.25px]"
          >
            <Image src="/reshedule.svg" height={20} width={20} alt="logo" />
            Scheduling
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef} // Ref to track clicks outside
            className="relative p-4 w-full max-w-2xl max-h-full"
          >
            <div className="relative bg-white rounded-2xl shadow dark:bg-gray-700 p-8">
              <div className="flex items-end justify-end">
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
              <div className="flex flex-col justify-center items-center my-7 gap-3 border-b border-[#C5C5C5] pb-7">
                <h1 className="font-28 font-normal leading-normal">
                Scheduling Request
                </h1>
                <h2 className="font-22 font-normal leading-normal text-[#5F5F5F]">
                  Booking ID: 1326747
                </h2>
              </div>

              <div>
                <DateCalendarValue
                  setIsModalOpen={setIsModalOpen}
                  setIsSuccessModalOpen={setIsSuccessModalOpen}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-8 w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-2xl p-6">
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={handleCloseSuccessModal}
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

              <div className="mt-5 border-b border-[#C5C5C5] pb-7">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <Image
                    src="/success-icon.png"
                    width={120}
                    height={120}
                    alt="success-icon"
                  />
                  <h1 className="font-28 font-normal leading-normal">
                    Booking Confirmed !!
                  </h1>
                  <h2 className="font-22 font-normal leading-normal text-[#5F5F5F]">
                    Booking ID: 1326747
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-7">
                <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
                  <Image
                    src="/calendar.svg"
                    width={24}
                    height={24}
                    alt="calendar"
                  />
                  <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
                    19 Jan 2023
                  </h1>
                </div>
                <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
                  <Image
                    src="/clock.svg"
                    width={24}
                    height={24}
                    alt="calendar"
                  />
                  <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
                    9:00 PM - 10:00PM
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-7">
        <div className="flex justify-between items-center">
          <div className="font-20 font-bold leading-6">Heater Repairing</div>
          <div>
            <Image src="/mes-icon.svg" height={40} width={40} alt="logo" />
          </div>
        </div>

        <div>
          <h1 className="text-[#1559A8] font-28 leading-8 font-semibold">$129</h1>
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

      <div className="my-5 flex items-center flex-wrap justify-start gap-5 ">
        <Image src="/prev1.png" width={180} height={180} alt="preview-img" />
        <Image src="/prev2.png" width={180} height={180} alt="preview-img" />
        <Image src="/prev3.png" width={180} height={180} alt="preview-img" />
        <Image src="/prev4.png" width={180} height={180} alt="preview-img" />
      </div>

      <div className="sm:flex justify-end items-end gap-6">
        <button className="primary-red-btn">
          <Image src="/reject.svg" width={24} height={24} alt="reject" />
          Reject
        </button>
        <button className="secondary-blue-btn">
          <Image src="/accept.svg" width={24} height={24} alt="accept" />
          Accept
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
