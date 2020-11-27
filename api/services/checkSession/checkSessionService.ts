
import { mySqlService } from '../mySql/mySqlService';
import { grubberLogger } from '../../logger';
import { basename } from 'path';

const filename = basename(__filename);

class CheckSessionService {

    /**
     * Checks whether the logged in user has completed their profile
     * @param userId 
     * @return {{boolean}}
     */
    public checkProfile = async (userId: string) => {
        try {
            let complete = true;
            grubberLogger.debug('Retrieving user to check profile: ', { filename, obj: userId });
            const user = await mySqlService.retrieveUser(userId, 'user_id');
            grubberLogger.debug('Retrieved user to check profile: ', { filename, obj: user });
            const checkFields = ['first_name', 'user_gender', 'favorite_food', 'user_description'];
            checkFields.forEach(field => {
                if (!user[field]) {
                    complete = false;
                }
            });
            return complete;
        } catch (err) {
            grubberLogger.error('Error retrieving profile to check session', { filename, obj: err });
            throw err;
        }
        

        
    };
}

export const checkSessionService: CheckSessionService = new CheckSessionService();