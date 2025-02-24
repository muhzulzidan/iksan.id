"use client"

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";
import axios from 'axios';
import useStore from "@/store";
import { useRouter } from 'next/navigation';
import slugify from 'slugify';

const DownloadListPage = ({ downloadsData, CustomerTransactions, userData, customer }: { downloadsData: string[], CustomerTransactions: any, userData: any, customer: any }) => {

  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [previousDownloads, setPreviousDownloads] = useState<string[]>(downloadsData);
  const { removeFromCart } = useStore();
  const router = useRouter();
  console.log(CustomerTransactions, "CustomerTransactions");

  // Extract the PaymentId from CustomerTransactions
  const PaymentId = CustomerTransactions.find((transaction: any) => transaction.CustomerOrder.status === 'PAID')?.CustomerOrder.xenditId;
  console.log(PaymentId, "PaymentId");

  function chunkArray(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const chunkSize = 3; // Adjust the chunk size as needed

  useEffect(() => {
    if (!PaymentId || !userData) {
      console.log('Missing PaymentId or user');
      return;
    }
    console.log(userData, "user");

    const checkPaymentStatus = async () => {
      console.log('Checking payment status');
      setLoadingMessage('Memeriksa status pembayaran...');
      try {
        const response = await fetch(`/api/payment-status-xendit?xenditId=${PaymentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.log('Failed to fetch payment status', response);
          throw new Error('Gagal mengambil status pembayaran');
        }

        const payment = await response.json();
        console.log(payment, "payment");

        if (payment && payment.order && payment.order.status === 'PAID') {
          setIsPaid(true);
          setLoadingMessage('Pembayaran dikonfirmasi. Menghasilkan tautan unduhan...');

          const downloadLinks = [];

          // Extract productSlugs from orderItems of PAID transactions
          const productSlugs = CustomerTransactions
            .filter((transaction: any) => transaction.CustomerOrder.status === 'PAID')
            .flatMap((transaction: any) => transaction.OrderItem.productSlug);

          for (const slug of productSlugs) {
            // Normalize the slug using slugify
            const normalizedSlug = slugify(slug, { lower: true, remove: /[*+~.()'"!:@]/g });
            const response = await axios.get(`/api/file-download?fileName=${normalizedSlug}`);
            const data = response.data;

            // Ensure the fileUrl is not null or an empty string before pushing
            if (data.fileUrl) {
              // Base64 encode the URL
              const encodedUrl = btoa(data.fileUrl);
              downloadLinks.push(data.fileUrl);
            }
          }

          const downloadLinkChunks = chunkArray(downloadLinks, chunkSize);

          for (const chunk of downloadLinkChunks) {
            try {
              const customerDownloadLinkResponse = await axios.post('/api/customer-download-links', {
                customerIksanId: userData.id,
                downloadLinks: chunk,
              });

              if (customerDownloadLinkResponse.status === 200) {
                // Reset the cart
                productSlugs.forEach((slug: string) => removeFromCart(slug));
              } else {
                console.error('Error adding links and user id to customer-download-link', customerDownloadLinkResponse.data);
              }
            } catch (error) {
              console.error('Error sending chunked request', error);
            }
          }

          setLoadingMessage('');
          setIsLoading(false);
        } else {
          setLoadingMessage('Pembayaran belum dikonfirmasi. Mohon tunggu...');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching payment status', err);
        setLoadingMessage('Gagal mengambil status pembayaran');
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [PaymentId, CustomerTransactions, userData, router, removeFromCart]);

  useEffect(() => {
    // Refresh the page or re-fetch data when new downloads are added
    if (downloadsData.length > previousDownloads.length) {
      setPreviousDownloads(downloadsData);
      router.refresh(); // This will refresh the page
    }
  }, [downloadsData, previousDownloads, router]);

  const transformedData = downloadsData.map((download: string, index: any) => {
    const urlParts = download.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const linkName = fileName.replace(/_/g, ' ').split('.')[0];

    return {
      download: btoa(download), // Base64 encode the URL
      link: linkName,
    };
  });

  return (
    <div className="">
      <section className="pb-24">
        {/* Displaying the list of downloads */}
        {
          isLoading ? (
            <div className="flex items-center justify-center pb-6">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span>{loadingMessage}</span>
              </div>
            </div>
          ) : (
            downloadsData && downloadsData.length > 0 ? (
              <div className="">
                <DataTable data={transformedData} />
              </div>
            ) : (
              <div>Belum ada unduhan</div>
            )
          )
        }
        <div>
          <p className="text-sm text-gray-500 italic">*** Anda akan dihubungi melalui WhatsApp jika Anda sudah membayar untuk kelas. ***</p>
        </div>
      </section>
    </div>
  );
};

export default DownloadListPage;