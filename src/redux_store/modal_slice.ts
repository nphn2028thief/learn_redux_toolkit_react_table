import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
    status: boolean;
    modalId: string;
    courseId?: number;
}

const initialState: IState = {
    status: false,
    modalId: '',
    courseId: 0,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalIsOpen: (state, action: PayloadAction<IState>) => {
            const { modalId, status, courseId } = action.payload;
            state.status = status;
            state.modalId = modalId;
            state.courseId = courseId;
        },
    },
});

export const { setModalIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
