
import { mySqlService } from '../mySql/mySqlService';
import { basename } from 'path';
import { grubberLogger } from '../../logger';

const filename = basename(__filename);

class DistanceService {

    private earthRadiusMiles = 3956.087107103049;
    private earthRadiusKm = 6366.70504929365;

    public invoke = async (req: any) => {
        try {
            grubberLogger.debug('Distance service request is ', { filename, obj: req });
            const zipCodes = await mySqlService.retrieveZipCodes(req.zipOne, req.zipTwo);
            grubberLogger.debug('Response from database ', { filename, obj: zipCodes });
            if (req.measure !== 'miles' || req.measure !== 'km') {
                throw {
                    status: 400,
                    error: {
                        error: 'bad_request',
                        error_message: 'The measure ' + req.measure + ' is not supported.'
                    }
                }
            }
            return this.getDistanceMiles(zipCodes, req.measure);
        } catch (error) {
            grubberLogger.error('Error in distanceService ', { filename, obj: error });
            throw error;
        }
    };

    private getDistanceMiles = (zipCodes, measure: 'miles'|'km') => {
        const radius = measure === 'miles' ? this.earthRadiusMiles : this.earthRadiusKm;
        const latOneRad = (zipCodes[0].latitude / 180) * Math.PI;
        const longOneRad = (zipCodes[0].longitude / 180) * Math.PI;
        const latTwoRad = (zipCodes[1].latitude / 180) * Math.PI;
        const longTwoTad = (zipCodes[1].longitude / 180) * Math.PI;

        const distance = (radius * 2) * Math.asin(Math.sqrt(Math.pow(Math.sin((latOneRad -
                latTwoRad) / 2), 2) + Math.cos(latOneRad) * Math.cos(latTwoRad) * Math.pow(
                Math.sin((longOneRad - longTwoTad) / 2), 2)));

        return Math.round(distance) + ' ' + measure;
    }
}

export const distanceService: DistanceService = new DistanceService();