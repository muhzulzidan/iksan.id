"use client"

import { SetStateAction, useState, useRef } from "react";
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
    onRefresh: () => void;
}



const DataTable: React.FC<DataTableProps> = ({ data, onRefresh }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

console.log(data, "data table")

    const columns: ColumnDef<CustomerDownloadData>[] = [
        // {
        //     accessorKey: 'userId',
        //     header: () => 'User ID',
        //     cell: info => info.getValue(),
        // },
        {
            accessorKey: 'link',
            header: () => 'Link',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'download',
            header: () => 'download',
            cell: info => {
                const download = info.getValue() ;
              
                return (
                    <a href={`${download}`} className="flex flex-col">
                        <Button variant={"link"}>Download</Button>
                    </a>
                );
            },
        },
        {
            accessorKey: 'fullname',
            header: () => 'Full Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'download',
            header: () => 'download',
            cell: info => {
                const date = info.getValue();
                return (
                    <a href={`${date}`} className="flex flex-col">
                        <Button variant={"link"}>download</Button>
                    </a>
                );
            },
        },
       
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


            <div className="flex items-center py-4">
                <div className="flex gap-2 w-1/2">
                    <Input
                        placeholder="Filter Brand Name..."
                        onChange={(event) => {
                            const value = event.target.value;
                            setColumnFilters((old) =>
                                old
                                    .filter((filter) => filter.id !== "brand_name") // Remove the existing email filter
                                    .concat(value ? [{ id: "brand_name", value }] : []) // Add the new email filter if value is not empty
                            );
                        }}
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filter location..."
                        onChange={(event) => {
                            const value = event.target.value;
                            setColumnFilters((old) =>
                                old
                                    .filter((filter) => filter.id !== "location") // Remove the existing email filter
                                    .concat(value ? [{ id: "location", value }] : []) // Add the new email filter if value is not empty
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

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
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



export default DataTable