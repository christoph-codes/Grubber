
import { createPool, format, Pool, PoolConfig } from 'mysql';
import { getEnvVariable } from '../../env';
import { grubberLogger } from '../../logger';
import { basename } from 'path';
import { AES, enc } from 'crypto-js';
import { constants } from '../../constants/constants';

const filename = basename(__filename);

class MySqlService {

    private pool: Pool;

    public activate = () => {
        const sessionOpts: PoolConfig = {
            host: getEnvVariable('GRUBBER_DBHOST'),
            user: getEnvVariable('GRUBBER_DBUSER'),
            password: getEnvVariable('GRUBBER_DBPASS'),
            database: getEnvVariable('GRUBBER_DB'),
            dateStrings: true,
            supportBigNumbers: true
        }
        grubberLogger.debug('Creating pool with configs ', { filename, obj: sessionOpts });

        this.pool =  createPool(sessionOpts);
    };

    public createUser = (user: any) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'INSERT INTO USERS ' +
                '(user_name, user_pass, user_hash, first_name, last_name, user_gender, favorite_food, user_email, location, user_description, created_on, last_updated) VALUES ' +
                '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            const userHash = this.randomString();
            const decrypted = AES.decrypt(user.userPass, constants.SALT_VALUE).toString(enc.Utf8);
            const userPass = AES.encrypt(decrypted, userHash).toString();
            const currDate = new Date();

            const query = format(queryString,
                // tslint:disable-next-line: max-line-length
                [user.userName, userPass, userHash, user.firstName, user.lastName, user.gender, JSON.stringify(user.favoriteFood), user.email, user.location, user.description, currDate, currDate]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error when inserting user into database', { filename, obj: err });
                    if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('user_name')) {
                        reject({
                            status: 400,
                            error: {
                                error: 'uname_taken',
                                error_message: 'The username you are attempting to use is already taken'
                            }
                        });
                    } else if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('user_email')) {
                        reject({
                            status: 400,
                            error: {
                                error: 'uemail_taken',
                                error_message: 'The email you are attempting to use is already taken'
                            }
                        });
                    } else {
                        reject(err);
                    }
                }

                grubberLogger.debug('Added user into database', { filename, obj: res });
                resolve(res);
            });
        });
    };

    public retrieveUser = (userId: any, idType: string) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'SELECT * FROM USERS WHERE ?? = ?';

            const query = format(queryString, [idType, userId]);

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
    };

    public retrieveZipCodes = (zipOne: number, zipTwo: number) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'SELECT latitude, longitude FROM ZIPCODES WHERE zip_code = ? OR zip_code = ?';

            const query = format(queryString, [zipOne, zipTwo]);
            
            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error retrieving zip codes ', { filename, obj: err });
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public createGrub = (req: any) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'INSERT INTO GRUBS (title, requested_user_id, location, restaurant, grub_date, confirmed_date) ' +
                '(?, ?, ?, ?, ?, ?)';

            const query = format(queryString, [req.title, req.reqUserId, req.location, req.restaurant, req.grubDate, new Date()]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error creating new grub ', { filename, obj: err });
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public joinGrub = (req: any) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'INSERT INTO JOIN_USERS_GRUBS (grub_id, user_id) ' +
            '(?, ?)';

            const query = format(queryString, [req.grubId, req.userId]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error joining grub ', { filename, obj: err });
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public retrieveAllGrubs = () => {
        return new Promise<any>((resolve, reject) => {
            const query = 'SELECT * FROM GRUBS';

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error retrieving grubs ', { filename, obj: err });
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public retrieveGrubsByLocation = (req: any) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'SELECT * FROM GRUBS WHERE LOCATION LIKE ?';

            const query = format(queryString, [`%${req.location}%`]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    grubberLogger.error('Error retrieving grubs ', { filename, obj: err });
                    reject(err);
                }
                resolve(res);
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
    };
}

export const mySqlService: MySqlService = new MySqlService();
