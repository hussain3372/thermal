import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="font-20 font-normal leading-6 flex items-center gap-3">
            Your Profile
          </div>
        </div>

        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <Image src="/pr3.svg" width={160} height={160} alt="profile" />
            <Link href="/edit-profile">
              <Image src="/edit-btn.svg" width={24} height={24} alt="edit" />
            </Link>
          </div>

          <div className="sm:flex justify-between items-start pt-10">
            <div className="flex flex-col gap-3">
              <h1 className="font-32 font-bold">William Andersen</h1>
              <h3 className="font-16 font-normal">
                williamandersen01@gmail.com
              </h3>
              <h5 className="font-14 font-normal opacity-60">
                4 years of Experience
              </h5>
            </div>

            <div className="flex flex-col gap-3 mt-3 sm:mt-0">
              <h3 className="font-16 font-normal">Postal Code: 765985</h3>
              <h5 className="font-16 font-normal opacity-60">
                38547u983503954
              </h5>
            </div>
          </div>
        </div>

        <div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">HVAC License </h1>
               <Link href="/edit-license">
               <Image
                  src="/edit-btn.svg"
                  className="mt-3 md:mt-0"
                  width={24}
                  height={24}
                  alt="edit"
                /></Link>
              </div>

              <div className="pt-5">
                <div className="lg:flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div>
                      <Image
                        src="/license.svg"
                        width={64}
                        height={48}
                        alt="license"
                      />
                    </div>
                    <div className="mt-3 md:mt-0">
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Year: </span>
                        2024
                      </h1>
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Number:</span>
                        765879890
                      </h1>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <Link
                      href="#"
                      className="font-16 font-normal underline secondary-blue decoration-[#70A9F2]"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">
                  Electrical License
                </h1>
                <Image
                  src="/edit-btn.svg"
                  className="mt-3 md:mt-0"
                  width={24}
                  height={24}
                  alt="edit"
                />
              </div>

              <div className="pt-5">
                <div className="lg:flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div>
                      <Image
                        src="/license.svg"
                        width={64}
                        height={48}
                        alt="license"
                      />
                    </div>
                    <div className="mt-3 md:mt-0">
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Year: </span>
                        2024
                      </h1>
                      <h1 className="font-16 font-normal">
                        <span className="opacity-60">License Number:</span>
                        765879890
                      </h1>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <Link
                      href="#"
                      className="font-16 font-normal underline secondary-blue decoration-[#70A9F2]"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">
                  Contractor Insurance
                </h1>
                <Image
                  src="/edit-btn.svg"
                  className="mt-3 md:mt-0"
                  width={24}
                  height={24}
                  alt="edit"
                />
              </div>

              <div className="pt-5">
                <Image
                  src="/pdf-img.png"
                  className="mt-3 md:mt-0"
                  width={466}
                  height={78}
                  alt="edit"
                />
              </div>
            </div>
            <div className="profile-section-bg">
              <div className="flex justify-between items-center">
                <h1 className="font-20 font-normal">
                  Training/ Authorization
                </h1>
                <Image
                  src="/edit-btn.svg"
                  className="mt-3 md:mt-0"
                  width={24}
                  height={24}
                  alt="edit"
                />
              </div>

              <div className="pt-5">
                <Image src="/pdf-img.png" width={466} height={78} alt="edit" />
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Areas of Experties</h1>
            <Image
              src="/edit-btn.svg"
              className="mt-3 md:mt-0"
              width={24}
              height={24}
              alt="edit"
            />
          </div>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <h1 className="blue-tag">Air Source heat pumps</h1>
            <h1 className="blue-tag">Water Heaters</h1>
            <h1 className="blue-tag">Geothermal</h1>
            <h1 className="blue-tag">Ventilation System</h1>
          </div>
        </div>

        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Heat Pump Experience</h1>
            <Image
              src="/edit-btn.svg"
              className="mt-3 md:mt-0"
              width={24}
              height={24}
              alt="edit"
            />
          </div>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <h1 className="blue-tag">Air Source heat pumps</h1>
            <h1 className="blue-tag">Ductless Mini-Split Heat Pumps</h1>
            <h1 className="blue-tag">Combined Systems</h1>
            <h1 className="blue-tag">Water Source Heat Pumps</h1>
          </div>
        </div>

        <div className="profile-section-bg">
          <div className="flex justify-between items-center">
            <h1 className="font-20 font-normal">Heat Pump Experience</h1>
            <Image
              src="/edit-btn.svg"
              className="mt-3 md:mt-0"
              width={24}
              height={24}
              alt="edit"
            />
          </div>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <h1 className="blue-tag">SMS</h1>
            <h1 className="blue-tag">Email</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
