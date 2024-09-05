import DownloadListPage from "./download";
import { getCustomerByEmail } from "@/lib/prisma/getCustomerByEmail";
import { getCustomerDownloadLinks } from "@/lib/prisma/customerDownloadLinks";
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function SettingsAccountPage() {
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  // Check if the user and email address are defined
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) {
    return <div>Error: Email address not found</div>;
  }

  const customer = await getCustomerByEmail(email);
  console.log(customer, "customer");
  if (!customer) {
    return <div>Error: Customer not found</div>;
  }

  const downloadLinks = await getCustomerDownloadLinks(customer.id);
  console.log(downloadLinks, "downloadLinks");

  return (
    <div className="flex flex-col gap-6">
      <DownloadListPage downloadsData={downloadLinks} />
    </div>
  );
}