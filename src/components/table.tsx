import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    IconButton,
    Stack,
    Typography,
    CircularProgress,
    Pagination,
    Tooltip,
} from '@mui/material';
import { DeleteOutlineOutlined, ModeEditOutlineOutlined } from '@mui/icons-material';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import ICourse from '../types/course';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import { setModalIsOpen } from '../redux_store/modal_slice';
import { setIdForEdit, setCourseInfo } from '../redux_store/course/course_slice';
import { getCourses } from '../redux_store/course/course_action';

const columnHelper = createColumnHelper<ICourse>();

export default function TableDemo() {
    // Redux toolkit
    const { courses, isLoading } = useAppSelector((state) => state.courseSlice);
    const dispatch = useAppDispatch();

    // Hooks
    const [page, setPage] = useState<number>(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rowsPerPage, setRowsPerPage] = useState<number>(15);
    useEffect(() => {
        const promise = dispatch(getCourses());

        return () => promise.abort();
    }, [dispatch]);

    const columns = [
        columnHelper.accessor('id', {
            header: () => (
                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700' }}>
                    #
                </Typography>
            ),
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => (
                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700' }}>
                    Tên khoá học
                </Typography>
            ),
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('description', {
            header: () => (
                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700' }}>
                    Mô tả
                </Typography>
            ),
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('level', {
            header: () => (
                <Typography variant="h6" sx={{ minWidth: '110px', fontSize: '18px', fontWeight: '700' }}>
                    Trình độ
                </Typography>
            ),
            cell: (info) => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => (
                <Typography variant="h6" sx={{ minWidth: '110px', fontSize: '18px', fontWeight: '700' }}>
                    Chức năng
                </Typography>
            ),
            cell: (course) => (
                <Stack direction="row" gap="4px">
                    <Tooltip title="Edit" arrow>
                        <IconButton
                            aria-label="Edit"
                            onClick={() => {
                                dispatch(setIdForEdit(course.row.original.id));
                                dispatch(setModalIsOpen({ status: true, modalId: 'update' }));
                                dispatch(setCourseInfo(course.row.original));
                            }}
                        >
                            <ModeEditOutlineOutlined color="primary" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete" arrow>
                        <IconButton
                            aria-label="Delete"
                            onClick={() =>
                                dispatch(
                                    setModalIsOpen({
                                        status: true,
                                        modalId: 'delete',
                                        courseId: course.row.getValue('id'),
                                    }),
                                )
                            }
                        >
                            <DeleteOutlineOutlined color="error" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        }),
    ];

    // Tanstack react-table
    const table = useReactTable({
        data: courses,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer
                sx={{
                    maxHeight: 'calc(100vh - 216px)',
                    overflowY: 'overlay',
                }}
            >
                <Table stickyHeader>
                    {/* Header */}
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        key={header.id}
                                        sx={({ palette }) => ({
                                            backgroundColor: palette.primary.main,
                                            color: 'white',
                                            '&:nth-of-type(1)': {
                                                width: '47px',
                                                textAlign: 'center',
                                            },
                                            '&:nth-of-type(2)': {
                                                width: '200px',
                                            },
                                            '&:nth-of-type(4), &:nth-of-type(5)': {
                                                width: '142px',
                                            },
                                        })}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    {/* Body */}
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ height: 'calc(100vh - 278px)', textAlign: 'center' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : courses.length > 0 ? (
                            table
                                .getRowModel()
                                .rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            userSelect: 'none',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.07)',
                                            },
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                sx={{
                                                    fontSize: '16px',
                                                    height: '74px',
                                                    '&:nth-of-type(1)': { textAlign: 'center' },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: '2',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow sx={{ height: 'calc(100vh - 278px)' }}>
                                <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                                    Không có dữ liệu!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pl="4px"
                pr={4}
                py="12px"
                borderTop="2px solid #e0e0e0"
            >
                <Pagination
                    count={Math.ceil(courses.length / rowsPerPage)}
                    page={page}
                    defaultPage={1}
                    color="primary"
                    onChange={handleChangePage}
                    showFirstButton
                    showLastButton
                    size="large"
                />

                <Typography fontSize={16}>Tổng số: {courses.length}</Typography>
            </Stack>
        </Paper>
    );
}
