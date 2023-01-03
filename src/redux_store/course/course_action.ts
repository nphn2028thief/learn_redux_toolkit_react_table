import { createAsyncThunk } from '@reduxjs/toolkit';
import ICourse from '../../types/course';
import httpRequest from '../../utils/httpRequest';

export const getCourses = createAsyncThunk('courses/getCourses', async (_, thunkAPI) => {
    try {
        const response = await httpRequest.get<ICourse[]>('courses', {
            signal: thunkAPI.signal,
        });

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async (data: Omit<ICourse, 'id'>, { rejectWithValue }) => {
        try {
            const response = await httpRequest.post<ICourse>('courses', data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async ({ courseId, data }: { courseId: number; data: ICourse }, { rejectWithValue }) => {
        try {
            const response = await httpRequest.patch<ICourse>(`courses/${courseId}`, data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId: number, { rejectWithValue }) => {
    try {
        await httpRequest.delete<number>(`courses/${courseId}`);

        return courseId;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const searchCourse = createAsyncThunk('courses/search', async (keyword: string, { rejectWithValue }) => {
    try {
        const response = await httpRequest.get(`courses?q=${keyword}`);

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
