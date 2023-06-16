import { body, oneOf, param, query } from 'express-validator';
import { eventsName, projectDomains, projectTypes } from '../../../static/eventsData.mjs';

function eventNameParamValidation() {
    return [
        param('event_name', 'Error while handling request endpoint').isIn(eventsName).withMessage('Invalid event name provided in request endpoint'),
    ]
}

function getUserRegistrationValidation() {
    return [
        query('email', 'Error while handling request endpoint').exists().withMessage('Invalid request, email required in query').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid email'),
    ]
}

function projectValidation() {
    return [
        param('event_name', 'Error while handling request endpoint').not().equals('pradnya').withMessage('Invalid event name for request endpoint'),
        body('title').trim().isLength({ min: 10, max: 100 }).escape().withMessage('Invalid project title'),
        // oneOf([
        //     body('domain', 'Invalid project domain').if(param('event_name').equals(eventsName[0])).isIn(projectDomains.get(eventsName[0])).withMessage('Invalid project domain selected'),
        //     body('domain', 'Invalid project domain').if(param('event_name').equals(eventsName[1])).isIn(projectDomains.get(eventsName[1])).withMessage('Invalid project domain selected'),
        // ]),
        body('domain', 'Invalid project domain').isIn(Object.keys(projectDomains)).withMessage('Invalid project domain selected'),
        body('project_type').isIn(projectTypes).withMessage('Invalid project type selected'),
        body('guide_name').trim().isAlpha('en-US', { ignore: ' .' }).isLength({ min: 3, max: 50 }).escape().withMessage('Invalid guide name'),
        body('guide_email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid guide email'),
        body('guide_phone').trim().escape().isMobilePhone().withMessage('Invalid guide phone'),
        body('hod_email').isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage('Invalid hod email'),
        body('sponsored').isIn(['1', '0']).withMessage('Invalid selection of sponsorship status'),
        body('company').trim().escape().if(body('sponsored').equals('1')).isLength({ min: 3, max: 100 }).withMessage('Invalid company name'),
        body('nda').isIn(['1', '0']).withMessage('Invalid selection of nda status'),
        body('demo').if(param('event_name').equals(eventsName[1])).exists().withMessage('Demonstration status required').isIn(['1', '0']).withMessage('Invalid selection of demonstration status'),
        body('reason_of_demo').if(param('event_name').equals(eventsName[1])).exists().withMessage('Reason of demonstration required').if(body('demo').equals('0')).trim().isLength({ min: 5, max: 100 }).escape().withMessage('Invalid reason of demonstration'),
        body('abstract').trim().isLength({ min: 50, max: 1000 }).escape().withMessage('Invalid abstract data'),
    ]
}

function memberValidation() {
    return [
        body('name').trim().notEmpty().isLength({ min: 3, max: 30 }).isAlpha('en-US', { ignore: ' .' }).escape().withMessage('Invalid name'),
        body('email').trim().notEmpty().escape().withMessage('Invalid email'),
        body('phone').trim().escape().isMobilePhone().withMessage('Invalid phone'),
        body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
    ]
}

function collegeValidation() {
    return [
        param('event_name').custom((event_name, { req }) => event_name[0] === req.signedCookies.ticket[4].toLowerCase()).withMessage('Invalid cookie'),
        oneOf([
            body('isPICT').equals('1'),
            [
                body('college').trim().isAlpha('en-US', { ignore: ' ,.-\'()&' }).isLength({ min: 3, max: 100 }).escape().withMessage('Invalid college name'),
                body('country').trim().isAlpha('en-US', { ignore: ' -\'' }).isLength({ min: 2, max: 20 }).escape().withMessage('Invalid country name')
                // .if(body('college').equals('Pune Institute of Computer Technology')).equals('India').withMessage('Invalid country entered for PICT')
                ,
                body('state').trim().isAlpha('en-US', { ignore: ' -\'' }).isLength({ min: 3, max: 20 }).escape().withMessage('Invalid state name')
                // .if(body('college').equals('Pune Institute of Computer Technology')).equals('Maharashtra').withMessage('Invalid state entered for PICT')
                ,
                body('district').trim().isAlpha('en-US', { ignore: ' -\'' }).isLength({ min: 2, max: 20 }).escape().withMessage('Invalid district name')
                // .if(body('college').equals('Pune Institute of Computer Technology')).equals('Pune').withMessage('Invalid district entered for PICT')
                ,
                body('city').trim().isAlpha('en-US', { ignore: ' -\'' }).isLength({ min: 2, max: 20 }).escape().withMessage('Invalid city name')
                // .if(body('college').equals('Pune Institute of Computer Technology')).equals('Pune').withMessage('Invalid city entered for PICT')
                ,
                body('locality').isIn(['1', '0']).withMessage('Invalid locality selected')
                // .if(body('college').equals('Pune Institute of Computer Technology')).equals('1').withMessage('Invalid locality selected for PICT')
                ,
                body('mode').isIn(['1', '0']).withMessage('Invalid selection of presentation mode').if(body('city').equals('Pune')).equals('1').withMessage('Invalid mode of presentation, participants from Pune are expected to be in offline mode'),
                body('reason_of_mode').if(body('mode').equals('0')).trim().isLength({ min: 5, max: 100 }).escape().withMessage('Invalid text entered in reason of mode'),
            ]
        ]),
        oneOf([
            body('year', 'Invalid year of study').if(param('event_name').equals(eventsName[0])).optional({ checkFalsy: true }),
            body('year', 'Invalid year of study').if(param('event_name').equals(eventsName[1])).isIn(['FE', 'SE', 'TE']).withMessage('Invalid year of study'),
            body('year', 'Invalid year of study').if(param('event_name').equals(eventsName[2])).isIn(['FE', 'SE', 'TE', 'BE']).withMessage('Invalid year of study'),
        ]),
        body('referral').trim().exists().if(body('referral').notEmpty()).isAlpha('en-US', { ignore: ' -' }).isLength({ min: 3, max: 50 }).escape().withMessage('Invalid referral id'),
    ]
}

export const eventsValidations = {
    eventNameParamValidation,
    getUserRegistrationValidation,
    projectValidation,
    memberValidation,
    collegeValidation,
}