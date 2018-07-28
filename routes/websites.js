const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Website = require('../models/Website');
const User = require('../models/User');

router.get('/list',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let pureToken = req.get('Authorization').slice(7)
        let user = jwt.verify(pureToken, process.env.SECRET);
        Website.findAll({
                where: {
                    userId: user.id
                }
            })
            .then(websites => {
                res.json(websites)
            })
            .catch(err => res.status(400).json(err));
    });

router.post('/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let pureToken = req.get('Authorization').slice(7)
        let currentUser = jwt.verify(pureToken, process.env.SECRET);

        const newWebsite = {
            name: req.body.name,
            url: req.body.url
        }

        User.findOne({
                where: {
                    id: currentUser.id
                }
            })
            .then(user => {
                if (!user) return res.status(404).json({ msg: 'User not found' });
                Website.find({
                        where: {
                            url: newWebsite.url,
                            userId: currentUser.id
                        }
                    })
                    .then(website => {
                        if (website) return res.status(400).json({ msg: 'Website already added' });
                        Website.create(newWebsite)
                            .then(website => {
                                website.setUser(currentUser.id)
                                return res.json(website);
                            })
                            .catch(err => res.status(400).json(err));
                    })
            })
    });



module.exports = router;