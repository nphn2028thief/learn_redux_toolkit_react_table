import { ILoginInfo, IRegisterInfo } from '../types/user';
import { createClient } from './axios_client';

const userClient = createClient('http://localhost:3001/');
// const userClient = createClient('https://instagram-api-two.vercel.app/api/v1/');

const userApi = {
    login: (data: Omit<ILoginInfo, 'id'>) => {
        return userClient.post('auth/login', data);
    },
    register: (data: Omit<IRegisterInfo, 'id'>) => {
        return userClient.post('auth_register', data);
    },
    getMe: (token: string) => {
        return userClient.get('auth/me', {
            params: {
                token,
            },
        });
    },
};

export default userApi;
