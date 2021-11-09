
import { Request, Response } from 'express';
import { grubsService } from '../../../services/grubs/grubsService';
import { basename } from 'path';
import { grubberLogger } from '../../../logger';
import { apiErrorResponse } from '../../../utils/commonUtils';
import { requestValidator } from '../../../middlewares';

const filename = basename(__filename);

export const createGrubApi = async (req: Request, res: Response) => {
    try {
        requestValidator(req, ['title', 'reqUserId', 'location', 'restaurant', 'grubDate']);
        grubberLogger.debug('Create Grub Api request ', { filename, obj: req.body});
        const response = await grubsService.createGrub(req.body);
        grubberLogger.debug('Create Grubber Api response ', { filename, obj: response });
        res.status(200).send(response);
    } catch (error) {
        grubberLogger.error('Create Grub Api error ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};

export const joinGrubApi = async (req: Request, res: Response) => {
    try {
        requestValidator(req, ['grubId', 'userId']);
        grubberLogger.debug('Join Grub Api request ', { filename, obj: req.body });
        const response = await grubsService.joinGrub(req.body);
        grubberLogger.debug('Join Grub service response ', { filename, obj: response });
        res.status(200).send(response);
    } catch (error) {
        grubberLogger.error('Join Grub Api error ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};

export const findAllGrubs = async (_req: Request, res: Response) => {
    try {
        const response = await grubsService.retrieveAllGrubs();
        grubberLogger.debug('Find all grubs response ', { filename, obj: response });
        res.status(200).send(response);
    } catch (error) {
        grubberLogger.error('Find all grubs error ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};

export const findGrubsByLocation = async (req: Request, res: Response) => {
    try {
        requestValidator(req, [], ['location']);
        grubberLogger.debug('Find Grubs by location ', { filename, obj: req.query['location'] });
        const request = {
            location: req.query['location']
        };
        const response = await grubsService.retrieveGrubsByLocation(request);
        grubberLogger.debug('Find Grubs by location ', { filename, obj: response });
        res.status(200).send(response);
    } catch (error) {
        grubberLogger.error('Find Grubs by location error ', { filename, obj: error });
        apiErrorResponse(error, res);
    }
};
