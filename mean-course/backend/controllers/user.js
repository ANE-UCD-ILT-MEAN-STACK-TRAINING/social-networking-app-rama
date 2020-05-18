const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
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
                message: "Signup failed!"
             })
         });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    //Validate the incoming credentials with DB
    User.findOne({ email: req.body.email})
        .then(user => {
            if(!user) {
            return res.status(401).json({
            message: "Authentication Failed!!!"
            });
         }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
    .then(result => {
        if(!result) {
            return res.status(401).json({
            message: "Authentication Failed!!!"
            });
        }
    
    const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
        },
        "test_secret_key",
        {
        expiresIn: "1h"
        }
    );
    console.log("Token from user.jjs..");
    console.log(token);

    res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        });
    });
}