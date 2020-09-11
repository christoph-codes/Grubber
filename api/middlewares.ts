
import { Request, Response, NextFunction } from 'express';
import { constants } from './constants/constants';

// tslint:disable-next-line: no-var-requires
const tokens = require('csrf')();
const secret = tokens.secretSync();

const buildErrorResponse = (res: Response, code: number, errorCode: string, errorMessage?: string) => {
    res.status(code).send({
        error: errorCode,
        error_message: errorMessage
    });
};

export const setApiTimeout = (_req: Request, res: Response, next: NextFunction) => {
    const timeout = constants.API_TIMEOUT;
    res.setTimeout(timeout, () => buildErrorResponse(res, 503, 'request_timeout'));
    next();
};

export const addHeaders = (_req: Request, res: Response, next: NextFunction) => {
    const csrfToken = tokens.create(secret);

    // TODO: CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, CSRF-TOKEN')
    res.header('Access-Control-Expose-Headers', 'CSRF-TOKEN');
    res.header('CSRF-TOKEN', csrfToken);
    next();
};

export const checkIp = (req: Request, res: Response, next: NextFunction) => {
    // TODO: get Markus' IP address
    if (constants.REJECT_IPS.includes(req.ip)) {
        buildErrorResponse(res, 418, 'im_a_teapot', 'This error message body is short and stout');
    } else {
        next();
    }
}