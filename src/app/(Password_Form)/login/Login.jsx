"use client";

import Image from "next/image";
import React, { useState } from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { login } from "../../../api/auth/login";
import { googlelogin } from "@/api/auth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Call your Google login API
      const response = await googlelogin();

      console.log("response", response)

      if (response.success) {
        toast.success("Google login successful!");
        localStorage.setItem("auth_token", response.data.token);
        router.push("/"); // Redirect to dashboard
      } else {
        toast.error(
          response.message || "Google login failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error?.message ||
          "An error occurred during Google login. Please try again."
      );
      console.error("Google Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleloginSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const loginData = {
        email: form.email,
        password: form.password,
      };

      // Call the login API
      const response = await login(loginData);

      console.log(response);

      if (response.success) {
        toast.success("Login successful!");

        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("firstname", response.data.user.first_name);
        localStorage.setItem("lastname", response.data.user.last_name);
        console.log("firstname");
        document.cookie = `auth_token=${response.data.token}; path=/; max-age=3600;`;

        router.push("/");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error?.message || "An error occurred during login. Please try again."
      );
      console.error("Login error:", error);
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
              src="/login.png"
              className="h-screen w-full p-10 md:p-0"
              width={1046}
              height={1124}
              alt="login-img"
            />
          </div>

          <div className="flex flex-col justify-center items-center pr-[136px]">
            <h1 className="font-48 bold-font leading-[60px]"> Login </h1>
            <form
              className="mt-16 flex flex-col gap-8 w-full"
              onSubmit={handleloginSubmit}
            >
              <div className="relative float-label-input">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email} // Bind to state
                  onChange={handleInputChange} // Handle input change
                  placeholder="Enter Email"
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg
                     py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Email
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type={showPassword ? "text" : "password"} // Conditionally set the input type
                  placeholder="Enter Password"
                  required
                  minLength={8}
                  name="password"
                  value={form.password} // Bind to state
                  onChange={handleInputChange} // Handle input change
                  className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-4 px-5 leading-normal"
                />
                <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Password
                </label>

                {/* Eye icon to toggle password visibility */}
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-4 cursor-pointer text-[#00000066]"
                >
                  {showPassword ? (
                    <Image
                      src="/show-icon.svg" // Path to your icon
                      width={20}
                      height={20}
                      alt="Show password"
                      className="w-6 h-6"
                    />
                  ) : (
                    <Image
                      src="/hide-icon.svg" // Path to your icon
                      width={20}
                      height={20}
                      alt="Hide password"
                      className="w-6 h-6"
                    />
                  )}
                </span>
              </div>

              <div className="sm:flex justify-between items-center gap-28 lg:gap-40">
                <div className="flex items-center justify-center gap-3">
                  <input type="checkbox" />
                  <h1 className="font-16 font-normal leading-5">Remember me</h1>
                </div>
                <div className="text-[#046ED2] font-16 font-normal flex justify-center items-center mt-5 sm:mt-0">
                  <Link href="/forgot_password">Forgot password?</Link>
                </div>
              </div>

              <div className="m-auto sm:m-1">
                <button
                  type="submit"
                  className="secondary-blue-btn-big w-full"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-8 mt-8 w-full">
              <div className="font-16 leading-5 text-[#00000099] text-center regular-class">
                Or continue with
              </div>

              <div className="flex justify-center items-center gap-2 sm:gap-4">
                <div className="cursor-pointer" onClick={handleGoogleLogin}>
                  <Image
                    src="/google.png"
                    width={100}
                    height={52}
                    alt="google"
                  />
                </div>
                {/* <Image src="/apple.png" width={100} height={52} alt="apple" /> */}
                <Image
                  src="/facebook.png"
                  width={100}
                  height={52}
                  alt="facebook"
                />
              </div>

              <div className="font-20 font-normal leading-6 text-center">
                Do not have an account?
                <Link href="/signup" className="text-[#046ED2]">
                  {" "}
                  Signup
                </Link>
              </div>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
