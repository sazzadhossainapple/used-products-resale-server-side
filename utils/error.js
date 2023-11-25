class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() {
        return 400;
    }
}

class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }
    getCode() {
        return 400;
    }
}

class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }
    getCode() {
        return 404;
    }
}

class ValidationError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
    getCode() {
        return 403;
    }
}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    ValidationError,
};
