
import { Request, Response } from 'express';

export const extractOrigin = (req: Request) => {
    const origin: string = req.headers['origin'].toString() || req.headers['referer'];
    if (origin.includes('localhost')) {
        return '.localhost';
    } else {
        return origin.substring(0, origin.indexOf('.com') + 4).replace(/^https?:\/\//, '.');
    }
};

export const apiErrorResponse = (error: any, res: Response) => {
    if (typeof error === 'object' && error.status && error.error) {
        res.status(error.status).send(error.error);
    } else {
        if (typeof error === 'string') {
            res.status(500).send({ error_message: error });
        } else {
            res.status(500).send({ error_message: 'An error occurred in the server' });
        }
    }
};