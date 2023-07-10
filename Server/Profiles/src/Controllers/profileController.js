
require('dotenv').config();



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
    const userId = req.body;

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
                    posts: posts,
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
    const userId = req.session.user.id;
    const { profileId } = req.body;

    try {
        if (pool.connected) {
            const followResults = await pool.request().input("userId", userId).input("profileId", profileId).execute("FollowUser");
            const follow = followResults.recordset[0];

            if (follow) {
                res.status(200).send({
                    success: true,
                    message: "Successfully followed user",
                    follow: follow,
                });

                return follow;

            }

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function unfollowUser(req, res) {
    const { pool } = req;
    const userId = req.session.user.id;
    const { profileId } = req.body;

    try {
        if (pool.connected) {
            const unfollowResults = await pool.request().input("userId", userId).input("profileId", profileId).execute("UnfollowUser");
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





module.exports = { createProfile, updateProfile, deleteProfile, getUserProfile, followUser, unfollowUser }
