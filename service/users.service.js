const User = require('../model/users.model');

// get all users
const getAllUsersServices = async (filters, queries) => {
    const users = await User.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort({
            createdAt: -1,
            updatedAt: -1,
        });
    const totalUserLists = await User.countDocuments(filters);
    const page = Math.ceil(totalUserLists / queries.limit);
    return { totalUserLists, page, users };
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
