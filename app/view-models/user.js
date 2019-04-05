const updateUserViewModel = (userModel) => {
    return {
        name: userModel.name,
        id: userModel.id
    };
};

module.exports = {
    updateUserViewModel
};
