"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import { useRouter } from "next/navigation";
import { passwordReset } from "@/api/auth/passwordReset"; // Assuming passwordReset handles both OTP verification and reset
import useLocalStorage from "@/app/useLocalStorage";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter(); // Router hook

  const [email, setEmail] = useLocalStorage("email");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setErrorMessage("Please enter the full OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await passwordReset({ otp: otpValue, email });

      if (response.success) {
        console.log("OTP verified successfully");

        router.push("/change_password");

      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP resend
  // const handleResendOtp = async () => {
  //   setIsResending(true);
  //   try {
  //     const response = await resendOtp({ email }); // Assuming resendOtp is a function that sends a new OTP
  //     if (response.success) {
  //       toast.success("OTP has been resent. Please check your email.");
  //     } else {
  //       toast.error(response.message || "Failed to resend OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.log("resend error")
  //     toast.error("An error occurred while resending OTP. Please try again.");
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-10 h-screen">
        <div>
          <h1 className="font-24 font-bold leading-8 text-black text-center">
           Password Reset Verification
          </h1>
          <p className="font-12 font-normal leading-4 text-[#00000099] text-center">
            Enter the code we sent to your email address
          </p>
        </div>

        <form onSubmit={handleOtpSubmit}>
          <div className="flex flex-col justify-start items-start gap-3">
            <label htmlFor="otp" className="font-20 font-bold leading-6">
              Enter OTP
            </label>
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border-2 border-[#00000033] rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mt-2 text-red-500 text-center">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="w-full mt-10">
            <button
              type="submit"
              className="secondary-blue-btn-big w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </div>

          <div className="mt-10 text-center">
            <h1 className="font-12 font-normal leading-4 text-[#00000099]">
              Dont receive email code
            </h1>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              className="text-[#6786E1] font-16 font-normal leading-4 underline decoration-[#6786E1] underline-offset-2"
              // disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
