
import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        debug: { type: 'file', filename: '~/logs/grubber-debug.log'},
        error: { type: 'file', filename: '~/logs/grubber-error.log'},
        access: { type: 'file', filename: '~/logs/grubber-access.log'}
    },
    categories: {
        debug: { appenders: ['debug'], level: 'debug'},
        error: { appenders: ['error'], level: 'error'},
        access: { appenders: ['access'], level: 'trace'}
    }
});

class GrubberLogger {

    private logger = log4js.getLogger();

    private buildMessage = (message: string, filename: string) => {
        return '[' + filename + '] ' + message;
    }

    public access = (message: string, args: LogArgs) => {
        this.logger.trace(this.buildMessage(message, args.filename), args.obj);
    }

    public debug = (message: string, args: LogArgs) => {
        this.logger.debug(this.buildMessage(message, args.filename), args.obj);
    }

    public error = (message: string, args: LogArgs) => {
        this.logger.error(this.buildMessage(message, args.filename), args.obj);
    }
    
}

export const grubberLogger = new GrubberLogger();

interface LogArgs {
    filename: string;
    obj?: any;
}
