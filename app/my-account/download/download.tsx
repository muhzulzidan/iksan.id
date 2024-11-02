"use client"

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";
import axios from 'axios';
import useStore from "@/store";
import { useRouter } from 'next/navigation';
import slugify from 'slugify';

const DownloadListPage = ({ downloadsData, CustomerTransactions, userData, customer }: { downloadsData: string[], CustomerTransactions: any, userData: any, customer: any }) => {
  console.log(CustomerTransactions, "CustomerTransactions");
  console.log(downloadsData, "downloadsData");
  console.log(customer, "customer");

  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { removeFromCart } = useStore();
  const router = useRouter();

  // Extract the PaymentId from CustomerTransactions
  const PaymentId = CustomerTransactions.find((transaction: any) => transaction.status === 'PAID')?.xenditId;

  console.log(PaymentId, "PaymentId");

  useEffect(() => {
    if (!PaymentId || !userData) {
      console.log('Missing PaymentId or user');
      return;
    }
    console.log(userData, "user");

    const checkPaymentStatus = async () => {
      console.log('Checking payment status');
      try {
        const response = await fetch(`/api/payment-status-xendit?xenditId=${PaymentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response, "response");
        if (!response.ok) {
          console.log('Failed to fetch payment status', response);
          throw new Error('Failed to fetch payment status');
        }

        const payment = await response.json();
        console.log(payment, "payment");

        if (payment && payment.order && payment.order.status === 'PAID') {
          setIsPaid(true);

          const downloadLinks = [];

          // Extract productSlugs from orderItems of PAID transactions
          const productSlugs = CustomerTransactions
            .filter((transaction: any) => transaction.status === 'PAID')
            .flatMap((transaction: any) => transaction.orderItems.map((item: any) => item.productSlug));

          for (const slug of productSlugs) {
            // Normalize the slug using slugify
            const normalizedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });
            const response = await axios.get(`/api/file-download?fileName=${normalizedSlug}`);
            const data = response.data;

            // Ensure the fileUrl is not null or an empty string before pushing
            if (data.fileUrl) {
              downloadLinks.push(data.fileUrl);
            }
          }
          
          const customerDownloadLinkResponse = await axios.post('/api/customer-download-links', {
            customerIksanId: userData.id,
            downloadLinks: downloadLinks,
          });
console.log(customerDownloadLinkResponse, "customerDownloadLinkResponse");
          if (customerDownloadLinkResponse.status === 200) {
            // Reset the cart
            productSlugs.forEach((slug: string) => removeFromCart(slug));
            // console.log('Redirecting to /my-account/download');
            // window.location.reload(); // Reload the page
          } else {
            console.error('Error adding links and user id to customer-download-link', customerDownloadLinkResponse.data);
          }

          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching payment status', err);
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
    // const intervalId = setInterval(checkPaymentStatus, 10000);
    // return () => clearInterval(intervalId);
  }, [PaymentId, CustomerTransactions, userData, router, removeFromCart]);

  const transformedData = downloadsData.map((download: string, index: any) => {
    const urlParts = download.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const linkName = fileName.replace(/_/g, ' ').split('.')[0];

    return {
      download: download,
      link: linkName,
    };
  });


  console.log(transformedData, "transformedData");
  return (
    <div className="">
      <section className="pb-24">
        {/* Displaying the list of downloads */}
        {
          downloadsData && downloadsData.length > 0 ? (
            <div className="">
              <DataTable data={transformedData} />
            </div>
          ) : (
            <div>No Downloads yet</div>
          )
        }
      </section>
    </div>
  );
};

export default DownloadListPage;