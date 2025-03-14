"use client";

import { getNotification } from "@/api/notifications/getNotification";
import { deleteNotification } from "@/api/notifications/deleteNotification";
import { readNotification } from "@/api/notifications/readNotification";
import { markAsUnread } from "@/api/notifications/unreadNotificaiton";
import { markAllAsRead } from "@/api/notifications/markAllasRead";
import Loading from "@/app/loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteAllNotification } from "@/api/notifications/deleteAllNotificaiton";
import { markAllAsUnRead } from "@/api/notifications/markAllasUnread";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchNotification = async () => {
    try {
      setLoading(true);
      const response = await getNotification();
      console.log("Api response", response.data[0].read_at);
      console.log("Api response", response);
      if (!response.success) {
        throw new Error(response.message || "Unknown error occurred");
      }

      // Modify the notifications based on read_at
      const updatedNotifications = response.data.map((notif) => {
        return {
          ...notif,
          is_read: notif.read_at ? true : false, // Set is_read based on read_at field
        };
      });

      setNotifications(updatedNotifications || []);
    } catch (error) {
      setError(error.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await readNotification(id); // Use readNotification instead of markAsRead
      await fetchNotification(); // Refetch the notifications from the API
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark as read:", error.message);
    }
  };

  const handleMarkAsUnread = async (id) => {
    await markAsUnread(id);
    await fetchNotification(); // Refetch the notifications from the API
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, is_read: false } : notif
      )
    );
  };

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

  const handleClearAll = async () => {
    try {
      await deleteAllNotification(); // Call API to delete all notifications
      setNotifications([]); // Clear all notifications from the state
      console.log("All notifications deleted successfully");
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id); // Call API to delete notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      ); // Update state to remove deleted notification
      console.log("Notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    return filter === "read" ? notif.is_read : !notif.is_read;
  });

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-20 font-normal leading-6">Notification</h1>
        </div>

        {loading && <Loading />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && notifications.length === 0 && (
          <p className="text-center text-gray-500">
            No notifications available.
          </p>
        )}

        <div className="flex justify-between items-center my-4">
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
          <div className="flex items-center gap-5">
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

            <button
              onClick={handleClearAll}
              className="bg-[#70A9F233] rounded-sm p-1 text-[#337FE0] font-16 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>

        {!loading && !error && filteredNotifications.length > 0 && (
          <div className="space-y-3.5">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={` rounded-[24px] px-6 py-4 ${
                  item.is_read
                    ? "bg-[#F5F9FF]"
                    : "border-l-4 border-[#1A9ACD] bg-[#F5F9FF]"
                }`}
              >
                <div className={`flex justify-between items-start`}>
                  <div className="flex items-start gap-4">
                    <Image
                      src="/notification-icon.svg"
                      width={24}
                      height={24}
                      alt="Notification"
                    />
                    <h1 className="text-base leading-5">
                      {item.name || "Name Not specified"}
                    </h1>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Image
                      src="/clock.svg"
                      width={20}
                      height={20}
                      alt="time icon"
                    />
                    <p className="text-base leading-5">
                      {item.created_at || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-base leading-5 text-gray-600">
                    {item.data.message || "N/A"}
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 mt-5">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-[#ED202414] rounded-lg py-1 px-2 text-[#ED2024] font-16"
                  >
                    Delete
                  </button>
                  {item.is_read ? (
                    <button
                      onClick={() => handleMarkAsUnread(item.id)}
                      className="bg-[#70A9F233] rounded-lg py-1 px-2 text-[#337FE0] font-16"
                    >
                      Mark as unread
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="bg-[#70A9F233] rounded-lg py-1 px-2 text-[#337FE0] font-16"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
