
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

            if (like.Message === 'Post liked successfully') {
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
    const { postId } = req.body;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const unlikeResults = await pool.request().input("postID", postId).input("userID", userId).execute("UnlikePost");

            console.log(unlikeResults)
            const unlike = unlikeResults.recordset[0];

            if (unlike.Result === 'Post unliked successfully') {
                res.status(200).send({
                    success: true,
                    message: unlike.Result

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
                .execute("ReplyToComment");

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

            if (like.Message === 'Comment liked successfully') {
                res.status(200).send({
                    success: true,
                    like: like,
                });

            }
            else {
                res.status(200).send({
                    success: false,
                    like: like,
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
            const unlikeResults = await pool.request().input("commentId", commentId).input("userId", userId).execute("UnlikeComment");

            console.log(unlikeResults)
            const unlike = unlikeResults.recordset[0];

            if (unlike) {
                res.status(200).send({
                    success: true,
                    message: "Successfully unliked comment",
                    unlike: unlike,
                });
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
            const likeResults = await pool.request().input("replyId", replyId).input("userId", userId).execute("LikeReply");
            console.log(likeResults);

            const like = likeResults.recordset[0];

            if (like) {
                res.status(200).send({
                    success: true,
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
            const unlikeResults = await pool.request().input("replyId", replyId).input("userId", userId).execute("UnlikeReply");
            console.log(unlikeResults);
            const unlike = unlikeResults.recordset[0];

            if (unlike) {
                res.status(200).send({
                    success: true,
                    message: "Successfully unliked reply",
                    unlike: unlike,
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getAllPosts(req, res) {
    const { pool } = req;

    try {
        if (pool.connected) {
            const postsResults = await pool.request().execute("GetAllPosts");
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


module.exports = { createPost, deletePost, likePost, getPost, unlikePost, getPostsFollowing, commentPost, replyComment, likeComment, UnlikeComment, likeReply, UnlikeReply, getAllPosts }
