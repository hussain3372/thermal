import React, { useState } from "react";
import { saveOnboardingData } from "@/api/onboarding/onboardingApi";

const PersonalInformation = ({ setSelectedTab }) => {
  const [formData, setFormData] = useState({
    "address": "",
    "first_name": "",
    "last_name": "",
    "email_address": "",
    "phone_number": "",
    "province": "",
    "city": "",
    "postal_code": "",
    "years_in_business": "",
    "number_of_employees": "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    setLoading(true);
    setError("");
    try {
      await saveOnboardingData("Personal_Information", formData);
      setSelectedTab(1); // Move to next tab (Licenses and Qualifications)
      console.log("Data saved successfully:", formData);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-14">
        <h1 className="font-32 font-normal leading-10 text-center">
          Contractor Information
        </h1>

        <div className="flex flex-col gap-8 mt-8">
          <h1 className="font-32 font-bold leading-10 text-center">
            Welcome to the Contractor <br /> Personal Information
          </h1>
          <p className="font-16 font-normal leading-5 text-center text-[#00000099]">
            Please provide your basic contractor information to get started.
            This information will help us <br /> verify your qualifications and
            match you with appropriate jobs.
          </p>

          <div className="mt-10">
            <div className="relative float-label-input mb-8">
              <input
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Enter Your Complete Address"
                className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
              />
              <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                Address
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { label: "First Name", name: "first_name", type: "text" },
                { label: "Last Name", name: "last_name", type: "text" },
                { label: "Email Address", name: "email_address", type: "email" },
                { label: "Phone Number", name: "phone_number", type: "text" },
                { label: "Years in Business", name: "years_in_business", type: "text" },
                { label: "Number of Employees", name: "number_of_employees", type: "text" },
              ].map((field) => (
                <div key={field.name} className="relative float-label-input">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal placeholder-black"
                  />
                  <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                    {field.label}
                  </label>
                </div>
              ))}

              {[
                { label: "Your Province", name: "province", options: ["Punjab", "Sindh", "Balochistan", "KPK"] },
                { label: "City", name: "city", options: ["Lahore", "Karachi", "Islamabad", "Peshawar"] },
                { label: "Postal Code", name: "postal_code", options: ["54000", "74200", "44000", "25000"] },
              ].map((dropdown) => (
                <div key={dropdown.name} className="relative float-label-input">
                  <select
                    name={dropdown.name}
                    value={formData[dropdown.name]}
                    onChange={handleChange}
                    className="block m-auto w-full text-black font-16 font-medium bg-transparent focus:outline-none focus:shadow-outline border border-[#000] rounded-lg py-3 px-3 leading-normal"
                  >
                    <option value="">{`Select ${dropdown.label}`}</option>
                    {dropdown.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label className="absolute bg-[#fff] -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
                    {dropdown.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      {/* Next Button */}
      <div className="float-end gap-5 mt-16 py-3">
        <button
          className="secondary-blue-btn"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
