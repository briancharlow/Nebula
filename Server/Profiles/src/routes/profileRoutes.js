const express = require("express");

const profileRouter = express.Router();


const { createProfile, updateProfile, deleteProfile, getUserProfile } = require("../Controllers/profileController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newProfileMiddleware = require("../middlewares/newProfileMiddleware");

profileRouter.use(sessionAuthorization);
profileRouter.post("/createProfile", newProfileMiddleware, createProfile)
profileRouter.put("/updateProfile", newProfileMiddleware, updateProfile)
profileRouter.put("/deleteProfile", deleteProfile)
profileRouter.get("/getProfile", getUserProfile)

module.exports = profileRouter;