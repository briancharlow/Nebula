const express = require("express");

const postRouter = express.Router();


const { createPost, likePost, deletePost, getPost, unlikePost, getPostsFollowing, commentPost, replyComment, likeComment, UnlikeComment, likeReply, UnlikeReply, getAllPosts, getComments, getReplies } = require("../Controllers/postController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newPostMiddleware = require("../middlewares/newPostMiddleware");



postRouter.use(sessionAuthorization);
postRouter.post("/createPost", newPostMiddleware, createPost)
postRouter.post("/likePost", likePost)
postRouter.delete("/unlikePost/:id", unlikePost)
postRouter.post("/commentPost", commentPost)
postRouter.get("/getComments/:postId", getComments)
postRouter.post("/likeComment", likeComment)
postRouter.delete("/UnlikeComment", UnlikeComment)
postRouter.post("/replyComment", replyComment)
postRouter.get("/getReplies/:commentId", getReplies)
postRouter.post("/likeReply", likeReply)
postRouter.delete("/UnlikeReply", UnlikeReply)
postRouter.put("/deletePost", deletePost)
postRouter.get("/forYou", getPostsFollowing)
postRouter.get("/getPost/:postId", getPost)
postRouter.get("/getAllPosts", getAllPosts)

module.exports = postRouter;