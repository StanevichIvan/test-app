const bcrypt = require('bcrypt');

const passwordEncryptHook = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 2, function(err, hash) {
            if (err) {
                reject(err);
            }

            resolve(Object.assign(user, { password: hash }));
        });
    });
};

module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: type.STRING,
        password: type.STRING
    });

    User.beforeCreate(passwordEncryptHook);
    User.beforeUpdate(passwordEncryptHook);

    return User;
};
