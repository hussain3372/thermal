import React from "react";

const PersonalInformation = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-14">
        <div>
          <h1 className="font-32 font-normal leading-10 text-center">
            Contractor Information
          </h1>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          <div>
            <h1 className="font-32 font-bold leading-10 text-center">
              Welcome to the Contractor <br /> Personal Information
            </h1>
          </div>
          <p className="font-16 font-normal leading-5 text-center text-[#00000099]">
            Please provide your basic contractor information to get started.
            This information will help us <br /> verify your qualifications and
            match you with appropriate jobs.
          </p>

          <div className="mt-10">
            <div class="relative float-label-input mb-8">
              <input
                type="text"
                placeholder="Enter Your Complete Address"
                class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Address
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div class="relative float-label-input">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  First Name
                </label>
              </div>
              <div class="relative float-label-input">
                <input
                  type="text"
                  placeholder="Email Address"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Last Name
                </label>
              </div>
              <div class="relative float-label-input">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Email Address
                </label>
              </div>
              <div class="relative float-label-input">
                <input
                  type="email"
                  placeholder="Enter Your Phone Number"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Phone Number
                </label>
              </div>

              <div class="relative float-label-input">
                <select
                  id="countries"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                >
                  <option selected>Select Your Province</option>
                  <option value="US">Punjab</option>
                  <option value="CA">Sindh</option>
                  <option value="FR">Sindh</option>
                  <option value="DE">Sindh</option>
                </select>
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Your Province
                </label>
              </div>

              <div class="relative float-label-input">
                <select
                  id="countries"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                >
                  <option selected>Select Your City</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  City
                </label>
              </div>

              <div class="relative float-label-input">
                <select
                  id="countries"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                >
                  <option selected>Select Your Postal Code</option>
                  <option value="US">0215465</option>
                  <option value="CA">63264865</option>
                  <option value="FR">0212545</option>
                  <option value="DE">5418765</option>
                </select>
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Postal Code
                </label>
              </div>

              <div class="relative float-label-input">
                <input
                  type="text"
                  placeholder="Enter Your Years in Business"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Years in Business
                </label>
              </div>

              <div class="relative float-label-input">
                <input
                  type="text"
                  placeholder="Enter Number of Employees"
                  class="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                />
                <label class="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                  Number of Employees
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
