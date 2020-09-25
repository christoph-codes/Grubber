
import { createPool, format, Pool } from 'mysql';
import { getEnvVariable } from '../../env';
import { grubberLogger } from '../../logger';
import { basename } from 'path';
import { AES } from 'crypto-js';

const filename = basename(__filename);

class MySqlService {

    private pool: Pool;

    public activate = () => {
        const sessionOpts = {
            host: getEnvVariable('GRUBBER_DBHOST'),
            user: getEnvVariable('GRUBBER_DBUSER'),
            password: getEnvVariable('GRUBBER_DBPASS'),
            database: getEnvVariable('GRUBBER_DB'),
        }
        grubberLogger.debug('Creating pool with configs ', { filename, obj: sessionOpts });

        this.pool =  createPool(sessionOpts);
    };

    public createUser = (user: any) => {
        return new Promise((resolve, reject) => {
            const queryString = 'INSERT INTO USERS (user_name, user_pass, user_hash, created_on) VALUES ' +
                '(?, ?, ?, ?)';

            const userHash = this.randomString();
            const userPass = AES.encrypt(user.userPass, userHash);

            const query = format(queryString, [user.userName, userPass, userHash, new Date()]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error when inserting user into database', { filename, obj: err });
                    reject(err);
                }

                grubberLogger.debug('Added user into database', { filename, obj: res });
                resolve('S');
            });
        });
    };

    public retrieveUser = (userId: any, idType: string) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'SELECT * FROM USERS WHERE ?? = ?';

            const query = format(queryString, [idType, userId]);
            grubberLogger.debug('Query for user from ' + getEnvVariable('GRUBBER_DBHOST'), { filename, obj: query });

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error retrieving user ', { filename, obj: err });
                    reject(err);
                }
                if (res && res.length) {
                    grubberLogger.debug('Retrieved user from database ', { filename, obj: res[0]});
                    resolve(res[0]);
                } else {
                    grubberLogger.error('User not found ', { filename });
                    reject({
                        status: 404,
                        error: {
                            error: 'user_not_found',
                            error_message: 'Account with the given user name was not found'
                        }
                    });
                }
            });
        });
    }

    private randomString = (): string => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let rstring = '';
        for (let i = 0; i < 15; i++) {
            rstring += alphabet.charAt(Math.floor(Math.random() * 52));
        }
        return rstring;
    }
}

export const mySqlService: MySqlService = new MySqlService();