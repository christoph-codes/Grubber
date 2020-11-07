
import Axios from 'axios';
import Interceptor from '../HttpInterceptor/HttpInterceptor';

Interceptor.interceptor();

const requestGet = (url, opts) => {
    return Axios.get(url, opts);
};

const requestPost = (url, body, opts) => {
    return Axios.post(url, body, opts);
};

const requestPut = (url, body, opts) => {
    return Axios.put(url, body, opts);
}

const requestDelete = (url, opts) => {
    return Axios.delete(url, opts);
}

export default {
    requestGet,
    requestPost,
    requestPut,
    requestDelete
};
