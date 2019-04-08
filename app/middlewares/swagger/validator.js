const validator = require('swagger-express-validator');
const util = require('util');
const swaggerDocument = require('../../swagger.json');

const validateRequest = (req, data, errors) => {
    req.swaggerValidation = {
        isSwaggerValidationError: true,
        errors
    };
};

const options = {
    schema: swaggerDocument,
    validateRequest: true,
    validateResponse: true,
    requestValidationFn: validateRequest,
};

module.exports = validator(options);
