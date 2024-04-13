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
    data: DownloadLists[];
    categories: Category[]; // Add this line
    onRefresh: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, categories, onRefresh }) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [editingRow, setEditingRow] = useState<DownloadLists | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<DownloadLists | null>(null);

    const logoFileRef = useRef<HTMLInputElement>(null);

    const columns: ColumnDef<DownloadLists>[] = [
        {
            accessorKey: 'userId',
            header: () => 'User ID',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'fileName',
            header: () => 'File Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'downloadDate',
            header: () => 'Download Date',
            cell: info => info.getValue(),
        },
    ];






    // Function to close the dialog
    function handleCloseDialog() {
        setDialogOpen(false);
        setEditingCompanyId(null); // Reset the editing ID
    }

    // A handler to cancel editing
    const handleCancelClick = () => {
        setEditingRow(null);
    };

    // A handler to save the edited data
    const handleSaveClick = (updatedRow: DownloadLists) => {
        // Call an API to save the updated data or update your state
        console.log('Save the updated data:', updatedRow);
        // After saving, clear the editing state
        setEditingRow(null);
    };


    const uploadLogo = async (logoFile: string | Blob, companyName: string) => {
        const formData = new FormData();
        formData.append('file', logoFile);
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }

        console.log(`Uploading logo for company: ${companyName}`);
        console.log(`Uploading logo File : ${logoFile}`);

        try {
            const response = await fetch(`/api/upload?Companies_name=${encodeURIComponent(companyName)}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Logo upload failed: ${errorData.message}`);
                throw new Error(`Logo upload failed: ${errorData.message}`);
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Error during logo upload:', error);
            throw error;
        }
    };


    // Save the updated data
    // Save the updated data
    const handleSave = async () => {
        if (!editingCompany) {
            console.error('No company is being edited');
            return;
        }



        // Access the file using the ref
        const logoFile = logoFileRef.current?.files?.[0];

        if (logoFile) {
            // Use the uploadLogo function to upload the file
            try {
                const logoUrl = await uploadLogo(logoFile, editingCompany.brand_name);
                editingCompany.logo_url = logoUrl; // Update the logo URL
            } catch (error) {
                console.error('Error uploading logo:', error);
                // Handle errors appropriately
                return;
            }
        }

        // Convert editorState to raw content or HTML as needed before saving
        // const rawContentState = convertToRaw(editorState.getCurrentContent());
        const description = rawContentState.blocks.map(block => block.text).join('\n');
        editingCompany.description = description;
        // Update the categories in the company being edited
        const updatedCompanyData = {
            ...editingCompany,
            categories: selectedCategories // Updated categories
        };

        try {
            // Assuming your API endpoint is /api/companies and it accepts PUT requests
            const response = await fetch('/api/companies', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCompanyData),
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('DownloadLists updated successfully:', result);

            // Add logic here to handle the updated company, e.g., updating the UI or state
            // Update the companies state to reflect the changes

            // Call the onRefresh function passed from the parent
            onRefresh();
            toast({
                variant: "success",
                title: "DownloadLists updated successfully",
            })
            // Close the dialog after successful update
            setDialogOpen(false);
        } catch (error) {
            console.error('Failed to update company:', error);
            // Handle errors, e.g., show an error message to the user
        }
    };


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
                                            column.toggleVisibility(!!value)
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
            {/* Render the edit form if editingRow is not null */}
            {editingRow && (
                <div>
                    {/* Replace with your form fields */}
                    <Input type="text" value={editingRow['brand_name']} />
                    {/* Add other fields as needed */}
                    <Button onClick={() => handleSaveClick(editingRow)}>Save</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
            )}

            {/* Dialog for editing */}
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit DownloadLists</DialogTitle>
                            <DialogDescription>
                                Update the details of the company.
                            </DialogDescription>
                        </DialogHeader >
                        <div className="grid grid-cols-2 gap-4">
                            <section className="flex flex-col gap-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Brand Name:</Label>
                                    <Input

                                        type="text"
                                        name="brand_name"
                                        placeholder="Brand Name"
                                        value={editingCompany?.brand_name || ''}

                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            brand_name: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Legal Name:</Label>
                                    <Input
                                        type="text"
                                        name="legal_name"
                                        placeholder="Legal Name"
                                        value={editingCompany?.legal_name || ''}
                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            legal_name: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Location:</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        value={editingCompany?.location || ''}
                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            location: e.target.value
                                        }))}

                                    />
                                </div>

                                {/* Category Dropdown */}
                                <div className="flex flex-col gap-4">
                                    <Label>Category</Label>
                                    <CategoryDropdownMenu
                                        categories={categories}
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={setSelectedCategories}
                                    />
                                </div>

                            </section>
                            <section className="flex flex-col gap-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Office Phone:</Label>
                                    <Input
                                        type="text"
                                        name="office_phone"
                                        placeholder="Office Phone"
                                        value={editingCompany?.office_phone || ''}
                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            office_phone: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Website URL:</Label>
                                    <Input
                                        type="text"
                                        name="website_url"
                                        placeholder="Website URL"
                                        value={editingCompany?.website_url || ''}
                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            website_url: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Logo URL:</Label>

                                    <Input
                                        type="text"
                                        name="logo_url"
                                        placeholder="Logo URL"
                                        value={editingCompany?.logo_url || ''}
                                        onChange={(e) => setEditingCompany(prev => ({
                                            ...prev as DownloadLists, // Assert that prev is of type DownloadLists
                                            logo_url: e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="brand_name">Logo File:</Label>

                                    <Input type="file" ref={logoFileRef} />
                                </div>
                            </section>

                        </div>


                        <Button onClick={() => handleSave()}>Save</Button>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                    </DialogContent>
                </Dialog>
            )}

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