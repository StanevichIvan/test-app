const { Order } = require('../database/sequelize');

const getOrder = (req, res) => {
    const { params } = req;
    Order.findByPk(params.id).then(users => res.json(users));
};

const createOrder = (req, res) => {
    const content = req.body;
    content.userId = req.user.id;
    Order.create(content).then(user => res.send(user));
};

const deleteOrderById = (req, res) => {
    const { params } = req;
    Order.findByPk(params.id)
        .then(order => order.destroy())
        .then(() => res.send({deleted: true}))
        .catch(err => res.send(err));
};

module.exports = {
    getOrder,
    createOrder,
    deleteOrderById
};
