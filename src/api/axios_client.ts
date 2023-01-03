import axios, { AxiosError } from 'axios';

const HTTP_URL = `localhost:3000/api`;

export const getClientToken = () => {
    return axios.defaults.headers.common['Authorization'];
};

export const setClientToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const createClient = (url = HTTP_URL) => {
    const baseURL = url;

    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
    });

    instance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error: AxiosError) => {
            return Promise.reject(error.response?.data);
        },
    );

    instance.interceptors.request.use(
        (config) => {
            config.headers = {
                Authorization: getClientToken(),
                ...config.headers,
            };
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return instance;
};
