
const get = (key) => {
    return sessionStorage.getItem(key);
};

const set = (key, value) => {
    sessionStorage.setItem(key, value);
};

const remove = (key) => {
    sessionStorage.removeItem(key);
};

export default {
    get,
    set,
    remove
}
