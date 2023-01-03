import { ReactNode } from 'react';
import { Box, Stack, CircularProgress } from '@mui/material';
import { useAppSelector } from '../redux_store/store';

interface IContentOnly {
    children: ReactNode;
}

function ContentOnly({ children }: IContentOnly) {
    const { isLoading } = useAppSelector((state) => state.authSlice);

    return (
        <>
            {isLoading && (
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.07)', zIndex: '9999' }}
                >
                    <CircularProgress />
                </Stack>
            )}

            <Box>{children}</Box>
        </>
    );
}

export default ContentOnly;
