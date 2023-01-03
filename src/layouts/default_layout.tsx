import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from './navbar';
import Sidebar from '../components/sidebar';

interface IDefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: IDefaultLayoutProps) {
    return (
        <Box sx={{ backgroundColor: '#ddd' }}>
            <Box
                sx={{
                    display: 'grid',
                    height: '100%',
                    gridTemplateColumns: '1.2fr 5fr',
                    gap: 1,
                    marginRight: 1,
                }}
            >
                <Sidebar />
                <Box>
                    <Navbar />
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default DefaultLayout;
