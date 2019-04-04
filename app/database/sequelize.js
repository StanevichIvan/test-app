const Sequelize = require('sequelize');
const config = require('../config');
const UserModel = require('../models/user');
const OrderModel = require('../models/order');
const BookModel = require('../models/book');
const BookAuthorModel = require('../models/book-author');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: config.host,
    port: config.db_port,
});

const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
User.hasMany(Order);

const Book = BookModel(sequelize, Sequelize);
const BookAuthor = BookAuthorModel(sequelize, Sequelize);

Book.belongsToMany(BookAuthor, {through: 'book_users', unique: false});
BookAuthor.belongsToMany(Book, {through: 'book_users', unique: false});
Book.belongsTo(Order);

const sequelizeConfig = { force: false };
sequelize.sync(sequelizeConfig)
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User,
    Order
};
