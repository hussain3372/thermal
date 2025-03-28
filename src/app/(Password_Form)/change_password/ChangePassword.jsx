"use client";

import Image from "next/image";
import React, { useState } from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { updatePassword } from "../../../api/auth/changePassword"; // Correct API import
import useLocalStorage from "@/app/useLocalStorage.js";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // Loader state
  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const togglePasswordVisibility = (field) => {
    if (field === "new") setShowNewPassword((prev) => !prev);
    if (field === "confirm") setShowConfirmPassword((prev) => !prev);
  };

  const [email, setEmail] = useLocalStorage("email");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is not set. Please log in again.");
      return;
    }

    if (form.password !== form.password_confirmation) {
      setError("New passwords do not match.");
      toast.error("New passwords do not match!");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true); // Start loader

    try {
      const requestData = {
        email, // Include email
        password: form.password,
        password_confirmation: form.password_confirmation,
      };

      console.log("Submitting request data:", requestData);

      const response = await updatePassword(requestData, email);

      if (response.success) {
        toast.success("Password changed successfully!");
        router.push("/login");
      } else {
        const errorMsg = response.message || "Failed to change password";
        const fieldErrors = response.errors
          ? Object.entries(response.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ")
          : "";
        toast.error(`${errorMsg}. ${fieldErrors}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Change Password error:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 items-center gap-[136px]">
        <div className="hidden xl:block">
          <Image
            src="/login.png" // Updated image for Change Password
            className="h-screen w-full p-10 md:p-0"
            width={1046}
            height={1124}
            alt="Change Password Image"
          />
        </div>

        <div className="flex flex-col justify-center items-center px-5 md:px-20">
          <h1 className="font-48 bold-font leading-[60px] text-center">
            Change Password
          </h1>

          <form
            className="mt-16 flex flex-col gap-8 w-full"
            onSubmit={handleSubmit}
          >
            {/* New Password */}
            <div className="relative float-label-input">
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter New Password"
                className="block w-full text-black font-16 font-medium bg-transparent focus:outline-none border border-[#000] rounded-lg py-4 px-5"
              />
              <label className="absolute bg-white -top-3 left-3 text-[#00000066] font-14 px-3">
                New Password
              </label>
              <span
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-4 cursor-pointer text-[#00000066]"
              >
                <Image
                  src={showNewPassword ? "/show-icon.svg" : "/hide-icon.svg"}
                  width={20}
                  height={20}
                  alt="Toggle visibility"
                  className="w-6 h-6"
                />
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative float-label-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                required
                minLength={8}
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="block w-full text-black font-16 font-medium bg-transparent focus:outline-none border border-[#000] rounded-lg py-4 px-5"
              />
              <label className="absolute bg-white -top-3 left-3 text-[#00000066] font-14 px-3">
                Confirm Password
              </label>
              <span
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-4 cursor-pointer text-[#00000066]"
              >
                <Image
                  src={
                    showConfirmPassword ? "/show-icon.svg" : "/hide-icon.svg"
                  }
                  width={20}
                  height={20}
                  alt="Toggle visibility"
                  className="w-6 h-6"
                />
              </span>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`secondary-blue-btn-big w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
