
// tslint:disable: no-console
// For SSL certificate chain
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// TODO: server certificate for https
import { createServer } from 'http';
import { load } from './env';
import { app } from './app';
import { constants } from './constants/constants';

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled rejection ', { reason, p });
});

process.on('warning', (warning) => {
    console.error('Warning ', warning.stack);
});

const errorHandler = (port: number) => {
    return (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') {
            throw error;
        } else {
            switch (error.code) {
                case 'EACCES':
                    console.error(`Port ${port} requires elevated access`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`Port ${port} is already being used`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
    };
};

load();
const server = createServer(app);
server.listen(constants.PORT);
server.on('error', errorHandler);
server.on('listening', () => {
    console.log(`App listening on port ${constants.PORT}`);
});
