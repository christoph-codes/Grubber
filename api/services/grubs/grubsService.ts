
import { mySqlService } from '../mySql/mySqlService';
import { grubberLogger } from '../../logger';
import { basename } from 'path';

const filename = basename(__filename);

class GrubsService {

    public createGrub = async (req: any) => {
        try {
            grubberLogger.debug('Create Grub Service request ', { filename, obj: req });
            const result = await mySqlService.createGrub(req);
            grubberLogger.debug('Create Grub MySql response ', { filename, obj: result });
            const joinReq = {
                grubId: result.insertId,
                userId: req.reqUserId
            };
            grubberLogger.debug('Join Grub request ', { filename, obj: joinReq });
            await mySqlService.joinGrub(joinReq);
            return {
                grubId: result.insertId,
                joinStatus: 'success'
            };
        } catch (error) {
            grubberLogger.error('Create Grub Service error ', { filename, obj: error });
            throw error;
        }
    };

    public joinGrub = async (req: any) => {
        try {
            grubberLogger.debug('Join Grub Service request ', { filename, obj: req });
            await mySqlService.joinGrub(req);
            return {
                grubId: req.grubId,
                joinStatus: 'success'
            };
        } catch (error) {
            grubberLogger.error('Join Grub Service error ', { filename, obj: error });
            throw error;
        }
    };

    public retrieveAllGrubs = async () => {
        try {
            const response = await mySqlService.retrieveAllGrubs();
            grubberLogger.debug('retrieve all grubs response ', { filename, obj: response });
            return response;
        } catch (error) {
            grubberLogger.error('Retrieve all grubs error ', { filename, obj: error });
            throw error;
        }
    };

    public retrieveGrubsByLocation = async (req: any) => {
        try {
            grubberLogger.debug('Retrieve Grubs by location: ', { filename, obj: req.location });
            const response = await mySqlService.retrieveGrubsByLocation(req);
            grubberLogger.debug('Retrieve Grubs by location response ', { filename, obj: response });
            return response;
        } catch (error) {
            grubberLogger.error('Retrieve grubs by location error ', { filename, obj: error });
            throw error;
        }
    }
}

export const grubsService: GrubsService = new GrubsService();