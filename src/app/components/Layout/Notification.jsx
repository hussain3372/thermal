import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { getNotification } from "@/api/notifications/getNotification";
// import { deleteNotification } from "@/api/notifications/deleteNotification";

const Notification = () => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]); // Add this state

  // const notificationDropdownRef = useRef(null);

  // Toggle the notification dropdown visibility
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       notificationDropdownRef.current &&
  //       !notificationDropdownRef.current.contains(event.target)
  //     ) {
  //       setIsNotificationDropdownOpen(false);
  //     }
  //   };

  //   const fetchNotifications = async () => {
  //     try {
  //       const data = await getNotification(); // Fetch notifications from the API
  //       setNotifications(data); // Update the notifications state with API response
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   if (isNotificationDropdownOpen) {
  //     fetchNotifications(); // Fetch notifications only when dropdown is open
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isNotificationDropdownOpen]); // Dependency array includes dropdown state

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteNotification(id); // Call the API to delete the notification
  //     setNotifications((prevNotifications) =>
  //       prevNotifications.filter((notification) => notification.id !== id)
  //     ); // Update state to remove the deleted notification
  //     console.log("Notification deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting notification:", error);
  //   }
  // };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <div onClick={toggleNotificationDropdown} className="cursor-pointer">
        <Image
          src="/notification-icon.svg"
          width={36}
          height={36}
          alt="notification"
        />
      </div>

      {/* Notification Dropdown */}
      {isNotificationDropdownOpen && (
        <div className="absolute right-[1px] top-16 mt-2 w-[596px] max-w-xl rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 py-8 px-6">
          <div className="flex justify-center items-center mb-10">
            <h1 className="font-24 font-semibold leading-8">Notifications</h1>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="font-16 font-medium px-2 py-1 text-[#6D6D6D] hover:text-[#70A9F2] hover:bg-[#70A9F21F] rounded-lg cursor-pointer">
                All
              </div>
              <div className="font-16 font-medium px-2 py-1 text-[#6D6D6D] hover:text-[#70A9F2] hover:bg-[#70A9F21F] rounded-lg cursor-pointer">
                Read
              </div>
              <div className="font-16 font-medium px-2 py-1 text-[#6D6D6D] hover:text-[#70A9F2] hover:bg-[#70A9F21F] rounded-lg cursor-pointer">
                Unread
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label
                htmlFor="notification"
                className="font-16 font-medium leading-5 text-[#132944]"
              >
                Mark all as read
              </label>
            </div>
          </div>

          {/* Notification Items */}
          <div className="flex flex-col gap-3 overflow-auto h-full max-h-[535px]">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="bg-[#F5F9FF] py-3 px-4 border-l-4 border-[#70A9F2] rounded-xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src={notification.icon || "/notification-icon.svg"} // Use dynamic icon if available
                        width={24}
                        height={24}
                        alt="notification-icon"
                        className="w-6 h-6"
                      />
                      <h1 className="font-16 font-normal leading-5 text-black">
                        {notification.data.name || "No Title"}{" "}
                        {/* Dynamic Title */}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/blue-clock.svg"
                        width={16}
                        height={16}
                        alt="notification-time"
                      />
                      <p className="font-12 font-normal text-[#00000099] leading-4">
                        {new Date(notification.created_at).toLocaleString() ||
                          "N/A"}
                      </p>

                      {/* <button
                        onClick={() => handleDelete(notification.id)} // Pass notification ID
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button> */}
                    </div>
                  </div>

                  <p className="mt-3 font-16 font-normal leading-5 text-[#00000099] pl-[37px]">
                    {notification.data.message || "No content available"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No notifications available
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link href="/notifications" className="primary-small-btn">
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
