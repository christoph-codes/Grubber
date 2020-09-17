
import { Request, Response } from 'express';
import { grubberLogger } from '../../../logger';
import { basename } from 'path';
import { authorizeService } from '../../../services/authorize/authorizeService';
import * as memcache from 'memory-cache';
import { constants } from '../../../constants/constants';
import { extractOrigin } from '../../../utils/commonUtils';

const filename = basename(__filename);

export const authorizeApi = async (req: Request, res: Response) => {
    try {
        grubberLogger.debug('Request for Authorize API ', { filename, obj: req.body });
        const response = await authorizeService.invoke(req.body);
        grubberLogger.debug('Response from authorizeService ', { filename, obj: response });
        const sessionObj = {
            userId: response.userId,
            userName: response.userName,
            userIp: req.ip
        };
        memcache.put(response.sessionId, sessionObj, response.ttl);
        res.cookie(constants.SESSION_COOKIE, response.ttl, {
            path: '/',
            maxAge: response.ttl,
            httpOnly: true,
            domain: extractOrigin(req)
        }).status(200).send({ userId: response.userId });
    } catch (error) {
        grubberLogger.error('Authorize API error: ', { filename, obj: error });
        res.status(error.status).send(error.body);
    }
}