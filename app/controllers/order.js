const { Order } = require('../database/sequelize');

const getOrder = (req, res) => {
    const { params } = req;

    Order.findByPk(params.id).then(order => {
        if (!order) {
            res.status(404).send();
            return;
        }

        res.send(order);
    });
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
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send());
};

module.exports = {
    getOrder,
    createOrder,
    deleteOrderById
};
