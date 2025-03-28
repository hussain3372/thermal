"use client";

import Image from "next/image";
import React, { useState } from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "../../../api/auth/signup";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // Loader state
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    rememberMe: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match!");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true); // Start loader

    try {
      // Prepare the data for the API call
      const userData = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      };

      // Call the API
      const response = await signUp(userData);


      // Handle successful response
      toast.success("Sign-up successful!");

      localStorage.setItem("email", form.email);

      console.log("email", localStorage)
      
      router.push("/mail_verification");
    } catch (error) {
      // Handle error response
      toast.error(
        error?.message
      );
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <div className="">
        <div className="grid md:grid-cols-2 items-center gap-[136px]">
          <div className="hidden xl:block">
            <Image
              src="/signup.png"
              className="h-full w-full p-10 md:p-0"
              width={720}
              height={1124}
              alt="login-img"
            />
          </div>

          <div className="flex flex-col justify-center items-center px-5 md:px-20">
            <h1 className="font-48 bold-font leading-[60px]"> Sign Up </h1>

            <form
              className="mt-16 flex flex-col gap-8 w-full"
              onSubmit={handleSubmit}
            >
              <div className="relative float-label-input">
                <input
                  type="text"
                  name="first_name"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  First Name
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type="text"
                  name="last_name"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Last Name
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Email
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  minLength={8}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Password
                </label>
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-4 cursor-pointer text-[#00000066]"
                >
                  {showPassword ? (
                    <Image
                      src="/show-icon.svg"
                      width={20}
                      height={20}
                      alt="Show password"
                      className="w-6 h-6"
                    />
                  ) : (
                    <Image
                      src="/hide-icon.svg"
                      width={20}
                      height={20}
                      alt="Hide password"
                      className="w-6 h-6"
                    />
                  )}
                </span>
              </div>

              <div className="relative float-label-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  required
                  minLength={8}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="Enter Confirm Password"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Confirm Password
                </label>
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-4 cursor-pointer text-[#00000066]"
                >
                  {showConfirmPassword ? (
                    <Image
                      src="/show-icon.svg"
                      width={20}
                      height={20}
                      alt="Show password"
                      className="w-6 h-6"
                    />
                  ) : (
                    <Image
                      src="/hide-icon.svg"
                      width={20}
                      height={20}
                      alt="Hide password"
                      className="w-6 h-6"
                    />
                  )}
                </span>
              </div>

              <div>
                <h1 className="text-red-500 font-14">{error}</h1>
              </div>

              <div className="m-auto sm:m-1">
                <button
                  type="submit"
                  className={`secondary-blue-btn-big w-full ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-8 mt-8 w-full">
              <div className="font-16 leading-5 text-[#00000099] text-center regular-class">
                Or continue with
              </div>

              <div className="flex justify-center items-center gap-2 sm:gap-4">
                <Image src="/google.png" width={100} height={52} alt="google" />
                {/* <Image src="/apple.png" width={100} height={52} alt="google" /> */}
                <Image
                  src="/facebook.png"
                  width={100}
                  height={52}
                  alt="google"
                />
              </div>

              <div className="font-20 font-normal leading-6 text-center">
                Already an account?
                <Link href="/login" className="text-[#046ED2]">
                  {" "}
                  SignIn
                </Link>
              </div>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
