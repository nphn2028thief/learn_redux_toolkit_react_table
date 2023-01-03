import { useEffect, useState } from 'react';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Add, SearchOutlined } from '@mui/icons-material';

import { setModalIsOpen } from '../redux_store/modal_slice';
import { useAppDispatch } from '../redux_store/store';
import useDebounced from '../hooks/useDebounced';
import { getCourses, searchCourse } from '../redux_store/course/course_action';

export default function TableToolbar() {
    const dispatch = useAppDispatch();

    const [searchInput, setSearchInput] = useState<string>('');
    const debouncedValue = useDebounced(searchInput, 700);

    useEffect(() => {
        if (!debouncedValue.trim) {
            dispatch(getCourses());
            return;
        }

        dispatch(searchCourse(debouncedValue));
    }, [debouncedValue, dispatch]);

    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: 1,
                marginTop: 1,
                marginBottom: 1,
                border: '1px solid #ccc',
                borderRadius: '4px',
            }}
        >
            <Button
                variant="outlined"
                onClick={() => dispatch(setModalIsOpen({ status: true, modalId: 'add' }))}
                sx={{ gap: 1 }}
            >
                <Add />
                Thêm khoá học
            </Button>

            <TextField
                label="Nhập tên khoá học!"
                size="small"
                variant="outlined"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                sx={{
                    minWidth: '320px',
                    fontSize: '14px',
                    borderRadius: '4px',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ display: 'flex' }}>
                            <SearchOutlined />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}
