const jwt = require('jsonwebtoken');
const config =  require('../config');
const errorMessages = require('../contants/error-message');

const checkAuth = (req, res, next) => {
    const token = req.headers['token'];

    if (!token) {
        return res.status(403).send({ auth: false, message: errorMessages.NO_TOKEN });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, message: errorMessages.INVALID_TOKEN });
        }
        req.user = {
            name: decoded.name,
            id: decoded.id
        };
        next();
    });
};

module.exports = {
    checkAuth
};
