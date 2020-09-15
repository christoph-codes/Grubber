
import { createPool, format } from 'mysql';
import { getEnvVariable } from '../../env';
import { grubberLogger } from '../../logger';
import { basename } from 'path';

const filename = basename(__filename);

class MySqlService {

    private pool = createPool({
        host: getEnvVariable('GRUBBER_DBHOST'),
        user: getEnvVariable('GRUBBER_DBUSER'),
        password: getEnvVariable('GRUBBER_DBPASS'),
        database: getEnvVariable('GRUBBER_DB'),
    });

    public createUser = (user: any) => {
        return new Promise((resolve, reject) => {
            const queryString = 'INSERT INTO USERS (user_name, user_pass, user_hash, create_on) VALUES ' +
                '(??, ??, ??, ??)';

            const query = format(queryString, [user.userName, user.userPass, this.randomString(), new Date()]);

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