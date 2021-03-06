const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    console.log("In register");

    const newUser = new User(req.body);
    newUser.save()
        .then(() => {
            console.log("Successful user registration");
            res.json({
                message: "Successfully registered user",
                user: newUser
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = (req, res) => {
    console.log("In login");
    
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                console.log("User not found");
                res.status(400).json({ message: "Email address and/or password is incorrect" });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if (isPasswordValid) {
                            console.log("Password is valid");
                            res.cookie("usertoken",
                                jwt.sign({
                                    _id: user._id,
                                    email: user.email
                                }, process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 86400000)
                                })
                                .cookie("user", JSON.stringify({
                                    _id: user._id,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }),
                                {
                                    expires: new Date(Date.now() + 86400000)
                                })
                                .json({
                                    message: "Successfully logged in",
                                    userLoggedIn: {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        companyName: user.companyName
                                    }
                                })
                        } else {
                            console.log("Invalid password");
                            res.status(400).json({ message: "Email address and/or password is incorrect" });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({ message: "Login failed - please try again" });
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "Login failed - please try again" });
        })
}

module.exports.logout = (req, res) => {
    console.log("In logout");

    res.clearCookie("usertoken");
    res.json({ message: "You have successfully logged out" });
}