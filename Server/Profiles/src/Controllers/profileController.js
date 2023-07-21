
require('dotenv').config();

const { sql, ConnectionPool } = require('mssql');


async function createProfile(req, res) {

    const { pool } = req
    const userID = req.session.user.id;
    const { bio, username, profilePicture,
        location } = req.body
    try {
        if (pool.connected) {
            let results = await pool.request()
                .input("userId", userID)
                .input("bio", bio)
                .input("username", username)
                .input("profilePicture", profilePicture)
                .input("status", "active")
                .input("location", location)
                .execute("CreateProfile")
            let profile = results.recordset[0]
            console.log(profile)



            if (profile) {
                res.status(201).send({
                    success: true,
                    message: "Successfully created profile",
                    results: profile
                });

                return profile;
            }
        }
    } catch (error) {
        res.send(error.message)
    }

}


async function updateProfile(req, res) {
    const { pool } = req
    const userID = req.session.user.id;
    const { bio, username, profilePicture,
        location } = req.body

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input("userId", userID)
                .input("bio", bio)
                .input("username", username)
                .input("profilePicture", profilePicture)
                .input("location", location)
                .execute("UpdateProfile")
            let profile = results.recordset[0]
            console.log(profile)

            if (profile) {
                res.status(201).send({
                    success: true,
                    message: "Successfully updated profile",
                    results: profile
                });

                return profile
            }
        }
    } catch (error) {
        res.send(error.message)

    }


}

async function deleteProfile(req, res) {
    const { pool } = req
    const userID = req.session.user.id;

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input("userId", userID)
                .execute("DeleteProfile")
            let profile = results.recordset[0]
            console.log(profile)

            if (results.recordset[0].Result === 'Profile deleted successfully') {
                res.status(201).send({
                    success: true,
                    message: "Successfully deleted profile",
                });

                return profile
            }
        }
    } catch (error) {
        res.send(results.recordset[0].Result)
    }

}

async function getUserProfile(req, res) {
    const { pool } = req;
    const userId = req.params.id;

    try {
        if (pool.connected) {
            const profileResults = await pool.request().input("userId", userId).execute("GetUserProfile");
            const profile = profileResults.recordset[0];

            if (profile) {
                const postsResults = await pool.request().input("userId", userId).execute("GetUserPosts");
                const posts = postsResults.recordset;

                profile.posts = posts;

                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved user profile",
                    profile: profile,
                });

                return profile;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
getOwnProfile = async (req, res) => {
    const { pool } = req;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const profileResults = await pool.request().input("userId", userId).execute("GetUserProfile");
            const profile = profileResults.recordset[0];

            if (profile) {
                const postsResults = await pool.request().input("userId", userId).execute("GetUserPosts");
                const posts = postsResults.recordset;

                profile.posts = posts;

                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved user profile",
                    profile: profile,
                });

                return profile;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function followUser(req, res) {
    const { pool } = req;
    const followerId = req.session.user.id;
    const followingId = req.body.followingId;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input("followerId", followerId);
            request.input("followingId", followingId);

            const result = await request.execute("FollowUser");
            console.log(result);

            if (result.recordset[0].Response === "User followed successfully") {
                res.status(200).send({
                    success: true,
                    message: "Successfully followed user",
                });

            } else {
                res.status(200).send({
                    success: false,
                    message: result.recordset[0].Response,
                });

            }

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}





async function unfollowUser(req, res) {
    const { pool } = req;
    const userId = req.session.user.id;
    const { followingId } = req.body;

    try {
        if (pool.connected) {
            const unfollowResults = await pool.request().input("followerId", userId).input("followingId", followingId).execute("UnfollowUser");
            const unfollow = unfollowResults.recordset[0];

            if (unfollow) {
                res.status(200).send({
                    success: true,
                    message: "Successfully unfollowed user",
                    unfollow: unfollow,
                });

                return unfollow;

            }

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getNotifications(req, res) {
    const { pool } = req;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const notificationsResults = await pool.request().input("userId", userId).execute("GetUserNotifications");
            console.log(notificationsResults);
            const notifications = notificationsResults.recordset;

            if (notifications) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved notifications",
                    notifications: notifications,
                });

                return notifications;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function getSingleNotification(req, res) {
    const { pool } = req;
    const notificationId = req.params.id;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input("notificationId", notificationId);

            const result = await request.execute("GetNotification");
            console.log(result);
            const notification = result.recordset[0];

            if (notification) {
                res.status(200).send({
                    success: true,
                    message: "Successfully retrieved notification",
                    notification: notification,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: "Notification not found",
                });
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function markNotificationAsRead(req, res) {
    const { pool } = req;
    const notificationId = req.params.id;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input("notificationId", notificationId);

            await request.execute("MarkNotificationAsRead");

            res.status(200).send({
                success: true,
                message: "Notification marked as read",
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function markAllNotificationsAsRead(req, res) {
    const { pool } = req;
    const userId = req.session.user.id;

    try {
        if (pool.connected) {
            const request = pool.request();
            request.input("userId", userId);

            await request.execute("MarkAllNotificationsAsRead");

            res.status(200).send({
                success: true,
                message: "All notifications marked as read",
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = { createProfile, updateProfile, deleteProfile, getUserProfile, followUser, unfollowUser, getNotifications, getSingleNotification, markNotificationAsRead, markAllNotificationsAsRead, getOwnProfile }
