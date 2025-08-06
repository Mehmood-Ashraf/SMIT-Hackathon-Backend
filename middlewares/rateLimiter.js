import rateLimit from "express-rate-limit";

const defaultMessage = "You have exceeded the allowed number of requests. Please wait a moment and try again.";

export const rateLimiter = (time, maxRequests, customMessage = defaultMessage) => {
    return rateLimit({
        windowMs : time,
        max : maxRequests,
        message : {
            status : false,
            message : customMessage,
            data : null
        },
        standardHeaders: true,
        legacyHeaders : false

    })
}