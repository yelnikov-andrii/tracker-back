import { ApiError } from "./ApiError.js"

export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof ApiError) {
        const { status, message, errors } = error;
        res.status(status).send({message, errors});
        return;
    }

    console.error(error);

    res.status(500).send({message: 'unexpected error'});
}