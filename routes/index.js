var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    const data = {
        data: {
            msg: "Hello me"
        }
    };
    res.json(data);
});

module.exports = router;