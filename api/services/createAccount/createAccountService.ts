
import { mySqlService } from '../mySql/mySqlService';
import { basename } from 'path';
import { grubberLogger } from '../../logger';
import { v4 } from 'uuid';

const filename = basename(__filename);

class CreateAccountService {
    public invoke = async (req: any) => {
        try {
            grubberLogger.debug('Create Account Service request: ', { filename, obj: req});
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
        let sanitizedData = data;
        sanitizedData.userName = sanitizedData.userName.toLowerCase();
        sanitizedData.location = sanitizedData.location.value.structured_formatting.main_text;
        return sanitizedData;
    }
}

export const createAccountService: CreateAccountService = new CreateAccountService();
