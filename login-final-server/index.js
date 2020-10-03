const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "hkdvsahdsdjhavkdsh25675816223wef",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24, },

}));


const db = mysql.createConnection({
    host: "fliika-database-mysql.mysql.database.azure.com",
    user: "FLiiKAMYSQL@fliika-database-mysql",
    password: "@Fliika10",
    database: "loginfinalappdb"
});






// Create
app.post("/signup", (req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const Email = req.body.Email
    const userName = req.body.userName
    const dateofBirth = req.body.dateofBirth
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        const sqlInsert = "INSERT INTO loginfinalapp_users (firstName, lastName, Email, userName, dateofBirth, phoneNumber, password) VALUES (?,?,?,?,?,?,?)"
        db.query(sqlInsert, [firstName, lastName, Email, userName, dateofBirth, phoneNumber, hash], (err, result) => {
            console.log(err);
        });
    });


});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    db.query(
        "SELECT * FROM loginfinalapp_users WHERE userName = ?;",
        userName,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        //**set session to whatever user result gets */
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }

        }

    );
});



app.listen(3001, () => {
    console.log("running on port 3001");
});