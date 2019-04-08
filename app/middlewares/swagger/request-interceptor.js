module.exports = (req, res, next) => {
    if(req.swaggerValidation && req.swaggerValidation.isSwaggerValidationError) {
        res.status(403).send(req.swaggerValidation.errors);
        return;
    }
    next();
};
