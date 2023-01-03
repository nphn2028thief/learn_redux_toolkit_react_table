import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authLogin } from '../redux_store/login/auth_actions';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useMemo } from 'react';

interface ILoginForm {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().required('Bạn chưa nhập trường này!!').email('Email không đúng định dạng!!'),
    password: yup.string().required('Bạn chưa nhập trường này!!'),
});

function LoginForm() {
    const { loginInfo } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const defaultValues = useMemo(
        () => ({
            email: loginInfo.email,
            password: loginInfo.password,
        }),
        [loginInfo],
    );

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        dispatch(authLogin(data)).then(() => navigate('/'));
    };

    return (
        <>
            <Stack sx={{ alignItems: 'center' }}>
                <Typography variant="h5" component="h1" sx={{ py: '20px' }}>
                    Login to System
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: 'flex', width: '30%', flexDirection: 'column', gap: '20px' }}
                >
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextField
                                error={Boolean(errors.email)}
                                type="email"
                                label="Email"
                                value={field.value}
                                onChange={field.onChange}
                                inputRef={field.ref}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="email" as="p" style={{ color: 'red', margin: '0' }} />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <TextField
                                error={Boolean(errors.password)}
                                type="password"
                                label="Password"
                                value={field.value}
                                onChange={field.onChange}
                                inputRef={field.ref}
                            />
                        )}
                    />
                    <ErrorMessage errors={errors} name="password" as="p" style={{ color: 'red', margin: '0' }} />

                    <Button type="submit" variant="contained">
                        Đăng nhập
                    </Button>
                </Box>
            </Stack>
        </>
    );
}

export default LoginForm;
