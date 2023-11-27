const userController = require('./users.controller');
const productCategoryController = require('./productCategory.controller');
const productController = require('./product.controller');
const buyerBookProductController = require('./buyerBookProduct.controller');

const controllers = {
    userController: userController,
    productCategoryController: productCategoryController,
    productController: productController,
    buyerBookProductController: buyerBookProductController,
};

module.exports = controllers;
