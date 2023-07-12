const { new_post_Schema } = require("../schema/postSchema");
const { new_comment_Schema } = require("../schema/commentSchema");
function newPostValidator(body) {
    let post = new_post_Schema.validate(body, { abortEarly: false });

    if (post.error?.details.length > 0) {
        let message = post.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return post;
    }
}

function newCommentValidator(body) {
    let comment = new_comment_Schema.validate(body, { abortEarly: false });

    if (comment.error?.details.length > 0) {
        let message = comment.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return comment;
    }
}


module.exports = { newPostValidator, newCommentValidator };