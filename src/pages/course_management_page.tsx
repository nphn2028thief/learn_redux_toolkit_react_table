import { Box } from '@mui/material';

import TableDemo from '../components/table';
import TableForm from '../components/table_form';
import TableFormDelete from '../components/table_form_delete';
import TableToolbar from '../components/table_toolbar';

export default function CourseManagementPage() {
    return (
        <Box>
            <TableToolbar />

            <TableForm />

            <TableFormDelete />
            <TableDemo />
        </Box>
    );
}
