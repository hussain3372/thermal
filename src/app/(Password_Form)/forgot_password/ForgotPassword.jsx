"use client";

import Image from "next/image";
import React, { useState } from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { forgot } from "../../../api/auth/forgotPassword"; // Ensure this function handles the forgot password API
import Link from "next/link";

const ForgotPassword = () => {  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Prepare the data for the forgot password request (only email needed)
      const forgotData = {
        email: form.email,
      };

      // Call the forgot password API
      const response = await forgot(forgotData);

      if (response.success) {
        toast.success("OTP sent successfully! Please check your email.");

        localStorage.setItem("email", form.email);
        
          router.push("/password_reset_otp");
      } else {
        toast.error(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="">
        <div className="grid md:grid-cols-2 items-center gap-[136px]">
          <div>
            <Image
              src="/login.png" // Replace with an appropriate image for forgot password
              className="h-screen w-full p-10 md:p-0"
              width={1046}
              height={1124}
              alt="Forgot Password Image"
            />
          </div>

          <div className="flex flex-col justify-center items-center pr-[136px]">
            <h1 className="font-48 bold-font leading-[60px] text-center">
              Forgot Your Password?
            </h1>
            <p className="text-center">Enter your email address to receive an OTP for reset your password.</p>
            <form
              className="mt-16 flex flex-col gap-8 w-full"
              onSubmit={handleForgotPassword}
            >
              <div className="relative float-label-input">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Email Address
                </label>
              </div>

              <div className="m-auto sm:m-1">
                <button
                  type="submit"
                  className="secondary-blue-btn-big w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </form>

            <div className="font-16 text-center mt-8">
              <p>Remembered your password?</p>
              <Link href="/login" className="text-[#046ED2]">
                Login
              </Link>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
