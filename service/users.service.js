const User = require('../model/users.model');

// get all users
const getAllUsersServices = async (query) => {
    const users = await User.find(query).sort({
        createdAt: -1,
        updatedAt: -1,
    });
    return users;
};

const signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
};
const updateUserByEmail = async (email, data) => {
    return await User.updateOne(
        { email: email },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteUserByIdService = async (email) => {
    const result = await User.deleteOne({ email: email });
    return result;
};

module.exports = {
    getAllUsersServices,
    signupService,
    findUserByEmail,
    updateUserByEmail,
    deleteUserByIdService,
};
