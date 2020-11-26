
import { SessionObj } from '../../models/models';
import * as redis from 'redis';
import { getEnvVariable } from '../../env';

class RedisClient {

    private client: redis.RedisClient;

    public activate = () => {
        const opts: redis.ClientOpts = {
            host: getEnvVariable('GRUBBER_REDIS'),
            port: getEnvVariable('GRUBBER_REDIS_PORT')
        }
        // tslint:disable-next-line: no-console
        console.log(`activating redis with host:${getEnvVariable('GRUBBER_REDIS')} and port:${getEnvVariable('GRUBBER_REDIS_PORT')}`);
        this.client = redis.createClient(opts);
    };

    public saveTo = (id:string, data: string, ttl: number) => {
        return new Promise<string>((resolve, reject) => {
            this.client.set(id, data, (err, reply) => {
                if (err) {
                    reject(err);
                }
                this.client.expire(id, Math.floor(ttl/1000));
                resolve(reply);
            });
        });
    };

    public retrieveFrom = (id: string) => {
        return new Promise<SessionObj>((resolve, reject) => {
            this.client.get(id, (err, retrieved) => {
                if (err) {
                    reject(err);
                }
                if (retrieved) {
                    try {
                        const obj = JSON.parse(retrieved);
                        resolve(obj);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
    };

    public removeFrom = (id: string) => {
        return new Promise<number>((resolve, reject) => {
            this.client.del(id, (err, reply) => {
                if (err) {
                    reject(err);
                }
                resolve(reply);
            });
        });
    };
}

export const redisClient: RedisClient = new RedisClient();
