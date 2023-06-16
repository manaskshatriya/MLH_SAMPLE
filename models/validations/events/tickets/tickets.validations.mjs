import { body, cookie, oneOf, param, query } from 'express-validator';
import { eventsName } from '../../../../static/eventsData.mjs';

function ticketValidation() {
    return [
        cookie('ticket', 'Error while handling ticket').if(param('event_name').equals(eventsName[2])).optional({ checkFalsy: true }).escape().isAlphanumeric('en-US', { ignore: '-' }).withMessage('Invalid ticket in cookies'),
    ]
}

function getPaymentValidation() {
    return [
        query('pid', 'Error while handling query').trim().isLength({ min: 6, max: 6 }).isAlphanumeric('en-US', { ignore: '-' }).escape().withMessage('Invalid request, pid required in query'),
    ]
}

function getRegistrationValidation() {
    return [
        query('ticket', 'Error while handling ticket').trim().isLength({ min: 17, max: 18 }).escape().isAlphanumeric('en-US', { ignore: '-' }).withMessage('Invalid ticket in query'),
    ]
}

function fileValidation() {
    return [
        query('email', 'Error while handling query').exists().withMessage('Invalid request, email required in query').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
    ]
}

function verifyPICTOrPayments() {
    return [
        oneOf([
            body('isPICT').equals('1').withMessage('Invalid request, status of PICT required'),
            body('isInternational').equals('1').withMessage('Invalid request, status of International required'),
            body('payment_id').exists().withMessage('Invalid request, transaction id required').trim().isLength({ min: 8, max: 10 }).escape().isAlphanumeric('en-US').withMessage('Invalid transaction id in body'),
        ])
    ]
}

function paymentValidation() {
    return [
        body('ticket').exists().withMessage('Invalid request, tickets required').trim().isLength({ min: 17, max: 18 }).escape().isAlphanumeric('en-US', { ignore: '-' }).withMessage('Invalid ticket in body'),
    ]
}

export const ticketValidations = {
    ticketValidation,
    getPaymentValidation,
    getRegistrationValidation,
    fileValidation,
    verifyPICTOrPayments,
    paymentValidation,
}