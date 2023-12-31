const express = require("express");

const authRouter = express.Router();


const { registerUser, loginUser, logoutUser, getLoggedInUser } = require("../Controllers/authController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newUserMiddleware = require("../middlewares/newUserMiddleware");
authRouter.post("/register", newUserMiddleware, registerUser)



authRouter.post("/login", loginUser)

authRouter.get("/getLoggedInUser", sessionAuthorization, getLoggedInUser)
authRouter.get("/logout", sessionAuthorization, logoutUser)

module.exports = authRouter;