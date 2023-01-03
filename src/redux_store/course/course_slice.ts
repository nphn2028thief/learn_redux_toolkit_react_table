import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICourse from '../../types/course';
import { createCourse, deleteCourse, getCourses, paginateCourses, searchCourse, updateCourse } from './course_action';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

interface IState {
    idForEdit: number;
    courses: ICourse[];
    courseInfo: Omit<ICourse, 'id'>;
    isLoading: boolean;
}

const initialState: IState = {
    idForEdit: 0,
    courses: [],
    courseInfo: {
        name: '',
        description: '',
        thumbnailUrl: '',
        level: '',
    },
    isLoading: false,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setIdForEdit: (state, action: PayloadAction<number>) => {
            state.idForEdit = action.payload;
        },
        setCourseInfo: (state, action: PayloadAction<Omit<ICourse, 'id'>>) => {
            state.courseInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
            })
            .addCase(paginateCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const index = state.courses.findIndex((course) => course.id === action.payload.id);

                if (index !== -1) {
                    state.courses.splice(index, 1, action.payload);
                }
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                const newCourses = state.courses.filter((course) => course.id !== action.payload);
                state.courses = newCourses;
            })
            .addCase(searchCourse.fulfilled, (state, action) => {
                const results = action.payload;
                state.courses = results;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.startsWith('courses') && action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                },
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.startsWith('courses') && action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                },
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.startsWith('courses') && action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                },
            );
    },
});

export const { setIdForEdit, setCourseInfo } = courseSlice.actions;

export default courseSlice.reducer;
