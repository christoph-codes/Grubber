
import { sessionClient } from '../../../services/session/sessionClient';
import { Request, Response } from 'express';
import { grubberLogger } from '../../../logger';
import { basename } from 'path';
import { constants } from '../../../constants/constants';
import { extractOrigin } from '../../../utils/commonUtils';

const filename = basename(__filename);

export const checkSessionApi = async (req: Request, res: Response) => {
    try {
        const session = await sessionClient.retrieveSessionData(req.cookies[constants.SESSION_COOKIE]);
        if (!session) {
            throw new Error('Empty or undefined object returned from session');
        }
        const newSession = await sessionClient.updateSession(req.cookies[constants.SESSION_COOKIE], session);
        res.cookie(constants.SESSION_COOKIE, newSession, {
            path: '/',
            maxAge: session.ttl,
            httpOnly: true,
            domain: extractOrigin(req)
        }).status(200).send({ userId: session.userId });
    } catch (error) {
        grubberLogger.error('Check Session API error: ', { filename, obj: error });
        res.status(401).send({
            error: 'invalid_session',
            error_message: 'The session associated with the request is not valid'
        });
    }
}