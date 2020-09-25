
import { Request, Response, NextFunction } from 'express';
import { constants } from './constants/constants';
import { basename } from 'path';
import { grubberLogger } from './logger';
import { AES, enc } from 'crypto-js';

const filename = basename(__filename);

// tslint:disable-next-line: no-var-requires
const tokens = require('csrf')();
const secret = constants.CSRF_SECRET;

const buildErrorResponse = (res: Response, code: number, errorCode: string, errorMessage?: string) => {
    res.status(code).send({
        error: errorCode,
        error_message: errorMessage
    });
};

const validateSecToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers['grubber-sec-token'];
        const decrypted = AES.decrypt(header as string, 'Si je veux bien').toString(enc.Utf8);
        const token = JSON.parse(decrypted);
        if (token.msg > new Date().toUTCString()) {
            next();
        } else {
            throw new Error('Expired sec token');
        }
    } catch (err) {
        grubberLogger.error('Error validating security token ', { filename, obj: err });
        buildErrorResponse(res, 403, 'Forbidden');
    }
}

export const setApiTimeout = (_req: Request, res: Response, next: NextFunction) => {
    const timeout = constants.API_TIMEOUT;
    res.setTimeout(timeout, () => buildErrorResponse(res, 503, 'request_timeout'));
    next();
};

export const addHeaders = (_req: Request, res: Response, next: NextFunction) => {
    const csrfToken = tokens.create(secret);

    // TODO: CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, CSRF-TOKEN, GRUBBER-SEC-TOKEN');
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
};

export const validateCsrf = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['csrf-token']) {
        if (tokens.verify(secret, req.headers['csrf-token'])) {
            validateSecToken(req, res, next);
        } else {
            buildErrorResponse(res, 403, 'forbidden');
        }
    } else {
        buildErrorResponse(res, 403, 'forbidden');
    }
}

export const logRequest = (req: Request, _res: Response, next: NextFunction) => {
    const reqObj = {
        method: req.method,
        path: req.path,
        body: req.body,
        ip: req.ip,
        headers: req.headers,
        params: req.params
    };
    grubberLogger.access('Request received: ', { filename, obj: JSON.stringify(reqObj) });
    next();
};

export const requestValidator = (req: Request, reqBody: string[], reqHeader?: string[]) => {

    const missing = [];
    
    if (reqBody) {
        reqBody.forEach(prop => {
            if (!req.body.hasOwnProperty(prop)) {
                missing.push(prop);
            }
        });
    }
    if (reqHeader) {
        reqHeader.forEach(prop => {
            if (!req.headers.hasOwnProperty(prop)) {
                missing.push(prop);
            }
        });
    }

    if (missing.length > 0) {
        throw {
            status: 400,
            error: {
                error: 'missing_params',
                error_message: 'request is missing required params: ' + missing.toString
            }
        }
    }

    return true;
};
