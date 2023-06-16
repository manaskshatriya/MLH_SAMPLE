// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
function globalError(err, _, res, __) {
    if(!(err instanceof Object)) {
        err = new Error(err)
    }
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
        data: null
    })
}

export default globalError;