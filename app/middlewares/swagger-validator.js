const validator = require('swagger-express-validator');
const util = require('util');
const swaggerDocument = require('../swagger.json');

const validateRequest = (req, data, errors) => {
    console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
};

const validateResponse = (req, data, errors) => {
    console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
};

const options = {
    schema: swaggerDocument,
    validateRequest: true,
    validateResponse: true,
    requestValidationFn: validateRequest,
    responseValidationFn: validateResponse,
};

module.exports = validator(options);
