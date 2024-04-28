import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: 'brand_name',
        header: () => 'Brand Name',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'legal_name',
        header: () => 'Legal Name',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'location',
        header: () => 'Location',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'office_phone',
        header: () => 'Office Phone',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'website_url',
        header: () => 'Website',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'logo_url',
        header: () => 'Logo',
        cell: info => info.getValue(),
    },
    {
        id: 'edit',
        header: () => 'Actions',
        cell: ({ row }) => <Button size="sm" onClick={() => handleEdit(row.original.id)}>Edit</Button>,
    },
];

function handleEdit(id: number): void {
    // Implementation for edit action
    console.log(`Edit company with ID: ${id}`);
    // You would typically navigate to an edit page or open a modal here
}
