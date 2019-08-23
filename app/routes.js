const path = require('path');
const UserDetails = require("./user");

module.exports = (app, passport) => {
    /* Define possible endpoints */
    app.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.render(path.join(__dirname + "/Pages/Home/index.ejs"), {
                user: req.user,
                status: req.user.status,
                color: req.user.colorPreference,
                darkMode: req.user.darkPreference
            });
        } else {
            res.redirect("/login");
        }
    });


    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/user");
        }
        if (req.query.origin) {
            req.session.returnTo = req.query.origin;
        }
        res.sendFile(path.join(__dirname + "/Pages/Login/index.html"));
    });

    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname + "/Pages/Register/index.html"));
    });


    app.get('/logout', (req, res) => {
        req.logout();
        if (req.session.returnTo) {
            req.session.returnTo = null;
        }
        res.redirect("/login?logged_off");
    });

    app.get('/user', (req, res) => {
        if (req.isAuthenticated()) {
            var statusHistory = [];
            req.user.statusHistory.forEach((element) => {
                statusHistory.push({
                    status: element.status,
                    timestamp: element.timestamp
                });
            });

            res.render(path.join(__dirname + "/Pages/User/index.ejs"), {
                user: req.user,
                statusHistory: statusHistory,
                color: req.user.colorPreference,
                darkMode: req.user.darkPreference
            });
        } else {
            res.redirect(`/login?origin=${req.originalUrl}`);
        }
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login?error'
        }),
        (req, res) => {
            if (req.session.returnTo) {
                res.redirect(req.session.returnTo);
            } else {
                res.redirect("/");
            }
        }
    );

    app.post("/change-colors",
        (req, res) => {
            UserDetails.findOne({
                "email": req.user.email
            }, (err, user) => {
                if (!err && user) {
                    user.colorPreference = req.body.color_pref;
                    user.darkPreference = req.body.dark_pref;
                    user.save();
                }
            });
        }
    );

    app.post("/home",
        (req, res) => {
            UserDetails.findOne({
                "email": req.user.email
            }, function (err, user) {
                if (err) {
                    res.redirect("/?toggle_error");
                } else {
                    user.status = "home";
                    user.statusHistory.push({ "status": "home", "timestamp": Date.now() });
                    user.save();
                }
            });
        }
    );

    app.post("/away",
        (req, res) => {
            UserDetails.findOne({
                "email": req.user.email
            }, function (err, user) {
                if (err) {
                    res.redirect("/?toggle_error");
                } else {
                    user.status = "away";
                    user.statusHistory.push({ "status": "away", "timestamp": Date.now() });
                    user.save();
                }
            });
        }
    );


    app.post("/change-password",
        (req, res) => {
            UserDetails.findOne({
                "email": req.user.email
            }, function (err, user) {
                if (!err && user) {
                    if (user.validPassword(req.body.old_pass)) {
                        user.password = user.generateHash(req.body.new_pass);
                        user.save();
                        res.redirect("/logout");
                    } else {
                        res.redirect("/user?wrong_pass");
                    }
                }
            });
        }
    );

    app.post("/register",
        (req, res) => {
            UserDetails.findOne({
                "email": req.body.email
            }, function (err, user) {
                if (err) {
                    return callback(err);
                }
                if (user) {
                    res.redirect("/register?exists")
                } else {
                    var newUser = new UserDetails();
                    newUser.email = req.body.email;
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.save(function (err) {
                        if (err) {
                            res.redirect("/register?failure");
                        }
                        else {
                            req.login(newUser, (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.redirect("/");
                                }
                            });
                        }
                    });
                }
            });
        }
    );

    app.post("/delete-account",
        (req, res) => {
            UserDetails.deleteOne({
                _id: req.user._id
            }, function (err) {
                if (!err) {
                    res.redirect("/");
                }
            });
        }
    );
};