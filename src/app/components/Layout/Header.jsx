"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import Notification from "./Notification";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/api/auth/logout";
import { getProfile } from "@/api/profile/getProfile";

const Header = ({ toggleSidebar }) => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
      // NEW: Add notification count state
  const [notificationCount, setNotificationCount] = useState(0);

  const dropdownRef = useRef(null); // Ref to detect outside clicks for profile dropdown
  const notificationDropdownRef = useRef(null); // Ref to detect outside clicks for notification dropdown

  const toggleDropdown = () => {
    // Close the notification dropdown if it's open
    if (isNotificationDropdownOpen) {
      setIsNotificationDropdownOpen(false);
    }
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both dropdowns
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await logout();
      // Navigate to the login screen

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.message);
    }
  };

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
  return (
    <div className="bg-[#F5F9FF] py-[14px] px-[10px] sm:px-[32px] w-full fixed top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 lg:gap-[148px]">
          <div className="lg:hidden">
            <FiMenu
              size={24}
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          </div>
          <div>
            <Link href="/">
              <Image src="/logo.svg" height={58} width={72} alt="logo" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-20 font-normal leading-6">
              {/* Check if profile exists and has a name */}
              {profile ? `Welcome, ${profile.name} 👋` : "Welcome, User 👋"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              className="bg-[#F4F5F7] font-14 rounded-lg py-3 px-5 pl-12 w-[240px] h-[40px] text-[#00000066] placeholder-[#00000066] focus:outline-none"
              placeholder="Find something.."
            />
            <div className="absolute top-3 left-5">
              <Image
                src="/search-icon.svg"
                width={16}
                height={16}
                alt="search"
              />
            </div>
          </div>

            {/* Wrap Notification in a relative container and pass the onCountUpdate prop */}
            <div className="relative">
            <Notification onCountUpdate={setNotificationCount} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {notificationCount}
              </span>
            )}
          </div>


          <div onClick={toggleDropdown} className="cursor-pointer">
            <Image
              src="/profile-icon.svg"
              width={36}
              height={36}
              alt="profile"
            />
          </div>

          {/* Profile Dropdown menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Attach ref to the profile dropdown menu
              className="absolute right-8 top-14 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div
                className="p-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  href="/profile"
                  className="px-4 py-2 font-12 flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1.74396 13.0765C1.43685 13.0765 1.18063 12.9737 0.975293 12.7679C0.769959 12.5621 0.66707 12.3059 0.666626 11.9992V3.99921C0.666626 3.69254 0.769515 3.43632 0.975293 3.23054C1.18107 3.02476 1.43707 2.92187 1.74329 2.92188H14.2566C14.5633 2.92188 14.8195 3.02476 15.0253 3.23054C15.2311 3.43632 15.3337 3.69254 15.3333 3.99921V11.9992C15.3333 12.3059 15.2306 12.5621 15.0253 12.7679C14.82 12.9737 14.5637 13.0765 14.2566 13.0765H1.74396ZM9.85663 12.4099H14.2566C14.3588 12.4099 14.4528 12.367 14.5386 12.2812C14.624 12.1959 14.6666 12.1019 14.6666 11.9992V3.99921C14.6666 3.89699 14.624 3.80299 14.5386 3.71721C14.4528 3.63188 14.3586 3.58921 14.256 3.58921H1.74396C1.64129 3.58921 1.54707 3.63188 1.46129 3.71721C1.37551 3.80254 1.33285 3.89654 1.33329 3.99921V11.9992C1.33329 12.1014 1.37596 12.1954 1.46129 12.2812C1.54663 12.367 1.64063 12.4099 1.74329 12.4099H2.14329C2.60996 11.8072 3.17752 11.3232 3.84596 10.9579C4.5144 10.5925 5.2324 10.4099 5.99996 10.4099C6.76752 10.4099 7.48529 10.5925 8.15329 10.9579C8.82129 11.3232 9.38907 11.8072 9.85663 12.4099ZM5.99996 9.48587C6.46174 9.48587 6.85507 9.32343 7.17996 8.99854C7.50485 8.67365 7.66707 8.28032 7.66663 7.81854C7.66618 7.35676 7.50396 6.96388 7.17996 6.63988C6.85596 6.31588 6.46263 6.15343 5.99996 6.15254C5.53729 6.15165 5.14396 6.31387 4.81996 6.63921C4.49596 6.96454 4.33374 7.35787 4.33329 7.81921C4.33285 8.28054 4.49507 8.67365 4.81996 8.99854C5.14485 9.32343 5.53818 9.48632 5.99996 9.48587ZM12.2053 11.6139L13.282 10.5372L12.462 9.43454H11.31C11.2264 9.18343 11.1666 8.94387 11.1306 8.71587C11.0946 8.48787 11.0768 8.24899 11.0773 7.99921C11.0777 7.74943 11.0955 7.51587 11.1306 7.29854C11.1657 7.08121 11.2257 6.8361 11.3106 6.56321H12.4613L13.282 5.46054L12.2053 4.38388C11.6648 4.82476 11.2433 5.36099 10.9406 5.99254C10.6384 6.62365 10.4873 7.29254 10.4873 7.99921C10.4873 8.70587 10.6384 9.37476 10.9406 10.0059C11.2428 10.637 11.6644 11.1725 12.2053 11.6139ZM3.03329 12.4099H8.96663C8.57996 11.9877 8.13063 11.6599 7.61863 11.4265C7.10618 11.1932 6.56663 11.0765 5.99996 11.0765C5.43329 11.0765 4.8944 11.1932 4.38329 11.4265C3.87218 11.6599 3.42218 11.9877 3.03329 12.4099ZM5.99996 8.81921C5.72574 8.81921 5.4904 8.72121 5.29396 8.52521C5.09796 8.32876 4.99996 8.09321 4.99996 7.81854C4.99996 7.54387 5.09796 7.30876 5.29396 7.11321C5.48996 6.91765 5.72529 6.81987 5.99996 6.81987C6.27463 6.81987 6.50996 6.91787 6.70596 7.11387C6.90196 7.30988 6.99996 7.54521 6.99996 7.81987C6.99996 8.09454 6.90196 8.32987 6.70596 8.52587C6.50951 8.72143 6.27418 8.81921 5.99996 8.81921Z"
                      fill="#70A9F2"
                    />
                  </svg>
                  Profile
                </Link>
                <button
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="px-4 py-2 font-12 flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer w-full"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2.66663 13.3327V2.66602H8.01329V3.33268H3.33329V12.666H8.01329V13.3327H2.66663ZM10.9746 10.3587L10.5066 9.87868L12.0526 8.33268H6.12796V7.66602H12.0526L10.506 6.11935L10.974 5.64068L13.3333 7.99935L10.9746 10.3587Z"
                      fill="#70A9F2"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
