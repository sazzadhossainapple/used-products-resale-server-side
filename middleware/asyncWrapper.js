const asyncWrapper = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err, req, res));
};

module.exports = asyncWrapper;
