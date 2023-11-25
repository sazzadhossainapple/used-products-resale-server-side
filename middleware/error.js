const { GeneralError } = require('../utils/error');

const handleErrors = async (err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
    }

    // const error: err.stack.split("\n")[1].trim();

    let correlationId = req.headers['x-correlation-id'];

    return res.status(code).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: {
            stack: err.stack,
            correlationId,
        },
    });
};

module.exports = handleErrors;
