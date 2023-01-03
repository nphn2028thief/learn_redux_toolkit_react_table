import axios, { AxiosInstance } from 'axios';

class HttpRequest {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3001/',
        });
    }
}

const httpRequest = new HttpRequest().instance;

export default httpRequest;
