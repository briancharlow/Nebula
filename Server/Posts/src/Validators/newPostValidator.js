const { new_post_Schema } = require("../schema/postSchema");

function newPostValidator(body) {
    let post = new_post_Schema.validate(body, { abortEarly: false });

    if (post.error?.details.length > 0) {
        let message = post.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return post;
    }
}

module.exports = { newPostValidator };