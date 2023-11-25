const asyncWrapper = require('../middleware/asyncWrapper');

const {
    getAllUsersServices,
    signupService,
    findUserByEmail,
    updateUserByEmail,
    deleteUserByIdService,
} = require('../service/users.service');
const { generateToken } = require('../utils/token');
const { GeneralError } = require('../utils/error');

/**
 * get all users
 *
 * URI: /api/users
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    const users = await getAllUsersServices({});
    res.success(users, 'Users successfully');
});

/**
 * create user
 *
 * URI: /api/users
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { UserName, email, userImage } = req.body;

    const oldUser = await findUserByEmail(email);

    if (oldUser) {
        throw new GeneralError('User Already Exists.');
    }
    const user = await signupService({ UserName, email, userImage });

    res.success(user, 'User create succssfully');
});

/**
 * update users
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { email } = req.params;
    const { status, name } = req.body;

    const updateData = { status, name };

    const result = await updateUserByEmail(email, updateData);

    res.success(result, 'User update successfully');
});

/**
 * update users
 *
 * URI: /api/users/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { email } = req.params;
    const result = await deleteUserByIdService(email);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the user");
    }

    res.success(result, 'User delete successfully.');
});

/**
 * get by user email
 *
 * URI: /api/users/:email
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getByEmamil = asyncWrapper(async (req, res, next) => {
    const { email } = req.params;
    const user = await findUserByEmail(email);

    res.success(user, 'User successfully');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getByEmamil,
};
