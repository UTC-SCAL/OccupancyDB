/* Basic ExpressJS init */
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
/* This allows the form to get sent to Passport correctly */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
/* This fixes isAuthenticated() always returning false */
app.use(require('express-session')({
    secret: 'hotdog123',
    resave: true,
    saveUninitialized: true
}));
/* Passport init */
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
/* MongoDB init */
const mongoose = require("mongoose");
const UserDetails = require("./app/user");
mongoose.connect("mongodb://localhost/OccupancyDBDataStore", {
    useNewUrlParser: true
});

/* Define LocalStrategy */
const LocalStrategy = require('passport-local').Strategy;
/* usernameField: 'email' is required to get this to work because 
        Passport is expecting username:pass not email:pass */
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, callback) {
        UserDetails.findOne({
            "email": email
        }, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }

            if (!user.validPassword(password)) {
                return callback(null, false);
            }
            return callback(null, user);
        });
    }
));

/* Define methods for serialization / deserialization */
passport.serializeUser(function (user, callback) {
    callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
    UserDetails.findById(id, function (err, user) {
        callback(err, user);
    });
});

/* Route declaration */
require("./app/routes")(app, passport);

/* Cert stuff */
try {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/research.utccuip.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/research.utccuip.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/research.utccuip.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const httpsServer = https.createServer(credentials, app);
    /* Deploy web server */
    httpsServer.listen(port, () => {
        console.log("HTTPS listening on port " + port);
    });
} catch (err) {
    console.log("Could not find certs - assuming dev environment.");
    app.listen(port, () => console.log("Debug listening on port " + port));
}


