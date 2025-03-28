"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getNotification } from "@/api/notifications/getNotification";
import { markAllAsRead } from "@/api/notifications/markAllasRead";
import { markAllAsUnRead } from "@/api/notifications/markAllasUnread";

const Notification = ({ onCountUpdate }) => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const notificationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotification = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getNotification();
      if (!response.success) {
        throw new Error(response.message || "Unknown error occurred");
      }

      // Modify the notifications based on read_at
      const updatedNotifications = response.data.map((notif) => ({
        ...notif,
        is_read: !!notif.read_at, // Set is_read based on read_at field
      }));

      setNotifications(updatedNotifications || []);

      // NEW: Update the unread count in the parent Header
      if (onCountUpdate) {
        const unreadCount = updatedNotifications.filter(
          (notif) => !notif.is_read
        ).length;
        onCountUpdate(unreadCount);
      }
    } catch (error) {
      setError(error.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [onCountUpdate]);

  useEffect(() => {
    fetchNotification();
  }, [isNotificationDropdownOpen, fetchNotification]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(); // Mark all notifications as read in the backend
      await fetchNotification(); // Refetch the notifications from the API
      setNotifications(
        (prev) => prev.map((notif) => ({ ...notif, is_read: true })) // Update the state to reflect all as read
      );
    } catch (error) {
      console.error("Failed to mark all as read:", error.message);
    }
  };

  const handleMarkAllAsUnRead = async () => {
    try {
      await markAllAsUnRead(); // Mark all notifications as unread in the backend
      await fetchNotification(); // Refetch the notifications from the API
      setNotifications(
        (prev) => prev.map((notif) => ({ ...notif, is_read: false })) // Update the state to reflect all as unread
      );
    } catch (error) {
      console.error("Failed to mark all as unread:", error.message);
    }
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    return filter === "read" ? notif.is_read : !notif.is_read;
  });

  return (
    <div className="relative" ref={notificationDropdownRef}>
      <div
        onClick={() => setIsNotificationDropdownOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <Image
          src="/notification-icon.svg"
          width={36}
          height={36}
          alt="notification"
        />
      </div>

      {isNotificationDropdownOpen && (
        <div className="absolute right-[-39px] sm:right-0 top-[70px] sm:top-16 -mt-10 w-[352px] sm:w-[596px] max-w-xl rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 py-8 px-6">
          <div className="flex justify-center items-center mb-10">
            <h1 className="font-24 font-semibold leading-8">Notifications</h1>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {["all", "read", "unread"].map((type) => (
                <div
                  key={type}
                  className={`font-16 font-medium px-2 py-1 rounded-lg cursor-pointer ${
                    filter === type
                      ? "text-[#70A9F2] bg-[#70A9F21F]"
                      : "text-[#6D6D6D]"
                  }`}
                  onClick={() => handleFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.every((notif) => notif.is_read)} // Check if all notifications are read
                onChange={() => {
                  if (notifications.every((notif) => notif.is_read)) {
                    // If all notifications are already read, mark all as unread
                    handleMarkAllAsUnRead(); // Call function to mark all notifications as unread
                  } else {
                    // If not all notifications are read, mark all as read
                    handleMarkAllAsRead(); // Call function to mark all notifications as read
                  }
                }}
              />
              <label className="font-16 font-medium leading-5 text-[#132944]">
                {notifications.every((notif) => notif.is_read)
                  ? "Mark all as unread"
                  : "Mark all as read"}
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-auto h-full max-h-[535px]">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`py-3 px-4 rounded-xl ${
                    notification.is_read
                      ? "bg-[#F5F9FF]"
                      : "border-l-4 border-[#70A9F2] bg-[#F5F9FF]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/notification-icon.svg"
                        width={24}
                        height={24}
                        alt="notification-icon"
                      />
                      <h1 className="font-16 font-normal leading-5 text-black">
                        {notification.data?.name || "No Title"}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/clock.svg"
                        width={16}
                        height={16}
                        alt="notification-time"
                      />
                      <p className="font-12 font-normal text-[#00000099] leading-4">
                        {notification.created_at || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 font-16 font-normal leading-5 text-[#00000099] pl-[37px]">
                    {notification.data?.message || "No content available"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No notifications available
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5">
            <Link
              href="/notifications"
              className="bg-[#70A9F233] rounded-sm p-1 text-[#337FE0] font-16 font-medium"
            >
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
