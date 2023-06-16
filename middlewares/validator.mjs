import { validationResult } from 'express-validator';
import { AppError } from '../utils/index.js';

function validator(req, _, next) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    next(new AppError(422, 'fail', extractedErrors))
}

export default validator;