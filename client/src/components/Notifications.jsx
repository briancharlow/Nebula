import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "../css/notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5010/getNotifications",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        // Filter out the unread notifications
        const unreadNotifications = response.data.notifications.filter(
          (notification) => !notification.is_read
        );
        setNotifications(unreadNotifications);
      } else {
        console.log("Failed to fetch notifications:", response.data.message);
      }
    } catch (error) {
      console.log("Error while fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await axios.put(
        `http://localhost:5010/markRead/${notificationId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
      } else {
        console.log(
          "Failed to mark notification as read:",
          response.data.message
        );
      }
    } catch (error) {
      console.log("Error while marking notification as read:", error);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-heading">Notifications</h2>
      </div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.is_read ? "read" : "unread"}`}
        >
          {notification.sender_profile_picture ? (
            <img
              src={notification.sender_profile_picture}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <FaUserCircle className="default-profile-picture" />
          )}
          <h3>{notification.sender_username}</h3>
          <p className="notification-message">{notification.message}</p>
          {!notification.is_read && (
            <AiOutlineCheckCircle
              className="notification-icon"
              onClick={() => markNotificationAsRead(notification.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
