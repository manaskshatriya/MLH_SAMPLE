import { AppError } from '../utils/index.js';

function undefinedRoute(req, res, next) {
    const err = new AppError(404, 'fail', 'undefined route')
    next(err, req, res, next)
}

export default undefinedRoute;