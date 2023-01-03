import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useReducer, useState } from 'react';

interface Course {
    id: number | string;
    name: string;
    description: string;
    thumbnailUrl: string;
}

const defaultData: Course[] = [
    {
        id: 1,
        name: 'Xây dựng website với ReactJS 2',
        description:
            'Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.',
        thumbnailUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png',
    },
    {
        id: 2,
        name: 'Node & ExpressJS',
        description:
            'Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.',
        thumbnailUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
    },
    {
        id: 3,
        name: 'Lập Trình JavaScript Cơ Bản',
        description:
            'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.',
        thumbnailUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
    },
];

const columnHelper = createColumnHelper<Course>();

const columns = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Course</span>,
    }),
    columnHelper.accessor((row) => row.description, {
        id: 'description',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Summary</span>,
    }),
    columnHelper.accessor((row) => row.thumbnailUrl, {
        id: 'thumbnailUrl',
        cell: (info) => <img src={info.getValue()} alt="course-img" />,
        header: () => <span>Summary</span>,
    }),
    // columnHelper.accessor('age', {
    //     header: () => 'Age',
    //     cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('visits', {
    //     header: () => <span>Visits</span>,
    // }),
    // columnHelper.accessor('status', {
    //     header: () => 'Status',
    // }),
    // columnHelper.accessor('progress', {
    //     header: 'Profile Progress',
    // }),
];

function ReactTableCourse() {
    const [data, setData] = useState(() => [...defaultData]);
    const rerender = useReducer(() => ({}), {})[1];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((visibleCell) => (
                                <td key={visibleCell.id}>
                                    {flexRender(visibleCell.column.columnDef.cell, visibleCell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {/* <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            </table>
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    );
}

export default ReactTableCourse;
