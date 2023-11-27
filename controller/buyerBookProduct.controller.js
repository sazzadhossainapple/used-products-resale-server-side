const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllProductList,
    findProductBy,
    deleteProduct,
    buyerProductCreate,
} = require('../service/buyerBookProduct.service');

const { GeneralError } = require('../utils/error');

/**
 * get all user product
 *
 * URI: /api/users/product
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    let filters = { ...req.query };

    console.log(filters);

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

    const product = await getAllProductList(filters, queries);

    res.success(product, 'Product successfully');
});

/**
 * create product
 *
 * URI: /api/users/product
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
 * URI: /api/users/product/:id
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
 * URI:/api/users/product/:id
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
 * URI: /api/users/products/:id
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
};
