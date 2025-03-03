"use client"

import { SetStateAction, useState, useRef, Suspense, useEffect } from "react";
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

interface DataTableProps {
    data: CustomerDownloadData[];
}

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

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [tableData, setTableData] = useState(data);

    const handleDownload = (encodedUrl: string) => {
        try {
            console.log('Encoded URL:', encodedUrl);
            const decodedUrl = atob(encodedUrl);
            console.log('Decoded URL:', decodedUrl);
            window.location.href = decodedUrl;
        } catch (error) {
            console.error('Failed to decode URL:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/delete-download-link', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete download link');
            }

            setTableData((prevData) => prevData.filter((item) => item.id !== id));
            toast({
                variant: "default",
                title: `Item deleted successfully`,
            });
        } catch (error) {
            console.error('Error deleting download link:', error);
            toast({
                variant: "destructive",
                title: `Failed to delete item`,
            });
        }
    };

    const columns: ColumnDef<CustomerDownloadData>[] = [
        {
            accessorKey: 'link',
            header: () => 'Link',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'download',
            header: () => 'Download',
            cell: info => {
                const date = info.getValue();
                return (
                    <a className="flex flex-col" onClick={() => handleDownload(`${date}`)}>
                        <Button variant={"default"} className="w-full bg-secondary1 hover:bg-blue-700">Download</Button>
                    </a>
                );
            },
        },
        // {
        //     accessorKey: 'delete',
        //     header: () => 'Delete',
        //     cell: info => {
        //         const id = info.row.original.id;
        //         return (
        //             <Button variant={"destructive"} className="w-full" onClick={() => handleDelete(id)}>Delete</Button>
        //         );
        //     },
        // },
    ];

    const table = useReactTable({
        data: tableData,
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
            <Suspense fallback={<SkeletonDataTable />}>
                <div className="flex items-center py-4">
                    <div className="flex gap-2 w-1/2">
                        <Input
                            placeholder="Filter link Name..."
                            onChange={(event) => {
                                const value = event.target.value;
                                setColumnFilters((old) =>
                                    old
                                        .filter((filter) => filter.id !== "link") // Remove the existing email filter
                                        .concat(value ? [{ id: "link", value }] : []) // Add the new email filter if value is not empty
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
                </div>
            </Suspense>
            <Suspense fallback={<SkeletonDataTable />}>
                <div className="rounded-lg border">
                    <Table className="rounded-2xl border-collapse">
                        <TableHeader className=" text-stone-50 ">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-secondary1 rounded-t-lg hover:bg-blue-600 ">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="">
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
    )
}

export default DataTable;