
import * as memcache from 'memory-cache';
import { SessionObj } from '../../models/models';

class MemcacheClient {

    public saveTo = (id: string, data: string, ttl: number) => {
        return new Promise<string>((resolve, reject) => {
            try {
                memcache.put(id, data, ttl);
                resolve('OK');
            } catch (err) {
                reject(err);
            }
        });
    };

    public retrieveFrom = (id: string) => {
        return new Promise<SessionObj>((resolve, reject) => {
            try {
                const retrieved: string = memcache.get(id);
                if (!retrieved) {
                    throw new Error(`No session with id ${id}`);
                }
                const obj = JSON.parse(retrieved);
                resolve(obj);
            } catch (err) {
                reject(err);
            }
        });
    };

    public removeFrom = (id: string) => {
        return new Promise<number>((resolve, reject) => {
            try {
                memcache.del(id);
                resolve(1);
            } catch (err) {
                reject(err);
            }
        });
    };
}

export const memcacheClient: MemcacheClient = new MemcacheClient();
