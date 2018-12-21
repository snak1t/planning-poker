import Axios from 'axios';
/**
 * Get an absolute url to an api back-end
 * @param {string} url
 * @returns {string}
 */
const prependUrl = url => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT.endsWith('/')
        ? process.env.REACT_APP_API_ENDPOINT.slice(-1)
        : process.env.REACT_APP_API_ENDPOINT;
    const path = url.startsWith('/') ? url : `/${url}`;
    return baseUrl + path;
};
export const ApiClient = {
    get(url, ...args) {
        return Axios.get(prependUrl(url), ...args);
    },
    post(url, ...args) {
        return Axios.post(prependUrl(url), ...args);
    },
    put(url, ...args) {
        return Axios.put(prependUrl(url), ...args);
    },
    delete(url, ...args) {
        return Axios.delete(prependUrl(url), ...args);
    },
};
