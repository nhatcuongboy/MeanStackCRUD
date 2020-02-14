// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

// Sign-up
router.post("/register-user",
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('PasswordValidation.password', 'Password should be between 8 to 20 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 8, max: 20 }),
        check('PasswordValidation.repeatpassword', 'RepeatPassword should be between 8 to 20 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 8, max: 20 }),
        check('roles')
            .not()
            .isEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            if (req.body.PasswordValidation.password === req.body.PasswordValidation.repeatpassword) {
                bcrypt.hash(req.body.PasswordValidation.password, 10).then((hash) => {
                    const user = new userSchema({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        roles: req.body.roles
                    });
                    user.save().then((response) => {
                        res.status(201).json({
                            message: "User successfully created!",
                            result: response
                        });
                    }).catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
                });
            } else {
                res.status(500).json({
                    error: "Passwords do not match"
                });
            }
        }
    });


// Sign-in
router.post("/signin", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id,
            roles: getUser.roles
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// Get Users
router.route('/users').get(authorize, (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User with authorize
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update User
router.route('/update-user/:id').put(authorize, (req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})


// Delete User
router.route('/delete-user/:id').delete(authorize, (req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;