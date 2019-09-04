var express     = require('express');
var router      = express.Router();
const bcrypt    = require('bcrypt');
const db        = require("../db/database.js");
const jwt       = require('jsonwebtoken');

router.post('/', async function(req, res,) {
    const { email, password } = req.body;

    console.log('​password', password);

    const getUser = (email) => {
        return new Promise((resolve, reject) => {
            db.all(
                "SELECT * FROM users WHERE email = ?",
                [ email ], (err, data) => {
                    if (err) {
                        reject("Read error: " + err.message);
                    } else {
                        resolve(data[0]);
                    }
                }
            );
        });
    };

    const user = await getUser(email);

    if (!user) {
        return res.sendStatus(404);
    }
    const isCorrectPass = await bcrypt.compare(password, user.password);

    if (isCorrectPass) {
        const payload = { "email": email };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        console.log('​token', token);
        // return token;
        // return res.status(200).json({'email': email, 'token': token});
        return res.status(200).send(token);
    } else {
        console.log("else");
        return res.status(403).json({'err': 401});
    }
});

module.exports = router;
