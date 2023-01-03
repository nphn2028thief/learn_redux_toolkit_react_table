import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useReducer, useState } from 'react';

interface Person {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    status: string;
    progress: number;
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.group({
        id: 'fullName',
        header: () => <span>Full Name</span>,
        columns: [
            columnHelper.accessor((row) => row.firstName, {
                id: 'firstName',
                cell: (info) => info.getValue(),
                header: () => <span>First Name</span>,
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                cell: (info) => <i>{info.getValue()}</i>,
                header: () => <span>Last Name</span>,
            }),
        ],
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
    }),
    columnHelper.accessor('status', {
        header: () => 'Status',
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
    }),
];

function ReactTable() {
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

export default ReactTable;
