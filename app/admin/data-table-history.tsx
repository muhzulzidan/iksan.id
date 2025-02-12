"use client"

import { SetStateAction, useState, useRef, Suspense } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDataTable: React.FC = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
        </div>
    );
};

interface DataTableProps {
    data: any[];
}

const DataTable: React.FC<any> = ({ data }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'customerInfo',
            header: () => 'Customer Info',
            cell: info => {
                const customerName = info.row.original.customerName;
                const customerEmail = info.row.original.customerEmail;
                return (
                    <div>
                        <div>{customerName}</div>
                        <div className="text-sm text-gray-500">{customerEmail}</div>
                    </div>
                );
            },
            filterFn: (row, columnId, filterValue) => {
                const customerName = row.original.customerName.toLowerCase();
                const customerEmail = row.original.customerEmail.toLowerCase();
                const searchValue = filterValue.toLowerCase();
                return customerName.includes(searchValue) || customerEmail.includes(searchValue);
            },
        },
        {
            accessorKey: 'amount',
            header: () => 'Amount',
            cell: info => {
                const value = info.getValue() as number; // Cast to number
                const formattedValue = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(value);
                return formattedValue;
            },
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'createdAt',
            header: () => 'Created At',
            cell: info => {
                const value = info.getValue();
                const date = new Date(value as string | number | Date);
                if (isNaN(date.getTime())) {
                    return 'Invalid date';
                }
                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(date);
                return formattedDate;
            },
        },
        {
            accessorKey: 'orderItems',
            header: () => 'Order Items',
            cell: info => {
                const items = info.getValue() as any;
                return (
                    <ul>
                        {items.map((item: any) => (
                            <li key={item.id}>
                                {item.quantity} x {item.productSlug} @ {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                            </li>
                        ))}
                    </ul>
                );
            },
        },
        {
            accessorKey: 'downloadLinks',
            header: () => 'Download Links',
            cell: info => {
                const links = info.getValue() as string[];
                return (
                    <div className="flex flex-col gap-2">
                        {links.map((link, index) => (
                            <a key={index} href={link} className="flex flex-col">
                                <Button variant={"default"} className="w-full bg-secondary1 hover:bg-blue-700">Download</Button>
                            </a>
                        ))}
                    </div>
                );
            },
        },
        // Add other columns as needed
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    function toggleColumnVisibility(column: any, value: boolean) {
        if (column.id === 'userId') {
            // If the column is 'userId', set its visibility to false by default
            column.toggleVisibility(value);
            console.log(value, "toggleVisibility")

        } else {
            // For other columns, use the provided value
            column.toggleVisibility(value);
        }
    }

    return (

        <div className="w-full">
            <div className="flex items-center pb-4">
                <Suspense fallback={<SkeletonDataTable />}>
                    <div className="flex gap-2 w-1/2">
                        <Input
                            placeholder="Filter Customer Info..."
                            onChange={(event) => {
                                const value = event.target.value;
                                setColumnFilters((old) =>
                                    old
                                        .filter((filter) => filter.id !== "customerInfo") // Remove the existing filter
                                        .concat(value ? [{ id: "customerInfo", value }] : []) // Add the new filter if value is not empty
                                );
                            }}
                            className="max-w-sm"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Filter Column
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                toggleColumnVisibility(column, !!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Suspense>
            </div>
            <Suspense fallback={<SkeletonDataTable />}>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-secondary1 text-stone-50 hover:bg-blue-600">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Suspense>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((old) => ({ ...old, pageIndex: old.pageIndex - 1 }))}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((old) => ({ ...old, pageIndex: old.pageIndex + 1 }))}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>

    );
};

export default DataTable;