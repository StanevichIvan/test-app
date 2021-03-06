require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const userRoutesUnauthorizated = require('./routes/users-unauthorizated');
const userRoutesAuthorizated = require('./routes/users-authorizated.js');
const userOrders = require('./routes/user-orders');
const authenticate = require('./routes/authenticate');
const orderRoutes = require('./routes/order');
const { checkAuth } = require('./middlewares/auth');
const swaggerValidator = require('./middlewares/swagger/validator');
const swaggerRequestInterceptor = require('./middlewares/swagger/request-interceptor');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(swaggerValidator);
app.use(swaggerRequestInterceptor);
app.use('/authenticate', authenticate);
app.use('/users', userRoutesUnauthorizated);
app.use(checkAuth);
app.use('/users', userRoutesAuthorizated);
app.use('/users', userOrders);
app.use('/orders', orderRoutes);

module.exports = app;
