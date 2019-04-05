const { User, Order } = require('../database/sequelize');
const { updateUserViewModel } = require('../view-models/user');

const getAllUsers = (req, res) => {
    User.findAll().then(users => res.json(users));
};

const createUser = (req, res) => {
    const content = req.body;

    User.create(content).then(user => res.send({
        user: {
            id: user.id,
            name: user.name
        }
    }));
};

const getUserById = (req, res) => {
    const { params }= req;

    User.findByPk(params.id)
        .then(user => {
            if (!user) {
                res.status(404);
            }
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
};

const deleteUserById = (req, res) => {
    const { params }= req;

    User.findByPk(params.id)
        .then(user => {
            if (user) {
                user.destroy();
            } else {
                throw new Error();
            }
        })
        .then(user => {
            res.send(user);
        })
        .catch(() => res.status(404).send({ err: 'user not found'}));
};

const updateUser = (req, res) => {
    const { body } = req;

    User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                res.send(404);
                return;
            }
            return user.update(body);
        })
        .then(user => {
            res.send(updateUserViewModel(user));
        });
};

const getUserOrders = (req, res) => {
    const userId = req.user.id;

    Order.findAll({
        where: {
            userId: userId
        }
    }).then(orders => res.send(orders));
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    getUserOrders,
    updateUser
};
