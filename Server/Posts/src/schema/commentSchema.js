const joi = require("joi");


const new_comment_Schema = joi.object({
    content: joi.string().min(1).required(),
    postId: joi.number().min(1).required()

});

module.exports = { new_comment_Schema };
