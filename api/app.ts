
import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { setApiTimeout, addHeaders, checkIp, logRequest } from './middlewares';
import { apiRoutes } from './routes/routes';

const app: express.Application = express();
const router: express.Router = express.Router();

// mount json form parser
app.use(json());

// mount query string parser
app.use(urlencoded({
    extended: false
}));


// mount cookie parser
app.use(cookieParser());

// set request timeout and add response headers
app.all('*', setApiTimeout, addHeaders, checkIp, logRequest);

// add routes
app.use('/', apiRoutes(router));

// Remove 'X-Powered-By' header so as to not disclose the engine
app.disable('x-powered-by');

export { app };