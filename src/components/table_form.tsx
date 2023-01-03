import { useState, useEffect, useMemo } from 'react';
import { Backdrop, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ModalGeneral from './modal_general';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import { setModalIsOpen } from '../redux_store/modal_slice';
import { setIdForEdit, setCourseInfo } from '../redux_store/course/course_slice';
import ICourse from '../types/course';
import { createCourse, updateCourse } from '../redux_store/course/course_action';

interface IInputs {
    name: string;
    description: string;
    thumbnailUrl: string;
    level: string;
}

const schema = yup.object({
    name: yup.string().required('Bạn chưa nhập trường này!!'),
    description: yup.string().required('Bạn chưa nhập trường này!!'),
    thumbnailUrl: yup.string().required('Bạn chưa nhập trường này!!'),
    level: yup.string().required('Bạn chưa nhập trường này!!'),
});

export default function TableForm() {
    // Redux toolkit
    const { idForEdit, courseInfo } = useAppSelector((state) => state.courseSlice);
    const dispatch = useAppDispatch();

    // Hooks
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    // react-hook-form
    const defaultValues = useMemo(
        () => ({
            name: courseInfo.name,
            description: courseInfo.description,
            thumbnailUrl: courseInfo.thumbnailUrl,
            level: courseInfo.level,
        }),
        [courseInfo],
    );

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(schema),
    });

    // Actions
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleClose = () => {
        dispatch(setModalIsOpen({ status: false, modalId: '', courseId: 0 }));
        dispatch(setIdForEdit(0));
        dispatch(
            setCourseInfo({
                name: '',
                description: '',
                thumbnailUrl: '',
                level: '',
            }),
        );
    };

    const onSubmit: SubmitHandler<IInputs> = (inputData) => {
        setIsSubmit(true);

        if (idForEdit) {
            const courseInfo: ICourse = {
                id: idForEdit,
                name: inputData.name,
                description: inputData.description,
                thumbnailUrl: inputData.thumbnailUrl,
                level: inputData.level,
            };

            dispatch(updateCourse({ courseId: idForEdit, data: courseInfo }));
        } else {
            dispatch(createCourse(inputData));
        }

        handleClose();
        setIsSubmit(false);
    };

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={isSubmit}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalGeneral modalId={idForEdit ? 'update' : 'add'} width="480px">
                <Box px={'16px'} py={'32px'}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        fontFamily="var(--font-family)"
                        fontWeight="600"
                        textAlign="center"
                    >
                        {idForEdit ? 'Chỉnh sửa khoá học' : 'Thêm mới khoá học'}
                    </Typography>

                    <Stack component="form" gap={1} mt={'24px'} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <TextField
                                    error={Boolean(errors.name)}
                                    variant="outlined"
                                    label="Tên khoá học"
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputRef={field.ref}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="name" as="p" style={{ color: 'red', margin: '0' }} />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <TextField
                                    error={Boolean(errors.description)}
                                    variant="outlined"
                                    label="Mô tả khoá học"
                                    multiline
                                    rows={4}
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputRef={field.ref}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="description" as="p" style={{ color: 'red', margin: '0' }} />

                        <Controller
                            control={control}
                            name="thumbnailUrl"
                            render={({ field }) => (
                                <TextField
                                    error={Boolean(errors.thumbnailUrl)}
                                    variant="outlined"
                                    label="Hình ảnh khoá học"
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputRef={field.ref}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="thumbnailUrl"
                            as="p"
                            style={{ color: 'red', margin: '0' }}
                        />

                        <Controller
                            control={control}
                            name="level"
                            render={({ field }) => (
                                <TextField
                                    error={Boolean(errors.level)}
                                    variant="outlined"
                                    label="Trình độ"
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputRef={field.ref}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="level" as="p" style={{ color: 'red', margin: '0' }} />

                        <Stack direction="row" justifyContent="flex-end" gap={1} mt="16px">
                            <LoadingButton variant="outlined" type="submit">
                                {idForEdit !== 0 ? 'Lưu' : 'Thêm mới'}
                            </LoadingButton>
                            <Button variant="contained" onClick={handleClose}>
                                Huỷ bỏ
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </ModalGeneral>
        </>
    );
}
