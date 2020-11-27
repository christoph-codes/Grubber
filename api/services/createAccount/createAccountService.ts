
import { mySqlService } from '../mySql/mySqlService';
import { basename } from 'path';
import { grubberLogger } from '../../logger';
import { v4 } from 'uuid';
import { checkPassword } from '../../utils/commonUtils';

const filename = basename(__filename);

class CreateAccountService {
    public invoke = async (req: any) => {
        try {
            grubberLogger.debug('Create Account Service request: ', { filename, obj: req});
            checkPassword(req.userPass);
            const sanitizedData = this.sanitizeCreateAccountData(req);
            grubberLogger.debug('Sanitize Data', { filename, obj: sanitizedData});
            const result = await mySqlService.createUser(sanitizedData);
            grubberLogger.debug('Creage Account Service result from mySql ', { filename, obj: result });
            return {
                userId: result.insertId,
                userName: req.userName,
                ttl: 1800000,
                sessionId: v4()
            };
        } catch (error) {
            grubberLogger.error('Create Account Service error: ', { filename, obj: error });
            throw error;
        }
    };

    private sanitizeCreateAccountData = (data: any) => {
        const sanitizedData = data;
        sanitizedData.userName = sanitizedData.userName.toLowerCase();
        sanitizedData.location = sanitizedData.location.value.structured_formatting.main_text;
        Object.keys(sanitizedData).forEach(key => {
            if (typeof sanitizedData[key] === 'string' && key !== 'email') {
                sanitizedData[key] = (sanitizedData[key] as string).replace(/[$%^&()\=\[\]{};:\\|<>\/]*$/g, '');
            }
        })
        return sanitizedData;
    };
}

export const createAccountService: CreateAccountService = new CreateAccountService();
