// api/users.js
const express = require('express');
const router = express.Router();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const { getAllUsers, getUserByUsername } = require('../db');

router.use((req, res, next) => {
    console.log('A request is being made to /users');
    
    next();
});

router.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    });
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next ({
            name: 'MissingCredentialsError',
            message: 'Please supply both a username and password'
        });
    }

    try {
        const user = await getUserByUsername(username);

        if (user && user.password === password) {
            const token = jwt.sign(user, JWT_SECRET)
            res.send({ message: `You're logged in!`, token: `${token}` });
        } else {
            next({
                name: 'IncorrectCredentialError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(error) {
        console.error(error);
        next.error;
    }
});

module.exports = router;