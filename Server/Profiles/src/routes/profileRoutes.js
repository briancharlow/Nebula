const express = require("express");

const profileRouter = express.Router();


const { createProfile, updateProfile, deleteProfile, getUserProfile, followUser, unfollowUser, getNotifications, getSingleNotification, markNotificationAsRead, markAllNotificationsAsRead, getOwnProfile } = require("../Controllers/profileController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newProfileMiddleware = require("../middlewares/newProfileMiddleware");

profileRouter.use(sessionAuthorization);
profileRouter.post("/createProfile", newProfileMiddleware, createProfile)
profileRouter.put("/updateProfile", newProfileMiddleware, updateProfile)
profileRouter.put("/deleteProfile", deleteProfile)
profileRouter.get("/getProfile/:id", getUserProfile)
profileRouter.get("/Profile", getOwnProfile)
profileRouter.post("/followUser", followUser)
profileRouter.post("/unfollowUser", unfollowUser)
profileRouter.get("/getNotifications", getNotifications)
profileRouter.get("/getNotification/:id", getSingleNotification)
profileRouter.put("/markRead/:id", markNotificationAsRead)
profileRouter.put("/markAllRead", markAllNotificationsAsRead)

module.exports = profileRouter;