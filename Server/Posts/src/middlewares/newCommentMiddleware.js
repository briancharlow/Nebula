const { newCommentValidator } = require('../Validators/newPostValidator');
function newCommentMiddleware(req, res, next) {
    let comment = req.body;
    try {
        let { value } = newCommentValidator(comment);

        req.value = value;

        next();
    } catch (error) {
        next({
            status: 400,
            message: error.message
        });

    }

}

module.exports = newCommentMiddleware;