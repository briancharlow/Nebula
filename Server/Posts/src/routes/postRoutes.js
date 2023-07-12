const express = require("express");

const postRouter = express.Router();


const { createPost, likePost, deletePost, getPost, unlikePost, getPostsFollowing, commentPost, replyComment, likeComment, UnlikeComment, likeReply, UnlikeReply, getAllPosts } = require("../Controllers/postController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newPostMiddleware = require("../middlewares/newPostMiddleware");



postRouter.use(sessionAuthorization);
postRouter.post("/createPost", newPostMiddleware, createPost)
postRouter.post("/likePost", likePost)
postRouter.delete("/unlikePost/:id", unlikePost)
postRouter.get("/forYou", getPostsFollowing)
postRouter.post("/commentPost", commentPost)
postRouter.post("/replyComment", replyComment)
postRouter.post("/likeComment", likeComment)
postRouter.post("/UnlikeComment", UnlikeComment)
postRouter.post("/likeReply", likeReply)
postRouter.post("/UnlikeReply", UnlikeReply)
postRouter.put("/deletePost", deletePost)
postRouter.get("/getPost/:postId", getPost)
postRouter.get("/getAllPosts", getAllPosts)

module.exports = postRouter;