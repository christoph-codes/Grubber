
import { createAccountService } from '../../../services/createAccount/createAccountService';
import { constants } from '../../../constants/constants';
import { basename } from 'path';
import { Request, Response } from 'express';
import { grubberLogger } from '../../../logger';
import { apiErrorResponse, extractOrigin } from '../../../utils/commonUtils';
import { requestValidator } from '../../../middlewares';
import * as memcache from 'memory-cache';

const filename = basename(__filename);
const requiredFields = ['userName', 'userPass', 'email', 'location',];

export const createAccountApi = async (req: Request, res: Response) => {
    try {
        requestValidator(req, requiredFields);
        grubberLogger.debug('Create Account Api request ', { filename, obj: req.body });
        const response = await createAccountService.invoke(req.body);
        grubberLogger.debug('Create Account Api response ', { filename, obj: response });
        const sessionObj = {
            userId: response.userId,
            userName: response.userName,
            userIp: req.ip
        };
        memcache.put(response.sessionId, sessionObj, response.ttl);
        res.cookie(constants.SESSION_COOKIE, response.sessionId, {
            path: '/',
            maxAge: response.ttl,
            httpOnly: true,
            domain: extractOrigin(req)
        }).status(200).send({ userId: response.userId });
    } catch (error) {
        grubberLogger.error('Create Account Api error: ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};