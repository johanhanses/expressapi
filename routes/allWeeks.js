var express = require('express');
var router = express.Router();

router.get("/allWeeks", async (req, res) => {
    // const id = req.params.id;
    const allWeeks = await getReportTitle();
    const data = {allWeeks};

    res.status(200).json(data);
});

async function getReportTitle() {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT week FROM reports",
            (err, data) => {
                if (err) {
                    reject("Read error: " + err.message);
                } else {
                    resolve(data);
                }
            }
        );
    });
}

module.exports = router;