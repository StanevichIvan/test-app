const jwt = require('jsonwebtoken');
const config =  require('../config');

const checkAuth = (req, res, next) => {
    const token = req.headers['token'];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
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
