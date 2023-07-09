const joi = require("joi");

const new_user_Schema = joi
    .object({
        fullname: joi.string().min(4).required(),
        // ProfilePicture: joi.string().min(5).max(30),
        email: joi
            .string()
            .email({ tlds: { allow: false } }),
        password: joi
            .string()
            .required()
            .pattern(new RegExp(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )),
        c_password: joi.ref("password"),
        phone_number: joi.string().min(10).max(10).required(),


    })
    .with("password", "c_password");


module.exports = { new_user_Schema }