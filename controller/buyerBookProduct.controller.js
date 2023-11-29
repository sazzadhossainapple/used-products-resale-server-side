const asyncWrapper = require('../middleware/asyncWrapper');
const {
    findProductBy,
    deleteProduct,
    buyerProductCreate,
    getAllProduct,
    getAllUserProduct,
} = require('../service/buyerBookProduct.service');

const { GeneralError } = require('../utils/error');

/**
 * get all user product
 *
 * URI: /api/product-list
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    let filters = { ...req.query };

    //  page, limit, -> exclude
    const excludeFields = ['page', 'limit'];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queries.fields = fields;
    }

    if (req.query.email) {
        queries.email = new RegExp(queries.email, 'i');
    }

    if (req.query.page) {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * parseInt(limit);
        queries.skip = skip;
        queries.limit = parseInt(limit);
    }

    const product = await getAllProduct(filters, queries);

    res.success(product, 'Product successfully');
});

/**
 * get all request user product
 *
 * URI: /api/product-list/user
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const indexByUser = asyncWrapper(async (req, res, next) => {
    let filters = { ...req.query };

    //  page, limit, -> exclude
    const excludeFields = ['page', 'limit'];
    excludeFields.forEach((field) => delete filters[field]);

    if (req.user.email) {
        filters.email = req.user.email;
    }

    const queries = {};

    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queries.fields = fields;
    }

    if (req.query.page) {
        const { page = 1, limit = 6 } = req.query;
        const skip = (page - 1) * parseInt(limit);
        queries.skip = skip;
        queries.limit = parseInt(limit);
    }

    const product = await getAllUserProduct(filters, queries);

    res.success(product, 'Product successfully');
});

/**
 * create product
 *
 * URI: /api/product-list
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const {
        bookingId,
        itemName,
        price,
        phone,
        location,
        productImage,
        transactionId,
        isSaleStatus,
    } = req.body;
    const { UserName, email } = req.user;

    const product = await buyerProductCreate({
        bookingId,
        name: UserName,
        email: email,
        itemName,
        price,
        phone,
        location,
        productImage,
        transactionId,
        isSaleStatus,
    });

    res.success(product, 'Product added succssfully');
});

/**
 * get by product id
 *
 * URI: /api/product-list/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const product = await findProductBy(id);

    res.success(product, 'Product successfully');
});

/**
 * update product
 *
 * URI:/api/product-list/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const {
        bookingId,
        itemName,
        price,
        phone,
        location,
        productImage,
        transactionId,
        isSaleStatus,
    } = req.body;
    const { UserName, email } = req.user;

    const updateData = {
        bookingId,
        name: UserName,
        email: email,
        itemName,
        price,
        phone,
        location,
        productImage,
        transactionId,
        isSaleStatus,
    };

    const result = await updateProduct(id, updateData);

    res.success(result, 'Product update successfully');
});

/**
 * delete product
 *
 * URI: /api/product-list/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteProduct(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the product.");
    }

    res.success(result, 'Product delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getById,
    indexByUser,
};
