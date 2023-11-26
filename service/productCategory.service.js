const ProductCategory = require('../model/productCategory.model');

// get all product category
const getAllProduct = async (query) => {
    const category = await ProductCategory.find(query).sort({
        createdAt: -1,
        updatedAt: -1,
    });
    return category;
};

const createProduct = async (project) => {
    const category = await ProductCategory.create(project);
    return category;
};

const findProductBySlug = async (id) => {
    return await ProductCategory.findOne({ slug: id });
};
const updateProductCategory = async (id, data) => {
    return await ProductCategory.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteProductCategory = async (id) => {
    const result = await ProductCategory.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllProduct,
    findProductBySlug,
    createProduct,
    deleteProductCategory,
    updateProductCategory,
};
