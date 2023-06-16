import { Router } from 'express';
import { adminController } from '../../controllers/index.js';

const adminRouter = Router()

function createAdminRouter(adminServices, docServices, middlewares, adminValidations) {
    const { registrationLimiter, validator } = middlewares
    const { adminLoginValidation, createAdminValidation, verifyAdminTicket, verifyAdminValidation } = adminValidations
    const { loginAdmin, verifyAdminLogin } = adminController(adminServices, docServices)
    adminRouter.get('/verify', verifyAdminTicket(), validator, verifyAdminLogin)
    adminRouter.use(registrationLimiter)
    adminRouter.post('/login', adminLoginValidation(), validator, loginAdmin)

    return adminRouter
}

export default createAdminRouter;