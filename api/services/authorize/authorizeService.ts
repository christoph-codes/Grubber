
import { grubberLogger } from '../../logger';
import { mySqlService } from '../mySql/mySqlService';
import { basename } from 'path';
import { AES, enc } from 'crypto-js';
import { constants } from '../../constants/constants';
import { v4 } from 'uuid';

const filename = basename(__filename);

class AuthorizeService {
    public invoke = async (req: any) => {
        try {
            
            grubberLogger.debug('Authorize Service request is ', { filename, obj: req });
            const user = await mySqlService.retrieveUser(req.userName, 'user_name');
            grubberLogger.debug('Response from mySqlService is ', { filename, obj: user });
            grubberLogger.debug('User info: ', { filename, obj: {pass: user.user_pass, hash: user.user_hash}});
            // tslint:disable-next-line: max-line-length
            if (AES.decrypt(user.user_pass, user.user_hash).toString(enc.Utf8) === AES.decrypt(req.password, constants.SALT_VALUE).toString(enc.Utf8)) {
                const sessionId = v4();
                return {
                    userId: user.user_id,
                    userName: user.user_name,
                    ttl: req.keepMeLoggedIn ? 31557600000 : 1800000,
                    sessionId
                };
            } else {
                throw {
                    status: 400,
                    error: {
                        error: 'password_not_match',
                        error_message: 'The password provided is incorrect'
                    }
                };
            }
        } catch (error) {
            grubberLogger.error('Authorize Service error ', { filename, obj: error });
            throw error;
        }
    }
}

export const authorizeService: AuthorizeService = new AuthorizeService();
