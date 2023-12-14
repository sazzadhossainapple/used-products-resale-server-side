const asyncWrapper = require('../middleware/asyncWrapper');
const {
    getAllProduct,
    findProductBySlug,
    productCreate,
    updateProduct,
    deleteProduct,
} = require('../service/product.service');
const ProductCategory = require('../model/productCategory.model');

const { GeneralError } = require('../utils/error');

/**
 * get all product
 *
 * URI: /api/products
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

    if (req.query.catagory_slug) {
        queries.catagory_slug = new RegExp(queries.catagory_slug, 'i');
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
 * create product
 *
 * URI: /api/products
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const store = asyncWrapper(async (req, res, next) => {
    const {
        catagory_slug,
        productName,
        resalePrice,
        orginalPrice,
        useYear,
        location,
        phoneNumber,
        productImage,
        condition,
        description,
    } = req.body;
    const { UserName, email, userImage } = req.user;
    const product_slug = productName.toLowerCase().replace(/\s+/g, '-');

    const product = await productCreate({
        productName,
        catagory_slug,
        product_slug,
        resalePrice,
        orginalPrice,
        useYear,
        location,
        phoneNumber,
        productImage,
        condition,
        description,
        sellerName: UserName,
        email: email,
        sellerImage: userImage,
    });

    res.success(product, 'Product create succssfully');
});

/**
 * get by product id
 *
 * URI: /api/products/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const getBySlug = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const product = await findProductBySlug(id);
    console.log(product);
    // const productCategory = await ProductCategory.findOne({ slug: id })

    res.success(product, 'Product successfully');
});

/**
 * update product
 *
 * URI: /api/products/:id
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */

const update = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const {
        catagory_slug,
        productName,
        resalePrice,
        orginalPrice,
        useYear,
        location,
        phoneNumber,
        productImage,
        condition,
        description,
    } = req.body;
    const { UserName, email, userImage } = req.user;
    const product_slug = productName.toLowerCase().replace(/\s+/g, '-');

    const updateData = {
        productName,
        catagory_slug,
        product_slug,
        resalePrice,
        orginalPrice,
        useYear,
        location,
        phoneNumber,
        productImage,
        condition,
        description,
        sellerName: UserName,
        email: email,
        sellerImage: userImage,
    };

    const result = await updateProduct(id, updateData);

    res.success(result, 'Product update successfully');
});

/**
 * delete product
 *
 * URI: /api/products/:id
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
    getBySlug,
};

//import mongoose from 'mongoose';
// const store = asyncWrapper(async (req, res, next) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         // Destructuring values from req.body and req.user
//         const {
//             catagory_slug,
//             productName,
//             resalePrice,
//             orginalPrice,
//             useYear,
//             location,
//             phoneNumber,
//             productImage,
//             condition,
//             description,
//         } = req.body;
//         const { UserName, email, userImage, role } = req.user;

//         // Creating a product_slug based on productName
//         const product_slug = productName.toLowerCase().replace(/\s+/g, '-');

//         // Checking if the user has the role "Seller"
//         if (role !== 'Seller') {
//             throw new GeneralError('Your role is not a seller.');
//         }

//         // Creating a product using the productCreate function
//         const product = await productCreate({
//             productName,
//             catagory_slug,
//             product_slug,
//             resalePrice,
//             orginalPrice,
//             useYear,
//             location,
//             phoneNumber,
//             productImage,
//             condition,
//             description,
//             sellerName: UserName,
//             email,
//             sellerImage: userImage,
//         });

//         // Creating a buyerBook entry
//         const buyerBookEntry = await createBuyerBookEntry({
//             productId: product._id,
//             buyerName: 'BuyerName', // Replace with actual buyer data
//             // Include other buyerBook data
//         });

//         // If everything is successful, commit the transaction
//         await session.commitTransaction();
//         session.endSession();

//         // Responding with a success message and the created product
//         res.success(product, 'Product created successfully');
//     } catch (error) {
//         // If any error occurs, abort the transaction
//         await session.abortTransaction();
//         session.endSession();

//         // Handle the error (e.g., log it or send an appropriate response)
//         next(error);
//     }
// });

// // Function to create a buyerBook entry (replace with your actual schema and model)
// async function createBuyerBookEntry(buyerBookData) {
//     const buyerBookEntry = await BuyerBook.create(buyerBookData);
//     return buyerBookEntry;
// }
