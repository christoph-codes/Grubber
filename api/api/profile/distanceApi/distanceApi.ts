
import { Request, Response } from 'express';
import { distanceService } from '../../../services/distance/distanceService';
import { basename } from 'path';
import { grubberLogger } from '../../../logger';
import { requestValidator } from '../../../middlewares';
import { apiErrorResponse } from '../../../utils/commonUtils';

const filename = basename(__filename);

export const distanceApi = async (req: Request, res: Response) => {

    try {
        requestValidator(req, ['zipOne', 'zipTwo', 'measure'], []);
        grubberLogger.debug('Distance API request is ', { filename, obj: req.body });
        const response = await distanceService.invoke(req.body);
        grubberLogger.debug('Distance API response is ', { filename, obj: response });
        res.status(200).send({ distance: response });
    } catch (error) {
        grubberLogger.error('Distance API error ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};