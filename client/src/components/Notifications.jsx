import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(false); // Stop the loading spinner

      if (response.data.success) {
        // Filter out the unread notifications
        const unreadNotifications = response.data.notifications.filter(
          (notification) => !notification.is_read
        );
        setNotifications(unreadNotifications);
      } else {
        toast.error("Failed to fetch notifications");
        console.log("Failed to fetch notifications:", response.data.message);
      }
    } catch (error) {
      setLoading(false); // Stop the loading spinner
      toast.error("Error while fetching notifications");
      console.log("Error while fetching notifications:", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5010/markAllRead",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setNotifications([]); // Clear all notifications after marking as read
        toast.success("All notifications marked as read");
      } else {
        toast.error("Failed to mark all notifications as read");
        console.log(
          "Failed to mark all notifications as read:",
          response.data.message
        );
      }
    } catch (error) {
      toast.error("Error while marking all notifications as read");
      console.log("Error while marking all notifications as read:", error);
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
        toast.success("Notification marked as read");
      } else {
        toast.error("Failed to mark notification as read");
        console.log(
          "Failed to mark notification as read:",
          response.data.message
        );
      }
    } catch (error) {
      toast.error("Error while marking notification as read");
      console.log("Error while marking notification as read:", error);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-heading">Notifications</h2>
        <div className="mark-all-read" onClick={markAllNotificationsAsRead}>
          <AiOutlineCheckCircle className="mark-all-read-icon" />
          <span className="mark-all-read-tooltip">Mark All as Read</span>
        </div>
      </div>
      {loading ? (
        <div className="loading-spinner">
          <VscLoading className="spinner-icon" />
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${
              notification.is_read ? "read" : "unread"
            }`}
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
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default Notifications;
