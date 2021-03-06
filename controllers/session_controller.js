const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    console.log(req.body)
    User.findOne({ username:req.body.username }, (error, foundUser) => {
        if(foundUser === null){
            console.log(error)
            res.json({
                error :'Username and password combination does not match.'
            });
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
                req.session.user = foundUser;
                res.json(foundUser)
            } else {
                console.log(error)
                res.json({
                    error :'Username and password combination does not match.'
                });
            }
        }
    });
});

router.get('/', (req, res) => {
    console.log(req.session)
    res.json(req.session.user);
});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.json({
            destroyed:true
        });
    })
});

module.exports = router;
