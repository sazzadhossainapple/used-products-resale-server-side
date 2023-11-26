const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllProduct,
    createProduct,
    findProductBySlug,
    updateProductCategory,
    deleteProductCategory,
} = require('../service/productCategory.service');
const { GeneralError } = require('../utils/error');

/**
 * get all product category
 *
 * URI: /api/allcatagory
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const index = asyncWrapper(async (req, res, next) => {
    const category = await getAllProduct({});
    res.success(category, 'Product category successfully');
});

/**
 * create product category
 *
 * URI: /api/allcatagory
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const { catagoryName } = req.body;
    const slug = catagoryName.toLowerCase().replace(/\s+/g, '-');

    const category = await createProduct({ catagoryName, slug });

    res.success(category, 'Product category create succssfully');
});

/**
 * get by product id
 *
 * URI: /api/allcatagory/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const product = await findProductBySlug(id);

    res.success(product, 'Product category successfully');
});

/**
 * update product
 *
 * URI: /api/allcatagory/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { catagoryName, status } = req.body;
    const slug = catagoryName.toLowerCase().replace(/\s+/g, '-');

    const updateData = { catagoryName, slug, status };

    const result = await updateProductCategory(id, updateData);

    res.success(result, 'Product update successfully');
});

/**
 * delete product category
 *
 * URI: /api/allcatagory/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const destroy = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const result = await deleteProductCategory(id);
    if (!result.deletedCount) {
        throw new GeneralError("Could't delete the product category");
    }

    res.success(result, 'Product category delete successfully.');
});

module.exports = {
    index,
    store,
    destroy,
    update,
    getBySlug,
};
