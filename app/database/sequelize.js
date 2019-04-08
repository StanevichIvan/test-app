const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const OrderModel = require('../models/order');
const BookModel = require('../models/book');
const BookAuthorModel = require('../models/book-author');

const sequelize = new Sequelize(process.env.PG_DB_NAME, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
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
