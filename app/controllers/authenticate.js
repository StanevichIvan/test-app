const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database/sequelize');
const errorMessages = require('../contants/error-message');

const jwtSecret = 'secret';
const expiryTime = 96000;

const authenticate = (req, res) => {
    const params = req.body;

    User.findOne({
        where: {
            name: params.name
        },
        raw: true
    }).then(user => {
        if (!user) {
            res.status(403).send({ err: errorMessages.AUTH_USER_NOT_FOUND });
            return;
        }

        bcrypt.compare(params.password, user.password, function(err) {
            if (err) {
                res.status(403).send({ err: errorMessages.AUTH_WRONG_PASSWORD });
            }

            const payload = {
                name: user.name,
                id: user.id,
                time: new Date()
            };
            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: expiryTime
            });
            res.send({ token });
        });
    });
};

module.exports = {
    authenticate
};
