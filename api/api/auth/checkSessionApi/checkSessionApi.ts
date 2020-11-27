
import { sessionClient } from '../../../services/session/sessionClient';
import { Request, Response } from 'express';
import { grubberLogger } from '../../../logger';
import { basename } from 'path';
import { constants } from '../../../constants/constants';
import { extractOrigin } from '../../../utils/commonUtils';
import { checkSessionService } from '../../../services/checkSession/checkSessionService';

const filename = basename(__filename);

export const checkSessionApi = async (req: Request, res: Response) => {
    try {
        const session = await sessionClient.retrieveSessionData(req.cookies[constants.SESSION_COOKIE]);
        if (!session) {
            throw new Error('Empty or undefined object returned from session');
        }
        const body: any = { userId: session.userId };
        if (req.query['type']) {
            switch (req.query['type']) {
                case 'profile':
                    const profResp = await checkSessionService.checkProfile(session.userId);
                    if (!profResp) {
                        body.action = 'complete_profile'
                    }
                    break;
                case 'auth':
                    // TODO
                    break;
                default:

            }
        }
        const newSession = await sessionClient.updateSession(req.cookies[constants.SESSION_COOKIE], session);
        res.cookie(constants.SESSION_COOKIE, newSession, {
            path: '/',
            maxAge: session.ttl,
            httpOnly: true,
            domain: extractOrigin(req)
        }).status(200).send(body);
    } catch (error) {
        grubberLogger.error('Check Session API error: ', { filename, obj: error });
        res.cookie(constants.SESSION_COOKIE, '', {
            path: '/',
            expires: new Date(100),
            httpOnly: true,
            domain: extractOrigin(req)
        }).status(401).send({
            error: 'invalid_session',
            error_message: 'The session associated with the request is not valid'
        });
    }
}