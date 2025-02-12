import { getAllCustomerTransactions } from "@/lib/prisma/getCustomerTransactions";
import { currentUser } from '@clerk/nextjs/server';
import DataTable from "../data-table-history";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllCustomerDownloadLinks } from "@/lib/prisma/customerDownloadLinks";

const SkeletonDataTable: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/4" />
    </div>
  );
};

export default async function HistoryPage() {
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  // Check if the user is defined
  if (!user) {
    return <div>Error: User not found</div>;
  }

  const alldownloadLinks = await getAllCustomerDownloadLinks();
  console.log(alldownloadLinks, "alldownloadLinks");

  // Fetch all customer transactions for admin
  const transactions = await getAllCustomerTransactions();
  console.log(transactions, "transactions");

  const transformedData = transactions.map((transaction: any) => {
    const customerDownloads = alldownloadLinks.filter((link: { customerId: any; }) => link.customerId === transaction.customer.id);
    const downloadLinks = customerDownloads.flatMap((download: { links: any; }) => download.links);

    return {
      id: transaction.id,
      amount: transaction.total,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.paidAt,
      customerId: transaction.customer.id,
      customerName: transaction.customer.name,
      customerEmail: transaction.customer.email,
      orderItems: transaction.orderItems ? transaction.orderItems.map((item: { id: any; quantity: any; price: any; productSlug: any; }) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        productSlug: item.productSlug,
      })) : [], // Default to an empty array if orderItems is undefined
      downloadLinks: downloadLinks,
    };
  });

  return (
    <Suspense fallback={<SkeletonDataTable />}>
      <div className="flex flex-col gap-6">
        {transformedData.length > 0 ? (
          <DataTable data={transformedData} />
        ) : (
          <div>No Transactions yet</div>
        )}
      </div>
    </Suspense>
  );
}