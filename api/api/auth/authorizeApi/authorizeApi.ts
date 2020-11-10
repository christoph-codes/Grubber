
import { Request, Response } from 'express';
import { grubberLogger } from '../../../logger';
import { basename } from 'path';
import { authorizeService } from '../../../services/authorize/authorizeService';
import * as memcache from 'memory-cache';
import { constants } from '../../../constants/constants';
import { extractOrigin, apiErrorResponse } from '../../../utils/commonUtils';
import { requestValidator } from '../../../middlewares';

const filename = basename(__filename);

export const authorizeApi = async (req: Request, res: Response) => {
    try {
        requestValidator(req, ['userName', 'userPass'], []);
        grubberLogger.debug('Request for Authorize API ', { filename, obj: req.body });
        const response = await authorizeService.invoke(req.body);
        grubberLogger.debug('Response from authorizeService ', { filename, obj: response });
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
        }).status(200).send({ 
            id: response.userId, 
            username: response.userName,
            fname: response.first_name,
            lname: response.last_name,
            gender: response.gender,
            favorite_food: response.favorite_food,
            email: response.email,
            location: response.location,
            description: response.description
        });
    } catch (error) {
        grubberLogger.error('Authorize API error: ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
}