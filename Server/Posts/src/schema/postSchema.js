const joi = require("joi");

const new_post_Schema = joi.object({
    content: joi.string().min(1).required(),
    mediaUrl: joi.string().min(5).max(255).allow(null)
});

module.exports = { new_post_Schema };
