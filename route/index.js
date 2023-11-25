const express = require('express');
const router = express.Router();

const userRoute = require('./users.route');
// const projectCategoryRoute = require('./projectCategory.route');

const routes = [
    { path: '/users', handler: userRoute },
    // { path: '/project-category', handler: projectCategoryRoute },
];

routes.map((route) => router.use(route?.path, route?.handler));

const configureRoutes = (app) => app.use('/api', router);

module.exports = configureRoutes;
