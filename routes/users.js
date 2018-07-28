const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

router.post('/register', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
            where: { email: newUser.email }
        })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            User.create(newUser)
                .then(user => {
                    res.json(user)
                })
        })
        .catch(err => res.status(400).json({ msg: 'bad request' }))
});

router.post('/login', (req, res) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
            where: {
                email: userInfo.email
            }
        })
        .then(user => {
            if (!user) return res.status(404).json({ msg: 'Email not found' })
            bcrypt.compare(userInfo.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }

                        jwt.sign(payload,
                            process.env.SECRET, { expiresIn: '1h' },
                            (err, token) => {
                                if (err);
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                })
                            })
                    } else {
                        return res.status(401).json({ msg: 'Invalid password' });
                    }
                })
        })
})


module.exports = router;