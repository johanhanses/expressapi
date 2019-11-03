const express    = require("express");
const cors       = require('cors');
const morgan     = require('morgan');

const app        = express();
const bodyParser = require("body-parser");

const index      = require('./routes/index');
const hello      = require('./routes/hello');
const reports    = require("./routes/reports");
const register   = require("./routes/register");
const login      = require("./routes/login");
const allWeeks   = require("./routes/allWeeks");

const port = 5000;

app.use(cors());

// for parsing application/json
app.use(
    bodyParser.json()
);

// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded(
        { extended: true }
    )
);

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/', index);
app.use('/hello', hello);
app.use('/reports', reports);
app.use('/register', register);
app.use('/login', login);
app.use('/allweeks', allWeeks);



// Add routes for 404 and error handling
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
