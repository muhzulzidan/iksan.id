// pages/member/history/page.tsx

import { getCustomerByEmail } from "@/lib/prisma/getCustomerByEmail";
import { getCustomerTransactions } from "@/lib/prisma/getCustomerTransactions";
import { currentUser } from '@clerk/nextjs/server';
import DataTable from "../data-table-history";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from "@/components/ui/separator";

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

  // Check if the user and email address are defined
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) {
    window.location.reload();
    return <div>Error: Email address not found</div>;
  }

  const customer = await getCustomerByEmail(email);
  console.log(customer, "customer");
  if (!customer) {
    window.location.reload();
    return <div>Error: Customer not found</div>;
  }

  const downloadLinks = await getCustomerTransactions(customer.id);
  console.log(downloadLinks, "downloadLinks");

  const transformedData = downloadLinks.map((link: { id: any; total: any; status: any; createdAt: any; paidAt: any; orderItems: any[]; }) => ({
    id: link.id,
    amount: link.total,
    status: link.status,
    createdAt: link.createdAt,
    updatedAt: link.paidAt,
    orderItems: link.orderItems.map((item: { id: any; quantity: any; price: any; productSlug: any; }) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      productSlug: item.productSlug,
    })),
  }));

  return (
    <Suspense fallback={<SkeletonDataTable />}>
      <div className="flex flex-col gap-6">
        <div className='flex flex-col gap-2'>
          <div>
            <h3 className="text-lg font-medium">History Page</h3>
            <p className="text-sm text-muted-foreground">
              Here you can view your transaction history.
            </p>
          </div>
          <Separator />
        </div>
        {transformedData.length > 0 ? (
          <DataTable data={transformedData} />
        ) : (
          <div>No Transactions yet</div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 italic">*** Anda akan dihubungi melalui WhatsApp jika Anda sudah membayar untuk kelas. ***</p>
      </div>
    </Suspense>
  );
}