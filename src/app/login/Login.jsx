import Image from "next/image";
import React from "react";
import "@/app/globals.css";
import "@/app/fonts.css";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <div className="2xl:container m-auto">
        <div className="grid md:grid-cols-2 items-center">
          <div>
            <Image
              src="/login.png"
              className="h-screen w-full p-10 md:p-0"
              width={1046}
              height={1124}
              alt="login-img"
            />
          </div>

          <div className="flex flex-col justify-center items-center mb-20">
            <h1 className="font-48 font-bold leading-[60px]"> Login </h1>
            <div className="mt-16 flex flex-col gap-8">
              <div class="relative float-label-input">
                <input
                  type="email"
                  placeholder="Enter Email"
                  class="block m-auto sm:w-[350px] lg:w-[414px] text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                />
                <label class="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Enter Email
                </label>
              </div>
              <div class="relative float-label-input">
                <input
                  type="password"
                  placeholder="Enter Password"
                  class="block m-auto sm:w-[350px] lg:w-[414px] text-black font-16 font-semibold bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                />
                 <label class="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Password
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-8 mt-8">
              <div className="sm:flex justify-between items-center gap-28 lg:gap-40">
                <div className="flex items-center justify-center gap-3">
                  <input type="checkbox" />
                  <h1 className="font-16 font-normal leading-5">
                    Remember me
                  </h1>
                </div>
                <div className="text-[#046ED2] font-16 font-normal flex justify-center items-center mt-5 sm:mt-0">
                  <h1>Forgot password?</h1>
                </div>
              </div>

              <div className="m-auto sm:m-1">
                <Link href="/" className="secondary-blue-btn font-20">
                  Login
                </Link>
              </div>

              <div className="font-16 leading-5 text-[#00000099] text-center font-normal">
                Or continue with
              </div>

              <div className="flex justify-center items-center gap-2 sm:gap-4">
                <Image src="/google.png" width={100} height={52} alt="google" />
                <Image src="/apple.png" width={100} height={52} alt="google" />
                <Image
                  src="/facebook.png"
                  width={100}
                  height={52}
                  alt="google"
                />
              </div>

              <div className="font-20 font-normal leading-6 text-center">
                Do not have an account?
                <Link href="/signup" className="text-[#046ED2]"> Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
