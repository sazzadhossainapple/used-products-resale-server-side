const BuyerBookProduct = require('../model/buyerBookProduct.model');

// get all product
const getAllProductList = async (filters, queries) => {
    const product = await BuyerBookProduct.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort({
            createdAt: -1,
            updatedAt: -1,
        });

    const totalProduct = await BuyerBookProduct.countDocuments(filters);
    const page = Math.ceil(totalProduct / queries.limit);
    return { totalProduct, page, product };
};

const buyerProductCreate = async (project) => {
    const product = await BuyerBookProduct.create(project);
    return product;
};

const findProductBy = async (id) => {
    return await BuyerBookProduct.findOne({ _id: id });
};
const updateProduct = async (id, data) => {
    return await BuyerBookProduct.updateOne(
        { _id: id },
        { $set: data },
        {
            runValidators: true,
        }
    );
};

// delete by id
const deleteProduct = async (id) => {
    const result = await BuyerBookProduct.deleteOne({ _id: id });
    return result;
};

module.exports = {
    getAllProductList,
    findProductBy,
    buyerProductCreate,
    deleteProduct,
    updateProduct,
};
