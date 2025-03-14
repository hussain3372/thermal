"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import DateCalendarValue from "./Calendar";
import { useParams } from "next/navigation";
import { getOrdersDetail } from "@/api/handleStatus/getOrderDetail";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, Modal, Typography, Pagination } from "@mui/material";
import { reschedule } from "@/api/handleStatus/reschedule";
import { toast } from "react-toastify";
import { deliverable } from "@/api/handleStatus/deliverable";
import { acceptOrder } from "@/api/handleStatus/acceptOrder";
import { rejectOrder } from "@/api/handleStatus/rejectOrder";

const OrderDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false); // Modal state
  const [description, setDescription] = useState(""); // Track description input
  const [uploadedImages, setUploadedImages] = useState([]); // Track images in the modal
  const [status, setStatus] = useState("Ongoing"); // Track status (Ongoing or Pending)

  const [submittedData, setSubmittedData] = useState({
    description: "",
    images: [],
  }); // Store submitted data
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };
  const handleSubmit = async () => {
    if (!isSubmitEnabled) return;

    try {
      // Prepare data for API with contractor_id added
      const formData = {
        description,
        contractor_order_id: details.order_ID, // Adjust based on where contractor_id is stored
        images: uploadedImages, // Assuming these contain valid image URLs
      };

      console.log("payload", formData);

      // Call the API
      const response = await deliverable(formData);

      if (response.success) {
        console.log("Successfully submitted:", response.message);
        setSubmittedData({ description, images: uploadedImages });
        setStatus("Pending for Review");

        // Clear inputs
        setDescription("");
        setUploadedImages([]);

        // Close modal
        handleCloseModal();
        alert("Data submitted successfully!");
      } else {
        console.error("Submission failed:", response.message);
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data.");
    }
  };

  // Determine if submit button should be active
  const isSubmitEnabled =
    description.trim() !== "" && uploadedImages.length > 0;

  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const { detail } = useParams();
  const modalRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    // Close the modal only if the click is outside of the modal and calendar content
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      calendarRef.current &&
      !calendarRef.current.contains(event.target)
    ) {
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

  // Fetch the details for the order
  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true); // Ensure loading is true when fetching
      const data = await getOrdersDetail(detail); // Make the API request
      console.log("Order Detail:", data); // Debugging: log the fetched data
      if (data) {
        setDetails(data.data); // Set the details once fetched
      } else {
        setError("No details found for this order.");
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
      setError("An error occurred while fetching the order details.");
    } finally {
      setLoading(false); // Stop loading after the fetch
    }
  }, [detail]); // Add detail as dependency

  useEffect(() => {
    // Only fetch if detail is available
    if (detail) {
      fetchDetail();
    }
  }, [detail, fetchDetail]); // Add fetchDetail to dependency array

  if (loading) {
    return <Loading />; // Show loading screen while data is being fetched
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error if something went wrong
  }

  // Open modal and set product to delete
  const handleOpen = () => {
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTimeSlot = () => {
    handleClose(false); // Close main modal
    setIsSuccessModalOpen(true); // Open success modal
  };

  const handleSchedule = async () => {
    try {
      // Call the reschedule API with the necessary data
      const deadline = value.format("YYYY-MM-DD HH:mm"); // Format the date
      const response = await reschedule(details.order_ID, {
        price,
        comment,
        deadline,
      });
      toast.success("Scheduling request sent to Admin");
      // After successful request, handle what needs to happen (close modal, show success, etc.)
      handleClose(); // Close the modal

      setTimeout(() => {
        fetchDetail();
      }, 2000);
    } catch (error) {
      console.error("Error adding time slot:", error);
      // You can show an error message to the user if necessary
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 10,
    p: 4,
  };

  // Function to return the user-friendly status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "offer":
        return "Offer"; // More user-friendly status label
      case "scheduled-job":
        return "Scheduled Job"; // User-friendly label for scheduled jobs
      case "in-progress":
        return "In Progress"; // User-friendly label for in-progress status
      case "accept":
        return "Accepted"; // User-friendly label for accepted orders
      case "cancelled":
        return "Cancelled"; // User-friendly label for cancelled orders
      case "installation-completed":
        return "Installation Completed"; // User-friendly label for completed installations
      case "payment-in-progress":
        return "Payment In Progress"; // User-friendly label for payment status
      case "rejected":
        return "Rejected"; // User-friendly label for rejected orders
      case "previous-orders":
        return "Previous Orders"; // User-friendly label for previous orders
      case "completed":
        return "Completed"; // User-friendly label for previous orders
      case "reject":
        return "Reject"; // User-friendly label for rejected orders
      default:
        return "Unknown"; // Default label for unknown statuses
    }
  };

  // Function to return the class for the status for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "offer":
        return "new-badge"; // Yellow badge for Pending
      case "ongoing-job":
        return "scheduled-badge"; // Badge for Scheduled Jobs
      case "in-progress":
        return "pending-badge"; // Blue badge for 'In Progress'
      case "accept":
        return "accepted-badge"; // Green badge for Accepted
      case "cancelled":
        return "cancelled-badge"; // Red badge for Cancelled
      case "installation-completed":
        return "ongoing-badge"; // Orange badge for 'Installation Completed'
      case "payment-in-progress":
        return "completed-badge"; // Purple badge for 'Payment In Progress'
      case "rejected":
        return "cancelled-badge"; // Red badge for Rejected
      case "Previous Orders":
        return "completed-badge"; // Green badge for Previous Orders
      case "completed":
        return "completed-badge";
      case "reject":
        return "cancelled-badge"; // Red badge for Reject
      default:
        return "bg-[#668DFF] text-white"; // Default gray badge for unknown statuses
    }
  };

  return (
    <div>
      <div className="font-20 font-bold leading-6">Order Detail</div>

      <div className="flex justify-between items-center mt-7">
        <div className="font-16 font-medium leading-5">
          {details.name || "Not specified"}
        </div>
        <div className="flex md:justify-end items-end">
          <h1 className={`new-badge ${getStatusClass(details.status)}`}>
            {getStatusLabel(details.status)}{" "}
            {/* Use user-friendly status label */}
          </h1>
        </div>
      </div>

      <div className="sm:flex justify-between items-center mt-3 border-b border-[#C5C5C5] pb-7 space-y-5 sm:space-y-0">
        <div className="font-22 font-normal leading-normal text-[#5F5F5F]">
          Order Id: {details.order_ID || "Not specified"}
        </div>
        <div>
          {["offer", "scheduled-job"].includes(details?.status) && (
            <button
              onClick={handleOpen}
              className="flex items-center justify-start py-3 px-8 w-[166px] border border-[#00000066] rounded-lg gap-[10px] font-14 font-normal leading-normal tracking-[0.25px]"
            >
              <Image src="/reshedule.svg" height={20} width={20} alt="logo" />
              Scheduling
            </button>
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-end justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={handleClose}
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
          <div className="flex flex-col justify-center items-center my-7 gap-3 pb-7">
            <h1 className="font-28 font-normal leading-normal">
              Scheduling Request
            </h1>
            <h2 className="font-22 font-normal leading-normal text-[#5F5F5F]">
              Booking ID: {details.order_ID || "Not specified"}
            </h2>
          </div>

          <div className="flex flex-col gap-7 w-full">
            <input
              type="number"
              className="bg-[#F5F9FF] border border-[#1559A8] rounded-md outline-none py-3 px-5 placeholder:text-[#BDC0CC] font-14 font-normal leading-5"
              placeholder="Enter Your New Price for this Job"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              className="bg-[#F5F9FF] border border-[#1559A8] rounded-md outline-none py-3 px-5 placeholder:text-[#BDC0CC] font-14 font-normal leading-5"
              placeholder="Any Comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div ref={calendarRef}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  {/* <DateTimePicker
                    label="From Date"
                    defaultValue={dayjs("2022-04-17T15:30")}
                  /> */}
                  <DateTimePicker
                    label="Date and Time"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex justify-end items-end mt-7">
            <button onClick={handleSchedule} className="secondary-blue-btn">
              +Add time slot
            </button>
          </div>
        </Box>
      </Modal>

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
          <div className="font-20 font-bold leading-6">
            {details.service_name || "Not specified"}
          </div>
          <div>
            <Image src="/mes-icon.svg" height={40} width={40} alt="logo" />
          </div>
        </div>

        <div>
          <h1 className="text-[#1559A8] font-28 leading-8 font-semibold">
            {details.price || "Not specified"}
          </h1>
        </div>

        <div>
          <div className="flex gap-2">
            <Image
              src="/blue-location.svg"
              width={20}
              height={20}
              alt="location"
            />
            <span className="font-14 font-normal leading-normal">Location</span>
          </div>
        </div>

        <div>
          <p className="font-16 font-normal leading-5 opacity-60">
            {details.description || "Not specified"}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-7">
        <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
          <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
          <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
            {details.deadline_hour || "Not specified"}
          </h1>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg py-5 px-4 gap-4 border border-[#C5C5C5] flex flex-col justify-center items-center">
          <Image src="/clock.svg" width={24} height={24} alt="calendar" />
          <h1 className="font-14 font-normal leading-normal text-[#3F3F3F]">
            {details.deadline_time || "Not specified"}
          </h1>
        </div>
      </div>
      <div className="sm:flex justify-end items-end gap-6">
        {["in-progress"].includes(details?.status) && (
          <>
            <div
              className="sm:flex justify-end items-end gap-6 mt-7"
              onClick={handleOpenModal}
            >
              <button className="secondary-blue-btn">
                <Image
                  src="/deleverable.svg"
                  width={20}
                  height={20}
                  alt="accept"
                />
                Deliverable
              </button>
            </div>
          </>
        )}
      </div>

      {/* <div className="my-5 flex items-center flex-wrap justify-start gap-5">
        {!["offer", "scheduled-job"].includes(details?.status) && (
          <Image
            src={details.images}
            width={180}
            height={180}
            alt="preview-img"
          />
        )}
      </div> */}

      <div className="sm:flex justify-end items-end gap-6 mt-6">
        {["offer"].includes(details?.status) && (
          <>
            <button
              className="primary-red-btn"
              onClick={() => {
                // Handle Reject action here
                rejectOrder(details.order_ID); // Call reject order function
                toast.error("Order Rejected"); // Show toast notification
                fetchDetail();
              }}
            >
              <Image src="/reject.svg" width={24} height={24} alt="reject" />
              Reject
            </button>

            <button
              className="secondary-blue-btn"
              onClick={() => {
                // Handle Accept action here
                const response = acceptOrder(details.order_ID); // Call accept order function
                console.log("response", response);
                toast.success("Order Accepted"); // Show toast notification
                fetchDetail();
              }}
            >
              <Image src="/accept.svg" width={24} height={24} alt="accept" />
              Accept
            </button>
          </>
        )}
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
            <div className="relative bg-white rounded-2xl shadow p-8">
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

export default OrderDetail;
