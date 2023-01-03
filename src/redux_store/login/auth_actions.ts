import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/user';
import { ILoginInfo, IRegisterInfo } from '../../types/user';

export const authLogin = createAsyncThunk(
    'auth/authLogin',
    async (data: Omit<ILoginInfo, 'id'>, { rejectWithValue }) => {
        try {
            const response = await userApi.login(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const authRegister = createAsyncThunk(
    'auth/authRegister',
    async (data: Omit<IRegisterInfo, 'id'>, { rejectWithValue }) => {
        try {
            const response = await userApi.register(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (token: string, thunkAPI) => {
    try {
        const response = await userApi.getMe(token);
        return response.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});
