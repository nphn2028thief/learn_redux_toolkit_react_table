import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import { setClientToken } from '../../api/axios_client';
import { ILoginInfo, IRegisterInfo } from '../../types/user';
import { authLogin, authRegister, getUserInfo } from './auth_actions';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface IState {
    isLoading: boolean;
    token: string;
    user: {
        username: string;
    } | null;
    error: string;
    loginInfo: Omit<ILoginInfo, 'id'>;
    registerInfo?: Omit<IRegisterInfo, 'id'>;
}

const initialState: IState = {
    isLoading: false,
    token: '',
    user: null,
    error: '',
    loginInfo: {
        email: '',
        password: '',
    },
    registerInfo: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginInfo: (state, action: PayloadAction<Omit<ILoginInfo, 'id'>>) => {
            state.loginInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle Login
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loginInfo = action.payload;
                localStorage.setItem('token', action.payload.refreshToken);
                state.token = action.payload.token;
                state.user = action.payload.user;
                setClientToken(action.payload.token);
                console.log('Login success');
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.registerInfo = action.payload;
                console.log('Register success');
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                setClientToken(action.payload.token);
            })
            .addMatcher<PendingAction>(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/rejected'),
                (state) => {
                    state.isLoading = false;
                },
            );
    },
});

export default authSlice.reducer;
