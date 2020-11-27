
import { Request, Response } from 'express';
import { AES, enc } from 'crypto-js';
import { constants } from '../constants/constants';

export const extractOrigin = (req: Request) => {
    const origin: string = req.headers['origin'].toString() || req.headers['referer'];
    if (origin.includes('localhost')) {
        return '.localhost';
    } else {
        return origin.substring(0, origin.indexOf('.com') + 4).replace('http://', '.');
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

export const checkPassword = (password: string) => {
    const decrypted = AES.decrypt(password, constants.SALT_VALUE).toString(enc.Utf8);

    const isTooShort = decrypted.length <= 7;
    const containsIllegalChar = /[%^()\=\[\]{};:\\|<>\/'"]/g.test(decrypted);
    const isWeakPassword = constants.WEAK_PASSWORDS.includes(decrypted);
    const noCapitalChar = /[A-Z]/g.test(decrypted);
    const noLowerChar = /[a-z]/g.test(decrypted);
    const noNum = /[0-9]/g.test(decrypted);
    const noSpecChar = /[&$!?+-_@#*,.]/g.test(decrypted);

    if (isWeakPassword) {
        throw {
            status: 400,
            error: {
                error: 'blacklist_password',
                error_message: 'Your password is too easy to guess, please use a different password'
            }
        };
    }

    if (isTooShort || noCapitalChar || noLowerChar || noNum || noSpecChar) {
        throw {
            status: 400,
            error: {
                error: 'weak_password',
                error_message: 'Your password must contain at least 1 captial letter, 1 lower case letter, 1 number, and 1 special character'
            }
        };
    }

    if (containsIllegalChar) {
        throw {
            status: 400,
            error: {
                error: 'bad_password',
                error_message: 'Password may not contain the following characters: %, ^, (, ), =, [, ], {, }, ;, :, \, |, <, >, /, \', "'
            }
        }
    }
};