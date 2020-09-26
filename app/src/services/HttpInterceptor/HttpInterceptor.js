
import Axios from 'axios';
import StorageService from '../SessionStorageService/SessionStorageService';
import { AES } from 'crypto-js';

const interceptor = () => {
    
    // Intercept api requests and append security token
    Axios.interceptors.request.use(
        (req) => {
            if (req.url.includes('/api')) {
                req.headers['CSRF-TOKEN'] = StorageService.get('csrfToken');
                req.headers['GRUBBER-SEC-TOKEN'] = generateSecToken();
            }
            return req;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Intercept api responses and store csrf token
    Axios.interceptors.response.use(
        (res) => {
            if (res.headers['csrf-token']) {
                StorageService.set('csrfToken', res.headers['csrf-token']);
            }
            return Promise.resolve(res);
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

const generateSecToken = () => {
    const curr = new Date();
    const exp = new Date();
    exp.setMilliseconds(curr.getMilliseconds() + 3000);
    const obj = {
        msg: exp.toUTCString()
    };
    return AES.encrypt(JSON.stringify(obj), 'Si je veux bien').toString();
}

export default { interceptor };
