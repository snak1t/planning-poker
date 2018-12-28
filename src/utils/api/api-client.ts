import Axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { pathOr } from 'ramda';
/**
 * Get an absolute url to an api back-end
 * @param {string} url
 * @returns {string}
 */
const prependUrl = (url: string): string => {
    const envVar: string = process.env.REACT_APP_API_ENDPOINT || '';
    const baseUrl = envVar.endsWith('/') ? envVar.slice(-1) : envVar;
    const path = url.startsWith('/') ? url : `/${url}`;
    return baseUrl + path;
};
export const ApiClient = {
    get<T>(url: string, config?: AxiosRequestConfig) {
        return Axios.get<T>(prependUrl(url), config);
    },
    post<T, K>(url: string, data: T, config?: AxiosRequestConfig) {
        return Axios.post<K>(prependUrl(url), data, config);
    },
    put<T, K>(url: string, data: T, config?: AxiosRequestConfig) {
        return Axios.put<K>(prependUrl(url), data, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return Axios.delete(prependUrl(url), config);
    },
};
