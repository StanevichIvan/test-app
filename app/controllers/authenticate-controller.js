const { User } = require('../database/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';

const authenticate = (req, res) => {
    const params = req.body;
    console.log(params);

    User.findOne({
        where: {
            name: params.name
        },
        raw: true
    }).then(user => {
        if (!user) {
            res.send('Authentication failed. User not found.');
            return;
        }

        bcrypt.compare(params.password, user.password, function(err, isValid) {
            if (err) {
                res.send('Authentication failed. Wrong password.');
            }

            const payload = {
                name: user.name,
                id: user.id,
                time: new Date()
            };
            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: 96000
            });
            res.send({ token });
        });
    });
};

module.exports = {
    authenticate
};
