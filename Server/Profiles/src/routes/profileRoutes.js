const express = require("express");

const profileRouter = express.Router();


const { createProfile, updateProfile, deleteProfile, getUserProfile, followUser, unfollowUser } = require("../Controllers/profileController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newProfileMiddleware = require("../middlewares/newProfileMiddleware");

profileRouter.use(sessionAuthorization);
profileRouter.post("/createProfile", newProfileMiddleware, createProfile)
profileRouter.put("/updateProfile", newProfileMiddleware, updateProfile)
profileRouter.put("/deleteProfile", deleteProfile)
profileRouter.get("/getProfile/:id", getUserProfile)
profileRouter.post("/followUser", followUser)
profileRouter.post("/unfollowUser", unfollowUser)

module.exports = profileRouter;