const express       = require('express');
const router        = express.Router();
const db            = require("../db/database.js");
const bcrypt        = require('bcryptjs');
const saltRounds    = 10;

router.post('/', async (req, res) => {
    const { email, password, name, birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // console.log("/register");
    db.run(
        "INSERT INTO users (email, password, name, birthdate) VALUES (?, ?, ?, ?)",
        [ email, hashedPassword, name, birthdate ], err => {
            // console.log("IN DB");
            if (err) {
                console.log('​err', err);
                res.status(400).send(err);
            } else {
                console.log("user created");
            }
        });

    // res.send("ok");
});

module.exports = router;
