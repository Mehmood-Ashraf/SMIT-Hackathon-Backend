export const successHandler = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        status: true,
        message: message,
        data: data,
    })
}

