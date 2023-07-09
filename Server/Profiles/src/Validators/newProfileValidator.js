const { new_profile_Schema } = require("../schema/profileSchema");

function newProfileValidator(body) {
    let profile = new_profile_Schema.validate(body, { abortEarly: false });

    if (profile.error?.details.length > 0) {
        let message = profile.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return profile;
    }
}

module.exports = { newProfileValidator };