const mssql = require('mssql');
const config = require('../config/config');
const bcrypt = require('bcrypt');
require('dotenv').config();
const createMarkup = require("../utils/createMarkup");

const sendMail = require("../utils/sendMail");
const getAUser = require("../utils/getAUser");




async function registerUser(req, res) {
    const { pool } = req
    let user = req.body;
    // let salt = await bycrypt.genSalt(8);
    // let hashed_pwd = await bycrypt.hash(user.Password, salt)

    try {
        let { value } = req;

        let hashed_pwd = await bcrypt.hash(user.password, 8);



        if (pool.connected) {
            let results = await pool
                .request()
                .input("fullname", value.fullname)
                .input("email", value.email)
                .input("password", hashed_pwd)
                .input("phone_number", value.phone_number)
                .input("status", "Active")
                .execute("createUser");

            // try {
            //   await sendMail(value.Name, value.Email);
            // } catch (error) {
            //   console.log(error);
            // }
            console.log(results)
            console.log(results.recordset[0].Result)

            if (results.recordset[0].Result === "User created successfully") {

                // templating
                let html = await createMarkup("./src/views/signup.ejs", {
                    name: value.fullname,
                    text: "Welcome to Nebula, the social media platform that takes you on a journey of discovering hidden connections and forging meaningful relationships in a unique and mysterious atmosphere. We are thrilled to have you as part of our Nebula community, where you can explore, connect, and share your passions with like-minded individuals from all corners of the world. Get ready to unlock the secrets of social connection in a way you've never experienced before. We can't wait to see what you discover!",
                });
                const message = {
                    to: value.email,
                    from: process.env.EMAIL_USER,
                    subject: "Welcome to Nebula - Unveil the Secrets of Social Connection!",
                    html: html,
                };
                await sendMail(message);
                console.log(results);

                res.status(201).send({
                    success: true,
                    message: "Successfully created user",
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "An error occurred",
                });
            }
        }
    } catch (error) {
        res.send(error.message);
    }
}

async function loginUser(req, res) {
    let { email, password } = req.body;
    console.log(req.body)
    try {
        let user = await getAUser(email);


        if (user) {
            let passwords_match = await bcrypt.compare(password, user.password);
            if (passwords_match) {
                console.log("Hey")
                req.session.authorized = true;
                req.session.user = user;


                res.json({
                    success: true,
                    message: "log in successful",
                    profile: user.profile_id,
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "wrong credentials",
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "No user found",
            });
        }
    } catch (error) {
        res.send(error.message);
    }
}

async function logoutUser(req, res) {
    console.log(req.session)


    req.session.destroy((err) => {
        if (err) {
            res.send("Error logging out");
        } else {
            res.send("Logged out successfully");
        }
    })

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}