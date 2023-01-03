import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ICourse from '../types/course';
import httpRequest from '../utils/httpRequest';

type TInputs = {
    nameInput: string;
    descInput: string;
    urlInput: string;
};

// const schema = yup
//     .object({
//         username: yup.string().required(),
//         password: yup.string().required(),
//     })
//     .required();

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Form() {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<TInputs>({
        // resolver: yupResolver(schema),
        defaultValues: {
            nameInput: '',
            descInput: '',
            urlInput: '',
        },
    });

    const onSubmit: SubmitHandler<TInputs> = (data) => {
        const newData = {
            name: data.nameInput,
            description: data.descInput,
            thumbnailUrl: data.urlInput,
        };

        setIsLoading(true);

        const createCourses = async (data: Omit<ICourse, 'id'>) => {
            try {
                const response = await httpRequest.post<ICourse>('courses', data);
                const dataResponse = await response.data;

                console.log(dataResponse);
                reset();
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        // createCourses(newData);
    };

    const getCourseInfo = () => {
        const courseInfo = getValues();
        console.log(courseInfo);
    };

    return (
        <div>
            <Modal open={isOpen}>
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '480px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        p: '32px 16px',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        fontFamily="var(--font-family)"
                        fontWeight="600"
                        textAlign="center"
                    >
                        Thêm khoá học
                    </Typography>

                    <Stack component="form" gap={1} mt={'24px'} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            error={Boolean(errors.nameInput)}
                            variant="outlined"
                            {...register('nameInput', {
                                required: 'Bạn chưa nhập trường này!!',
                            })}
                            label="Tên khoá học"
                            disabled={isLoading}
                        />
                        <ErrorMessage errors={errors} name="nameInput" as="p" style={{ color: 'red', margin: '0' }} />

                        <TextField
                            error={Boolean(errors.descInput)}
                            variant="outlined"
                            {...register('descInput', {
                                required: 'Bạn chưa nhập trường này!!',
                            })}
                            label="Mô tả khoá học"
                            multiline
                            rows={4}
                            disabled={isLoading}
                        />
                        <ErrorMessage errors={errors} name="nameInput" as="p" style={{ color: 'red', margin: '0' }} />

                        <TextField
                            error={Boolean(errors.urlInput)}
                            variant="outlined"
                            {...register('urlInput', {
                                required: 'Bạn chưa nhập trường này!!',
                            })}
                            label="Hình ảnh khoá học"
                            disabled={isLoading}
                        />
                        <ErrorMessage errors={errors} name="nameInput" as="p" style={{ color: 'red', margin: '0' }} />

                        <Stack direction="row" justifyContent="flex-end" gap={1} mt="16px">
                            <Button variant="contained" onClick={getCourseInfo}>
                                Chỉnh sửa
                            </Button>
                            <LoadingButton variant="outlined" loading={isLoading} type="submit">
                                Thêm mới
                            </LoadingButton>
                            <Button variant="contained" disabled={isLoading}>
                                Huỷ bỏ
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
