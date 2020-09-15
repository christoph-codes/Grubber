
import * as nconf from 'nconf';

export const load = () => {
    nconf.env().argv();

    const env = nconf.get('NODE_ENV');

    if (env === undefined || env === ('NODE_ENV')) {
        // tslint:disable-next-line: no-console
        console.error('FATAL: No environment variable set');
        process.exit(0);
    } else {
        return this;
    }
};

export const getEnv = () => {
    return nconf.get('NODE_ENV');
};

export const getEnvVariable = (key: string) => {
    return nconf.get(key);
}