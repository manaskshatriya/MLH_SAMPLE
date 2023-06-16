import {
  AppError,
  createToken,
  verifyToken,
  sendCookie,
  clearCookie,
} from "../../utils/index.js";

function adminController(adminServices, docServices, judgeServices) {
  async function loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await adminServices.findAdmin(username);
      if (!user)
        throw new AppError(404, "fail", "Admin account does not exist");
      if (user.password !== password) {
        res = await clearCookie(res, "admin_data");
        throw new AppError(403, "fail", "Invalid Credentials");
      }
      const token = createToken({ username });
      // if (user.roles.includes("JUDGE")) {
      //   const judge = await judgeServices.findJudge({ email: user.email })
      //   if (!judge) throw new AppError(404, "fail", "Judge account not found")
      //   var { jid } = judge
      //   sendCookie(res, { admin_data: { token, roles: user.roles } })
      //     .status(200)
      //     .json({ roles: user.roles, jid })
      //   return
      // }
      sendCookie(res, { admin_data: { token, roles: user.roles } })
        .status(200)
        .end()
    } catch (err) { next(err) }
  }

  async function verifyAdminLogin(req, res, next) {
    try {
      const { token } = req.signedCookies.admin_data;
      const decode = verifyToken(token);
      const result = await adminServices.findAdmin(decode.username);
      if (!result)
        throw new AppError(404, "fail", "Invalid token, please login again");
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  return {
    loginAdmin,
    verifyAdminLogin,
  };
}

export default adminController;
