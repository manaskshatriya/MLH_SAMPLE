const options = {
    httpOnly: true,
    maxAge: process.env.TOKEN_EXPIRY,
    path: '/',
    secure: true,
    signed: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict'
}

function sendCookie(res, cookies, path) {
    for (const key in cookies) {
        res.cookie(key, cookies[key], { ...options, path: path ? process.env.FRONTEND_URL + path : '/' })
    }
    return res
}

function clearCookie(res, key, path) {
    res.clearCookie(key, { ...options, path })
    return res
}

export {
    sendCookie,
    clearCookie
}