module.exports = (sequelize, type) => {
    const Book = sequelize.define('book', {
        title: type.STRING
    });

    return Book;
};
