const jwt = require('jsonwebtoken');
const asyncWrapper = require('./asyncWrapper');
const { GeneralError } = require('../utils/error');

/**
 * Middleware: Verify Bearer Token to check User Authentication
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns
 */
const verifyToken = asyncWrapper((req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        throw new GeneralError('Please provide authentication token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError)
            throw new GeneralError('Sorry! Invalid Token!!');
        else throw new GeneralError('Sorry! Something went wrong!!');
    }

    return next();
});

const extractToken = (req) => {
    let token = null;
    if (
        (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') ||
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token']
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    return token;
};

module.exports = verifyToken;
