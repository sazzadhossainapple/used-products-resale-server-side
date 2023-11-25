const apiResponse = (req, res, next) => {
    res.success = function (data, message = null) {
        res.json({
            success: true,
            message,
            data,
        });
    };

    next();
};

module.exports = apiResponse;
