import { body, cookie } from 'express-validator';
import { roles as rolesData } from '../../../static/adminData.mjs';

function adminLoginValidation() {
	return [
		body('username').trim().isLength({ min: 6, max: 50 }).escape(),
		body('password').isLength({ min: 8, max: 50 }).escape(),
	]
}

function createAdminValidation() {
	return [
		body('username').trim().isLength({ min: 6, max: 50 }).escape().withMessage('Invalid username'),
		body('password').isLength({ min: 8, max: 50 }).isStrongPassword().withMessage('Invalid password'),
		body('roles').isArray({ min: 1, max: 5 }).custom(roles => roles.every(role => rolesData.includes(role.trim()))).withMessage('Invalid roles for admin'),
	]
}

function verifyAdminTicket() {
	return [
		cookie('admin_data').customSanitizer((_, { req }) => req.signedCookies?.admin_data).exists().isObject().withMessage('You are not logged in! Please login in for admin access'),
		cookie('admin_data.token').customSanitizer((_, { req }) => req.signedCookies?.admin_data?.token).exists().withMessage('Please login again').escape().isJWT().withMessage('Invalid session token for admin access'),
		cookie('admin_data.roles').customSanitizer((_, { req }) => req.signedCookies?.admin_data?.roles).isArray({ min: 1, max: 5 }).custom(roles => roles.every(role => rolesData.includes(role.trim()))).withMessage('Invalid roles for admin access'),
	]
}

function verifyAdminValidation(min_role) {
	let allowed_roles = rolesData
	if (typeof min_role === 'number') {
		allowed_roles = rolesData.slice(0, min_role)
	} else if (Array.isArray(min_role)) {
		allowed_roles = min_role
	}

	return [
		cookie('admin_data').customSanitizer((_, { req }) => req.signedCookies?.admin_data).exists().withMessage('You are not logged in! Please login in for admin access').isObject().withMessage('Invalid session cookie for admin access'),
		cookie('admin_data.token').customSanitizer((_, { req }) => req.signedCookies.admin_data?.token).escape().isJWT().withMessage('Invalid session token for admin access'),
		cookie('admin_data.roles').customSanitizer((_, { req }) => req.signedCookies.admin_data?.roles).isArray({ min: 1, max: 5 }).custom(roles => roles.every(role => allowed_roles.includes(role.trim()))).withMessage('Invalid roles for admin access'),
	]
}

export const adminValidations = {
	adminLoginValidation,
	createAdminValidation,
	verifyAdminTicket,
	verifyAdminValidation,
}