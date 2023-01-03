import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authRegister } from '../redux_store/login/auth_actions';
import { useAppDispatch } from '../redux_store/store';
import { ErrorMessage } from '@hookform/error-message';

interface IForm {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object({
    fullname: yup.string().required('Bạn chưa nhập trường này!!'),
    username: yup.string().required('Bạn chưa nhập trường này!!'),
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Bạn chưa nhập trường này!!'),
    password: yup
        .string()
        .min(6, 'Vui lòng nhập mật khẩu tối thiểu là 6 ký tự!')
        .required('Bạn chưa nhập trường này!!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không trùng khớp!!')
        .required('Bạn chưa nhập trường này'),
});

function RegisterForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IForm> = (data) => {
        console.log(data);
        dispatch(authRegister(data)).then(() => navigate('/login'));
    };

    return (
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
                    name="fullname"
                    render={({ field }) => (
                        <TextField
                            error={Boolean(errors.fullname)}
                            label="Tên đầy đủ"
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                        />
                    )}
                />
                <ErrorMessage errors={errors} name="fullname" as="p" style={{ color: 'red', margin: '0' }} />

                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <TextField
                            error={Boolean(errors.username)}
                            label="Tên đăng nhập"
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                        />
                    )}
                />
                <ErrorMessage errors={errors} name="username" as="p" style={{ color: 'red', margin: '0' }} />

                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <TextField
                            error={Boolean(errors.password)}
                            type="password"
                            label="Mật khẩu"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <ErrorMessage errors={errors} name="password" as="p" style={{ color: 'red', margin: '0' }} />

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <TextField
                            error={Boolean(errors.confirmPassword)}
                            type="password"
                            label="Nhập lại mật khẩu"
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                        />
                    )}
                />
                <ErrorMessage errors={errors} name="confirmPassword" as="p" style={{ color: 'red', margin: '0' }} />

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

                <Button type="submit" variant="contained">
                    Đăng ký
                </Button>
            </Box>
        </Stack>
    );
}

export default RegisterForm;
