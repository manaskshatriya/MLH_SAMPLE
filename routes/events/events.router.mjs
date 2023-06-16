import { Router } from 'express';
import { getRegistrationsController, createRegistrationsController } from '../../controllers/index.js';

const eventsRouter = Router()

function createEventsRouter(eventsServices, filesServices, emailService, middlewares, eventsValidations, adminValidations , docServices) {
    const { registrationLimiter, verifyAdminLogin, validator, memberIDParser, formDataParser } = middlewares
    const { getPaymentValidation, ticketValidation, getRegistrationValidation, paymentValidation, fileValidation, eventNameParamValidation, getUserRegistrationValidation, projectValidation, memberValidation, collegeValidation, verifyPICTOrPayments } = eventsValidations
    const { verifyAdminValidation } = adminValidations
    const { getPaymentDetails, getTicketDetails, getUserIDFile, getUserRegistration, getRegistration, getRegistrations, getPendingPayments, getSynopsis } = getRegistrationsController(eventsServices, filesServices , docServices)
    const { saveProject, insertMember, saveCollegeDetails, requestRegistration, verifyPendingPayment , updateProject , insertInternalPICT } = createRegistrationsController(eventsServices, filesServices, emailService)
    eventsRouter.get('/registrations/:event_name', getRegistrations)
    eventsRouter.get('/verify/:event_name', eventNameParamValidation(), getPaymentValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, getPaymentDetails)
    eventsRouter.get('/verify/file', fileValidation(), verifyAdminValidation(6), validator, verifyAdminLogin, getUserIDFile)
    eventsRouter.get('/verify/payment/:event_name', eventNameParamValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, getPendingPayments)
    eventsRouter.post('/verify/payment/:event_name', eventNameParamValidation(), paymentValidation(), verifyAdminValidation(3), validator, verifyAdminLogin, verifyPendingPayment)
    eventsRouter.get('/verify/registration', getRegistrationValidation(), validator, getRegistration)
    eventsRouter.get('/:event_name/synopsis' , getSynopsis )
    eventsRouter.get('/verify/user/:event_name', eventNameParamValidation(), getUserRegistrationValidation(), validator, getUserRegistration)
    eventsRouter.get('/verify/ticket', ticketValidation(), validator, getTicketDetails)
    eventsRouter.patch('/:event_name/:pid', verifyAdminValidation(2), validator, verifyAdminLogin, updateProject)
    eventsRouter.post('/:event_name/internal', insertInternalPICT)
    eventsRouter.use(registrationLimiter)
    eventsRouter.post('/:event_name/step_1', eventNameParamValidation(), projectValidation(), validator, saveProject)
    eventsRouter.post('/:event_name/step_2', memberIDParser, formDataParser, eventNameParamValidation(), ticketValidation(), memberValidation(), validator, insertMember)
    eventsRouter.post('/:event_name/step_3', eventNameParamValidation(), ticketValidation(), collegeValidation(), validator, saveCollegeDetails)
    eventsRouter.post('/:event_name/step_4', eventNameParamValidation(), ticketValidation(), verifyPICTOrPayments(), validator, requestRegistration)

    return eventsRouter
}

export default createEventsRouter;