const verifyToken = require('./auth');
const apiResponse = require('./apiResponse');

const middlewares = {
    auth: verifyToken,
    apiResponse,
};

module.exports = middlewares;
