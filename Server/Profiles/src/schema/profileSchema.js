const joi = require("joi");

const new_profile_Schema = joi.object({
    bio: joi.string().min(4),
    username: joi.string().min(4).max(30).required(),
    profilePicture: joi.string().min(5).max(255).allow(null),
    location: joi.string().min(4).max(255),
});

module.exports = { new_profile_Schema };
