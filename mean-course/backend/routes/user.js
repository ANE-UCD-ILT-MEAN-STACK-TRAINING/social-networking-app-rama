const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
            email: req.body.email,
            password: hash
            });
            console.log("Before saving user in the server " + user);
            user.save()
                .then(resp => {
                    console.log("After saving in the server " + res);
                    res.status(201).json({
                    message:'User Created',
                    result: resp
                    })
                })
            .catch(err => {
               res.status(500).json({
               error: err
             })
         });
    })
});
    

router.post("/login", (req, res, next) => {

});

module.exports = router;
