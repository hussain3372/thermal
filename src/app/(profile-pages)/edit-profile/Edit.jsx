"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getProfile } from "../../../api/profile/getProfileDetails";
import { updateProfile } from "../../../api/profile/updateProfileDetails";

const Edit = () => {

  const router = useRouter(); // Initialize router
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    Province: "",
    NumberOfEmployees: "",
    phone_number: ""
  });
  const [profileImage, setProfileImage] = useState("/pr3.svg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data.success) {
          setProfile(data.data);
   

        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(profile);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5 relative">
        <div className="rounded-full border-5 border-white shadow-2xl pt-2 w-[160px] h-[160px]">
          <Image src={profileImage} width={160} height={160} alt="profile" className="rounded-full" />
        </div>
        <div className="absolute left-[100px] top-[115px] cursor-pointer" onClick={() => document.getElementById("imageUpload").click()}>
          <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
        </div>
        <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 gap-8">
        <InputField label="First Name" name="first_name" value={profile.first_name} onChange={handleInputChange} />
        <InputField label="Last Name" name="last_name" value={profile.last_name} onChange={handleInputChange} />
        <InputField label="Email Address" name="email" value={profile.email} onChange={handleInputChange} />
        <InputField label="Your Province" name="Province" value={profile.Province} onChange={handleInputChange} />
        <InputField label="City" name="city" value={profile.city} onChange={handleInputChange} />
        <InputField label="Postal Code" name="postcode" value={profile.postcode} onChange={handleInputChange} />
        <InputField label="Phone Number" name="phone_number" value={profile.phone_number} onChange={handleInputChange} />
        <InputField label="Number of Employees" name="NumberOfEmployees" value={profile.NumberOfEmployees} onChange={handleInputChange} />
        <InputField label="Address" name="address" value={profile.address} onChange={handleInputChange} fullWidth />
      </div>
      <div className="flex justify-end gap-5 mt-10">
        {/* <button className="secondary-blue-btn-border">Cancel</button> */}
        <button className="secondary-blue-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>  
  );
};

const InputField = ({ label, name, value, onChange, fullWidth }) => (
  <div className={`relative float-label-input ${fullWidth ? "col-span-2" : ""}`}>
    <input type="text" name={name} value={value} onChange={onChange} className="block w-full text-black font-16 font-semibold bg-transparent border border-[#000] rounded-lg py-3 px-3 focus:outline-none" />
    <label className="absolute bg-[#fff] -top-3 left-3 text-[#00000066] font-14 font-normal px-3">{label}</label>
  </div>
);

export default Edit;
