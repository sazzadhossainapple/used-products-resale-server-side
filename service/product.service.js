const Product = require('../model/product.model');

// get all product
const getAllProduct = async (filters, queries) => {
    const product = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort({
            createdAt: -1,
            updatedAt: -1,
        });
    const totalProduct = await Product.countDocuments(filters);
    const page = Math.ceil(totalProduct / queries.limit);
    return { totalProduct, page, product };
};

const productCreate = async (project) => {
    const product = await Product.create(project);
    return product;
};

const findProductBySlug = async (id) => {
    return await Product.findOne({ product_slug: id });
};
const updateProduct = async (id, data) => {
    return await Product.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteProduct = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllProduct,
    findProductBySlug,
    productCreate,
    deleteProduct,
    updateProduct,
};
