const express = require('express');
const router = express.Router();

const userRoute = require('./users.route');
const productCategoryRoute = require('./productCategory.route');
const productRoute = require('./product.route');

const routes = [
    { path: '/users', handler: userRoute },
    { path: '/allcatagory', handler: productCategoryRoute },
    { path: '/products', handler: productRoute },
];

routes.map((route) => router.use(route?.path, route?.handler));

const configureRoutes = (app) => app.use('/api', router);

module.exports = configureRoutes;
