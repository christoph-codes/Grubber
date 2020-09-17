
import { Request } from 'express';

export const extractOrigin = (req: Request) => {
    const origin: string = req.headers['origin'].toString() || req.headers['referer'];
    if (origin.includes('localhost')) {
        return '.localhost';
    } else {
        return origin.substring(0, origin.indexOf('.com') + 4).replace('http://', '.');
    }
}