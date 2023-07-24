import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
        setNotifications(response.data.notifications);
      } else {
        console.log("Failed to fetch notifications:", response.data.message);
      }
    } catch (error) {
      console.log("Error while fetching notifications:", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5010/markAllRead",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setNotifications([]);
      } else {
        console.log(
          "Failed to mark all notifications as read:",
          response.data.message
        );
      }
    } catch (error) {
      console.log("Error while marking all notifications as read:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await axios.put(
        `http://localhost:5010/markRead/${notificationId}`,
        {},
        { withCredentials: true }
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
    <div>
      <h2>Notifications</h2>
      <button onClick={markAllNotificationsAsRead}>Mark All as Read</button>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>{notification.message}</p>
          {!notification.is_read && (
            <AiOutlineCheckCircle
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => markNotificationAsRead(notification.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
