export const errorHandler = (res, statusCode, message,  data) => {
    return res.status(statusCode).json({
        status: false,
        message: message,
        // error: error,
        ...data
    })
}