const express = require("express");
require("dotenv").config();
const cors = require("cors");

const sql = require("mssql");
const config = require("./src/config/config");

const profileRouter = require("./src/routes/profileRoutes");



const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}

))

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config)
        console.log("Connected to the database")

        app.use((req, res, next) => { req.pool = pool; next() })

        app.set("view engine", "ejs")
        app.get(
            "/",
            (req, res, next) => {
                let cont = true;
                if (cont) {
                    console.log("Hello from the middleware");
                    next();
                } else {
                    res.send("Error logged from middleware");
                }
            },
            (req, res) => {
                res.send("Ok")
            }
        );
        app.use(profileRouter)
        app.use("*", (req, res, next) => {
            const error = new Error("Route Not found");
            next({
                status: 404,
                message: error.message,
            });

        });
        app.use((error, req, res, next) => {
            res.status(error.status).json(error.message);
        });
        const port = process.env.PORT;

        app.listen(port, () => console.log(`Server on port: ${port}`));
    } catch (error) {
        console.log('Error connecting to the database')
        console.log(error)
    }
}
connectToDatabase();