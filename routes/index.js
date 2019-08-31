var express = require('express');
var router = express.Router();
const jwt   = require('jsonwebtoken');
const db    = require("../db/database.js");



router.get("/", (req, res, next) => {
    const data = {
        data: {
            msg: `Hello me, this the / -route and it's /n the starting point for this application`
        }
    };
    res.json(data);
});

router.post("/reports", checkToken, (req, res) => {
    const { week, writer, report } = req.body;
    // res.status(201);
    // const week = { week: "week" + week, writer, report };
    db.run(
        "INSERT INTO reports (week, writer, report) VALUES (?, ?, ?)",
        [ week, writer, report ], err => {
        if (err) {
            return console.log('​err', err)
        } else {
            return console.log("report created");
        }
    });
    return res.status(201);
    // return res;
});

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
	console.log('TCL: checkToken -> token', token)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({'err': 403});
        } else {
            res.asdf = "test";
            res.json({'token': token, email: decoded.email});
        }
        next();
    });
}

module.exports = router;