
import { redisClient } from '../redis/redisClient';
import { memcacheClient } from '../memcache/memcacheClient';
import { getEnvVariable } from '../../env';
import { grubberLogger } from '../../logger';
import { basename } from 'path';
import { v4 } from 'uuid';
import { SessionObj } from '../../models/models';

const filename = basename(__filename);

class SessionClient {

    private client: any;

    public activate = () => {
        if (getEnvVariable('GRUBBER_REDIS') && getEnvVariable('GRUBBER_REDIS_PORT')) {
            this.client = redisClient;
            grubberLogger.debug('Using Redis Cache for session management', { filename });
        } else {
            this.client = memcacheClient;
            grubberLogger.debug('Using Mem Cache for session management', { filename });
        }
    };

    public createSession = async (id: string, data: SessionObj, ttl: number) => {
        try {
            const stringifiedData = JSON.stringify(data);
            return await this.client.saveTo(id, stringifiedData, ttl);
        } catch (err) {
            grubberLogger.error(`Error saving session with id ${id} to cache `, { filename, obj: err });
            throw err;
        }
    };

    public retrieveSessionData = async (id: string): Promise<SessionObj> => {
        try {
            return await this.client.retrieveFrom(id);
        } catch (err) {
            grubberLogger.error(`Error retrieving session with id ${id} `, { filename, obj: err });
            throw err;
        }
    };

    public deleteSessionData = async (id: string) => {
        try {
            const deleted = await this.client.removeFrom(id);
            if (deleted > 0) {
                return 'SUCCESS';
            } else {
                return 'UNABLE TO DELETE FROM CACHE';
            }
        } catch (err) {
            grubberLogger.error(`Error deleting session with id ${id}`, { filename, obj: err });
            throw err;
        }
    }

    public updateSession = async (id: string, data: SessionObj) => {
        try {
            await this.deleteSessionData(id);
            const newId = v4();
            const stringifiedData = JSON.stringify(data);
            await this.client.saveTo(newId, stringifiedData);
            return newId;
        } catch (err) {
            grubberLogger.error(`Error updating session`, { filename, obj: err });
            throw err;
        }
    }

}

export const sessionClient: SessionClient = new SessionClient();