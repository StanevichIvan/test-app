module.exports = (sequelize, type) => {
    const Order = sequelize.define('order', {
        title: type.STRING
    });

    return Order;
};
