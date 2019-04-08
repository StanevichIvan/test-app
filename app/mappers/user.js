const userViewMapper = (userModel) => {
    return {
        name: userModel.name,
        id: userModel.id
    };
};

module.exports = {
    userViewMapper
};
