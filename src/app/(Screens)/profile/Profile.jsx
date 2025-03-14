"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProfile } from "@/api/profile/getProfile";
import { getProfileSummary } from "@/api/profile/getProfileSummary";

// Custom loader that just returns the provided src
const customLoader = ({ src }) => src;

// Helper to check if the URL is external
const isExternal = (src) => src && (src.startsWith("http://") || src.startsWith("https://"));

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profileSummary, setProfileSummary] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfileSummary = async () => {
      try {
        const data = await getProfileSummary();
        setProfileSummary(data?.data);
      } catch (error) {
        console.error("Error fetching profile summary:", error);
      }
    };

    fetchProfileSummary();
  }, []);

  // Destructure objects from profileSummary if available
  const personalInfo = profileSummary?.PersonalInformation;
  const licenses = profileSummary?.Licenses_And_Qualifications;
  const experties = profileSummary?.Experties;
  const heatingAppliances = profileSummary?.Heating_Appliances;
  const contactPreference = profileSummary?.Heating_System_Capacity;


  return (
    <div>
      {/* Profile Information */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="font-20 font-normal leading-6 flex items-center gap-3">
            Your Profile
          </div>
        </div>

        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            {personalInfo?.image ? (
              <Image
                loader={isExternal(personalInfo.image) ? customLoader : undefined}
                unoptimized={isExternal(personalInfo.image)}
                src={personalInfo.image}
                width={160}
                height={160}
                alt="profile"
              />
            ) : (
              <Image src="/pr3.svg" width={160} height={160} alt="profile" />
            )}
            <Link href="/edit-profile">
              <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
            </Link>
          </div>

          <div className="sm:flex justify-between items-start pt-10">
            <div className="flex flex-col gap-3">
              <h1 className="font-32 font-bold">
                {personalInfo
                  ? profile?.name
                  : "N/A"}
              </h1>
              <h3 className="font-16 font-normal">
                {profile?.email || "N/A"}
              </h3>
              <h5 className="font-14 font-normal opacity-60">
                {personalInfo?.years_in_business
                  ? `In business since ${personalInfo.years_in_business}`
                  : "N/A"}
              </h5>
            </div>

            <div className="flex flex-col gap-3 mt-3 sm:mt-0 items-end">
              <h3 className="font-16 font-normal ">
                Postal Code: {personalInfo?.postal_code || profile?.postcode || "N/A"}
              </h3>
              <h5 className="font-16 font-normal opacity-60">
                {profile?.id || "N/A"}
              </h5>
            </div>
          </div>
        </div>

        {/* Licenses and Qualifications */}
        <div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* HVAC License */}
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">HVAC License</h1>
                <Link href="/edit-license">
                  <Image
                    src="/edit-btn.svg"
                    className="mt-3 md:mt-0"
                    width={24}
                    height={24}
                    alt="edit"
                  />
                </Link>
              </div>

              <div className="pt-5">
                <div className="lg:flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/license.svg"
                      width={64}
                      height={48}
                      alt="license"
                    />
                    <div className="mt-3 md:mt-0">
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Year: </span>
                        {licenses?.hvac_license_year || "N/A"}
                      </h1>
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Number: </span>
                        {licenses?.license_number || "N/A"}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <Link
                      href={licenses?.hvac_image ? licenses.hvac_image : "#"}
                      className="font-16 font-normal underline secondary-blue decoration-[#70A9F2]"
                      target="_blank"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Electrical License */}
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">Electrical License</h1>
                <Link href="/edit-license">
                  <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
                </Link>
              </div>

              <div className="pt-5">
                <div className="lg:flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/license.svg"
                      width={64}
                      height={48}
                      alt="license"
                    />
                    <div className="mt-3 md:mt-0">
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Year: </span>
                        {licenses?.electrical_license_year || "N/A"}
                      </h1>
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Number: </span>
                        {licenses?.electrical_license_number || "N/A"}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <Link
                      href={licenses?.electrical_image ? licenses.electrical_image : "#"}
                      className="font-16 font-normal underline secondary-blue decoration-[#70A9F2]"
                      target="_blank"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contractor Insurance */}
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">Contractor Insurance</h1>
                <Link href="/edit-insurance">
                  <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
                </Link>
              </div>

              <div className="pt-5">
                <Image
                  loader={isExternal(licenses?.electrical_image) ? customLoader : undefined}
                  unoptimized={isExternal(licenses?.electrical_image)}
                  src={licenses?.electrical_image || "/pdf-img.png"}
                  width={466}
                  height={78}
                  alt="training certificate"
                />
              </div>
            </div>

            {/* Training/Authorization */}
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">Training/Authorization</h1>
                <Link href="/edit-training">
                  <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
                </Link>
              </div>

              <div className="pt-5">
                <Image
                  loader={isExternal(licenses?.training_certificate) ? customLoader : undefined}
                  unoptimized={isExternal(licenses?.training_certificate)}
                  src={licenses?.training_certificate || "/pdf-img.png"}
                  width={466}
                  height={78}
                  alt="training certificate"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Areas of Expertise */}
        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Areas of Expertise</h1>
            <Link href="/edit-expertise">
              <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            {experties &&
              experties[
              "please_indicate_your_main_areas_of_specialty_and_any_relevant_training_or_brand_authorizations."
              ] ? (
              experties[
                "please_indicate_your_main_areas_of_specialty_and_any_relevant_training_or_brand_authorizations."
              ].map((item, index) => (
                <h1 key={index} className="blue-tag">
                  {item}
                </h1>
              ))
            ) : (
              <>
                <h1 className="blue-tag">N/A</h1>

              </>
            )}
          </div>
        </div>

        {/* Heat Pump Experience */}
        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Heat Pump Experience</h1>
            <Link href="/edit-heat-pump">
              <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            {heatingAppliances && heatingAppliances.types_of_heat_pumps_worked_with ? (
              heatingAppliances.types_of_heat_pumps_worked_with.map((item, index) => (
                <h1 key={index} className="blue-tag">
                  {item}
                </h1>
              ))
            ) : (
              <>
                <h1 className="blue-tag">N/A</h1>

              </>
            )}
          </div>
        </div>
        {/* Contact Preference */}
        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Heat Pump Experience</h1>
            <Link href="/edit-contact-preference">
              <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            {contactPreference?.preferred_contact_method ? (
              <h1 className="blue-tag">{contactPreference.preferred_contact_method}</h1>
            ) : (
              <h1 className="blue-tag">N/A</h1>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
