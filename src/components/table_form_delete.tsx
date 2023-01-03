import { Box, Button, Stack, Typography } from '@mui/material';
import { setModalIsOpen } from '../redux_store/modal_slice';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import ModalGeneral from './modal_general';
import { deleteCourse } from '../redux_store/course/course_action';

export default function TableFormDelete() {
    const { courseId } = useAppSelector((state) => state.modalSlice);
    const dispatch = useAppDispatch();

    const handleDelete = async (courseId: number) => {
        dispatch(deleteCourse(courseId));
        dispatch(setModalIsOpen({ status: false, modalId: '', courseId: 0 }));
    };

    return (
        <ModalGeneral modalId="delete" width="480px">
            <Box px={'16px'} py={'32px'}>
                <Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        fontFamily="var(--font-family)"
                        fontWeight="600"
                        textAlign="center"
                    >
                        Bạn có muốn xoá khoá học này?
                    </Typography>

                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        fontFamily="var(--font-family)"
                        fontWeight="500"
                        fontSize="14px"
                        fontStyle="italic"
                        textAlign="center"
                    >
                        (Hành động này sẽ xoá vĩnh viễn không thể khôi phục!)
                    </Typography>
                </Box>

                <Stack direction="row" mt={2} justifyContent="flex-end" alignItems="center" gap={2}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            courseId && handleDelete(courseId);
                        }}
                        sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                    >
                        Có
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(setModalIsOpen({ status: false, modalId: '', courseId: 0 }))}
                        sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                    >
                        Không
                    </Button>
                </Stack>
            </Box>
        </ModalGeneral>
    );
}
