import DownloadListPage from "./download";
import { getCustomerByEmail } from "@/lib/prisma/getCustomerByEmail";
import { getCustomerDownloadLinks } from "@/lib/prisma/customerDownloadLinks";
import { auth, currentUser } from '@clerk/nextjs/server';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from "react";
import { getCustomerTransactions } from "@/lib/prisma/getCustomerTransactions";
import { getUser } from "@/lib/getUser";
import { Separator } from "@/components/ui/separator";

const SkeletonDownloadList: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/4" />
    </div>
  );
};

export default async function SettingsAccountPage() {
  try {
    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser();

    // Check if the user and email address are defined
    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) {
      return <div>Error: Email address not found</div>;
    }

    const userData = await getUser();
    const customers = await getCustomerByEmail(email);
    if (!customers || customers.length === 0) {
      return <div>Error: Customer not found</div>;
    }

    const customer = customers[0];
    console.log(customer, "customer");
    const CustomerTransactions = await getCustomerTransactions(customer.id.toString());
    // console.log(CustomerTransactions, "CustomerTransactions");
    const downloadLinks = await getCustomerDownloadLinks(customer.id);
    console.log(downloadLinks, "downloadLinks");

    return (
      <div className="flex flex-col gap-2">
        <div className='flex flex-col gap-2'>
          <div>
            <h3 className="text-lg font-medium">Download Page</h3>
            <p className="text-sm text-muted-foreground">
              Here you can download your purchased items.
            </p>
          </div>
          <Separator />
        </div>
        <Suspense fallback={<SkeletonDownloadList />}>
          <DownloadListPage downloadsData={downloadLinks} CustomerTransactions={CustomerTransactions} userData={userData} customer={customer.id} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in SettingsAccountPage:', error);
    return <div>An error occurred while loading the page. Please try again later.</div>;
  }
}