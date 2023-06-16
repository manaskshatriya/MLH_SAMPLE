import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { memberIDParser } from './fileParsers.mjs';
import formDataParser from './formDataParser.mjs';
import protectRoute from './protectRoute.mjs';
import { apiLimiter, registrationLimiter } from './rateLimiter.mjs';
import validator from './validator.mjs';

function initializeMiddlewares(dbService) {
    const { verifyAdminLogin } = protectRoute(dbService.adminServices)

    function useDefaultMiddlewares(server) {
        server.use([
            cors({
                origin: true,
                credentials: true,
                preflightContinue: true,
            }), // Allow Cross-Origin requests,
            helmet(), // Set security HTTP headers
            cookieParser(process.env.COOKIE_SECRET), // Parse Cookie header and populate req.signedCookie with an object keyed by the cookie names
            express.json({ // Body parser, reading data from body into req.body
                limit: '100kb'
            })
        ])
        return server
    }

    return {
        useDefaultMiddlewares,
        memberIDParser,
        formDataParser,
        verifyAdminLogin,
        apiLimiter,
        registrationLimiter,
        validator,
    }
}

export default initializeMiddlewares;