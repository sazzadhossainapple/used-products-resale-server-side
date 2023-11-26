const userController = require('./users.controller');
const productCategoryController = require('./productCategory.controller');
const productController = require('./product.controller');

const controllers = {
    userController: userController,
    productCategoryController: productCategoryController,
    productController: productController,
};

module.exports = controllers;
