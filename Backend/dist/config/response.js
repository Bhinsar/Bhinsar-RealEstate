"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedResponse = exports.notFoundResponse = exports.errorResponse = exports.createdResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = "Success", statusCode = 200) => {
    const response = {
        status: "success",
        message,
        data,
        statusCode,
    };
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const createdResponse = (res, data, message = "Created", statusCode = 201) => {
    const response = {
        status: "success",
        message,
        data,
        statusCode,
    };
    return res.status(statusCode).json(response);
};
exports.createdResponse = createdResponse;
const errorResponse = (res, error, message = "Error", statusCode = 500) => {
    if (error?.name === "ZodError") {
        statusCode = 400;
        message = "Invalid Input";
        error = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code,
        }));
    }
    else if (error instanceof Error) {
        message = error.message;
        if ("statusCode" in error) {
            statusCode = error.statusCode;
        }
    }
    else {
        message = "Something went wrong";
    }
    const response = {
        status: "error",
        message,
        error,
        statusCode,
    };
    return res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
const notFoundResponse = (res, message = "Resource not found", statusCode = 404) => {
    const response = {
        status: "error",
        message,
        statusCode,
    };
    return res.status(statusCode).json(response);
};
exports.notFoundResponse = notFoundResponse;
const unauthorizedResponse = (res, message = "Unauthorized access", statusCode = 401) => {
    const response = {
        status: "error",
        message,
        statusCode,
    };
    return res.status(statusCode).json(response);
};
exports.unauthorizedResponse = unauthorizedResponse;
//# sourceMappingURL=response.js.map