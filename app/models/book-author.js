module.exports = (sequelize, type) => {
    const BookAuthor = sequelize.define('book_author', {
        name: type.STRING
    });

    return BookAuthor;
};
