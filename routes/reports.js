var express = require('express');
var router  = express.Router();
const db    = require("../db/database.js");

router.get("/week/:id", async (req, res, next) => {
    const id = req.params.id;
    const week = await getReport(id);
    const data = { week }; 

    res.status(200).json(data);
});

async function getReport(week) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM reports WHERE week = ?",
            [ week ], (err, data) => {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(data[0])
            }
        })
    });
};



module.exports = router;