import { AppError, verifyToken } from '../utils/index.js';

function protectRoute(adminServices) {

  async function verifyAdminLogin(req, _, next) {
    try {
      const { token } = req.signedCookies.admin_data
      if (!token) {
        throw new AppError(401, 'fail', 'You are not logged in! Please login in to continue')
      }
      const decode = verifyToken(token)
      const result = await adminServices.findAdmin(decode.username)
      if (!result) throw new AppError(404, 'fail', 'Invalid token, please login again')
      next()
    } catch (err) { next(err) }
  }

  return {
    verifyAdminLogin,
  }
}

export default protectRoute;