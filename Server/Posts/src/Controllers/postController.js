
require('dotenv').config();



async function createPost(req, res) {

    const { pool } = req
    const userID = req.session.user.id;
    const { content, mediaUrl } = req.body
    try {
        if (pool.connected) {
            let results = await pool.request()
                .input("userId", userID)
                .input("content", content)
                .input("mediaUrl", mediaUrl)
                .execute("CreatePost")

            console.log(results);
            let post = results.recordset[0]
            console.log(post)



            if (post) {
                res.status(201).send({
                    success: true,
                    message: "Successfully created post",
                    results: post
                });

                return post;
            }
        }
    } catch (error) {
        res.send(error.message)
    }

}


async function getPost(req, res) {
    const { pool } = req;
    const postId = req.params.postId;

    try {
        if (pool.connected) {
            const postResults = await pool.request().input("postId", postId).execute("GetPostDetails");
            console.log(postResults)
            const post = postResults.recordset[0];

            if (post) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved post",
                    post: post,
                });

                return post;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
async function getAllPosts(req, res) {
    const { pool } = req;
    console.log("Öutside pool connected");
    try {
        if (pool.connected) {
            const postResults = await pool.request().execute("GetAllPosts");
            const posts = postResults.recordset;
            console.log("Inside pool connected");

            if (posts.length > 0) {
                const organizedPosts = organizePosts(posts);

                // Convert the object of posts to an array and reverse it to get most recent posts first
                const reversedPosts = Object.values(organizedPosts).reverse();

                res.status(200).json({
                    success: true,
                    message: "Successfully retrieved all posts",
                    posts: reversedPosts,
                });

                return reversedPosts;
            } else {
                res.status(404).json({
                    success: false,
                    message: "No posts found",
                    posts: [],
                });

                return [];
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while retrieving posts",
            error: error.message,
        });
    }
}

function organizePosts(posts) {
    const organizedPosts = {};

    // Loop through each post and organize the data
    posts.forEach((post) => {
        const {
            post_id,
            post_user_id,
            post_content,
            post_created_at,
            post_username,
            post_user_profile_picture,
            post_likes_count,
            post_comments_count,
            post_media_url,
            comment_id,
            comment_user_id,
            comment_content,
            comment_created_at,
            comment_likes_count,
            reply_id,
            reply_user_id,
            reply_content,
            reply_created_at,
            reply_likes_count,
            comment_username,
            comment_user_profile_picture,
            reply_username,
            reply_user_profile_picture,
        } = post;

        // If the post doesn't exist in the organizedPosts object, initialize it
        if (!organizedPosts[post_id]) {
            organizedPosts[post_id] = {
                post_id,
                post_user_id,
                post_content,
                post_created_at,
                post_username,
                post_user_profile_picture,
                post_likes_count,
                post_comments_count,
                post_media_url,
                comments: [],
            };
        }

        // If the comment doesn't exist in the organizedPosts object, initialize it
        if (comment_id && !organizedPosts[post_id].comments.some((c) => c.comment_id === comment_id)) {
            organizedPosts[post_id].comments.push({
                comment_id,
                comment_user_id,
                comment_content,
                comment_created_at,
                comment_likes_count,
                comment_username,
                comment_user_profile_picture,
                replies: [],
            });
        }

        // Add the reply data to the comment
        if (reply_id) {
            const comment = organizedPosts[post_id].comments.find((c) => c.comment_id === comment_id);
            if (comment && !comment.replies.some((r) => r.reply_id === reply_id)) {
                comment.replies.push({
                    reply_id,
                    reply_user_id,
                    reply_content,
                    reply_created_at,
                    reply_likes_count,
                    reply_username,
                    reply_user_profile_picture,
                });
            }
        }
    });

    return organizedPosts;
}






async function deletePost(req, res) {
    const { pool } = req
    const { postId } = req.body
    try {
        if (pool.connected) {
            let results = await pool.request()
                .input("postId", postId)
                .execute("DeletePost")

            console.log(results);
            let post = results.recordset[0]
            console.log(post)

            if (post) {
                res.status(201).send({
                    success: true,
                    message: "Successfully deleted post",
                });

                return post
            }
        }
    } catch (error) {
        res.send(error.message)
    }
}




async function likePost(req, res) {
    const { pool } = req;
    const { postId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const likeResults = await pool.request().input("post_id", postId).input("user_id", userId).execute("LikePost");
            console.log(likeResults)
            const like = likeResults.recordset[0];

            if (like.Message === 'Post liked successfully.') {
                res.status(200).send({
                    success: true,
                    message: like.Message,
                });


            }
            else {
                res.status(200).send({
                    success: false,
                    message: like.Message,
                });

                return like;

            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
async function unlikePost(req, res) {
    const { pool } = req;
    const postId = req.params.id;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input("postID", postId);
            request.input("userID", userId);

            const result = await request.execute("UnlikePost");
            const unlike = result.recordset[0];

            if (unlike.Result === "Post unliked successfully") {
                res.status(200).send({
                    success: true,
                    message: unlike.Result,
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: unlike.Result,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



async function getPostsFollowing(req, res) {
    const { pool } = req;
    const userId = req.session.user.id;



    try {
        if (pool.connected) {
            const postsResults = await pool.request().input("userId", userId).execute("GetPostsByFollowing");
            console.log(postsResults);
            const posts = postsResults.recordset;

            if (posts) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved posts",
                    posts: posts,
                });

                return posts;
            }
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function commentPost(req, res) {
    const { pool } = req;
    const { postId, content } = req.body;
    console.log(req.body);
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input('postId', postId);
            request.input('userId', userId);
            request.input('content', content);

            const result = await request.execute('CommentOnPost');
            const comment = result.recordset[0];

            console.log(comment);

            if (comment) {
                res.status(200).send({
                    success: true,
                    message: 'Successfully commented on post',
                    comment: comment,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function replyComment(req, res) {
    const { pool } = req;
    const { content, commentId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const replyResults = await pool.request()
                .input("userId", userId)
                .input("content", content)
                .input("commentId", commentId)
                .execute("AddReplyToComment");

            console.log(replyResults);
            const reply = replyResults.recordset[0];

            if (reply) {
                res.status(200).send({
                    success: true,
                    message: "Successfully replied to comment",
                    reply: reply,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

}

async function likeComment(req, res) {
    const { pool } = req;
    const { commentId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const likeResults = await pool.request().input("comment_id", commentId).input("user_id", userId).execute("LikeComment");

            console.log(likeResults)
            const like = likeResults.recordset[0];

            if (like.Message === 'Comment liked successfully.') {
                res.status(200).send({
                    success: true,
                    like: like.Message,
                });

            }
            else {
                res.status(200).send({
                    success: false,
                    like: like.Message,
                });
            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function UnlikeComment(req, res) {
    const { pool } = req;
    const { commentId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const unlikeResults = await pool.request().input("commentID", commentId).input("userID", userId).execute("UnlikeComment");

            console.log(unlikeResults)
            const unlike = unlikeResults.recordset[0];

            if (unlike.Result === 'Comment unliked successfully') {
                res.status(200).send({
                    success: true,
                    message: "Successfully unliked comment",
                    unlike: unlike,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: unlike.Result
                }
                );

            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function likeReply(req, res) {
    const { pool } = req;
    const { replyId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const likeResults = await pool.request().input("reply_id", replyId).input("user_id", userId).execute("LikeReply");
            console.log(likeResults);

            const like = likeResults.recordset[0];

            if (like.Message === "Reply liked successfully.") {
                res.status(200).send({
                    success: true,
                    message: "Successfully liked reply",
                    like: like,
                });

            }
            else {
                res.status(200).send({
                    success: false,
                    message: "Successfully liked reply",
                    like: like,
                });

            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function UnlikeReply(req, res) {
    const { pool } = req;
    const { replyId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const unlikeResults = await pool.request().input("replyID", replyId).input("userID", userId).execute("UnlikeReply");
            console.log(unlikeResults);
            const unlike = unlikeResults.recordset[0];

            if (unlike.Result === "Reply unliked successfully") {
                res.status(200).send({
                    success: true,
                    message: unlike.Result,
                });
            }
            else {
                res.status(201).send({
                    success: false,
                    message: unlike.Result,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getComments(req, res) {
    const { pool } = req;
    const postId = req.params.postId;

    try {
        if (pool.connected) {
            const commentsResults = await pool.request().input("postID", postId).execute("GetPostComments");
            console.log(commentsResults);
            const comments = commentsResults.recordset;

            if (comments) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved comments",
                    comments: comments,
                });

                return comments;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getReplies(req, res) {
    const { pool } = req;
    const commentId = req.params.commentId;

    try {
        if (pool.connected) {
            const repliesResults = await pool.request().input("commentId", commentId).execute("GetRepliesToCommentWithLikes");
            console.log(repliesResults);
            const replies = repliesResults.recordset;

            if (replies) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved replies",
                    replies: replies,
                });

                return replies;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}




module.exports = { createPost, deletePost, likePost, getPost, unlikePost, getPostsFollowing, commentPost, replyComment, likeComment, UnlikeComment, likeReply, UnlikeReply, getAllPosts, getComments, getReplies }
