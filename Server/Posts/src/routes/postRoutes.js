const express = require("express");

const postRouter = express.Router();


const { createPost, likePost, deletePost, getPost, unlikePost, getPostsFollowing, commentPost, replyComment, likeComment, UnlikeComment, likeReply, UnlikeReply } = require("../Controllers/postController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newPostMiddleware = require("../middlewares/newPostMiddleware");

postRouter.use(sessionAuthorization);
postRouter.post("/createPost", newPostMiddleware, createPost)
postRouter.put("/likePost", likePost)
postRouter.put("/unlikePost", unlikePost)
postRouter.get("/getPostsFollowing", getPostsFollowing)
postRouter.put("/commentPost", commentPost)
postRouter.put("/replyComment", replyComment)
postRouter.put("/likeComment", likeComment)
postRouter.put("/UnlikeComment", UnlikeComment)
postRouter.put("/likeReply", likeReply)
postRouter.put("/UnlikeReply", UnlikeReply)
postRouter.put("/deletePost", deletePost)
postRouter.get("/getPost", getPost)

module.exports = postRouter;