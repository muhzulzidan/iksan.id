"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";
// import { useUser } from "@clerk/clerk-react";
const DownloadListPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [customerId, setCustomerId] = useState(null);
  const [downloadsData, setDownloadsData] = useState<CustomerDownloadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(downloadsData, "downloadsData")
  // console.log(user?.primaryEmailAddress?.emailAddress, "email")
  // console.log(user, "user")
  // console.log(isSignedIn, "isSignedIn")
  useEffect(() => {
    fetchCustomerId();
  }, [!isLoaded, isSignedIn]);

  const fetchCustomerId = async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }
    // console.log(user?.primaryEmailAddress?.emailAddress, "email fetchCustomerId")
    // console.log(user, "user fetchCustomerId")
    // console.log(isSignedIn, "isSignedIn fetchCustomerId")
    try {
      const response = await fetch(`/api/customer-iksan-id?email=${user?.primaryEmailAddress?.emailAddress}`);

      if (!response.ok) {
        throw new Error('Failed to fetch customer ID');
      }

      const data = await response.json();
      setCustomerId(data.customer.id);
      console.log(data, "data fetchCustomerId")
      console.log(data.customer.id, "data.id fetchCustomerId")
      console.log(customerId, "customerId fetchCustomerId")
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  };

  const fetchDownloads = async () => {
    if (!customerId) {
      return;
    }
    console.log(customerId, "customerId fetchDownloads")
    setIsLoading(true);
    try {
      const response = await fetch(`/api/customer-download-links?customerId=${customerId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setDownloadsData(data.downloadLinks);
      console.log(data, "data fetchDownloads")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (customerId) {
      fetchDownloads();
    }
   
  }, [customerId]);

  const transformedData = downloadsData.map((download, index) => {
    const urlParts = download.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const linkName = fileName.replace(/_/g, ' ').split('.')[0];

    return {
      download: download,
      link: linkName,
    };
  });

  return (
    <div className="">
      <section className="pb-24">
        {/* Displaying the list of downloads */}
        {isLoading ? (
          // Display skeletons when data is loading
          <ul className="list-none">
            <li className="mb-2">
              <Skeleton className="w-[300px] h-[20px] rounded-lg" />
            </li>
            <li className="mb-2">
              <Skeleton className="w-[300px] h-[20px] rounded-lg" />
            </li>
            <li className="mb-2">
              <Skeleton className="w-[300px] h-[20px] rounded-lg" />
            </li>
            {/* You can add more or fewer Skeletons based on your preference */}
          </ul>
        ) : downloadsData && downloadsData.length > 0 ? (
          <div className="">
            {/* Replace this with your own component to display the downloads data */}
            {/* <DataTable data={downloadsData} onRefresh={fetchDownloads} /> */}

              <DataTable data={transformedData} onRefresh={fetchDownloads} />
            {/* {downloadsData.map(download => (
              <div key={download.id}>
                <h2>{download.fullname}</h2>
                <p>{download.email}</p>
                <p>{download.fileName}</p>
                <p>{download.downloadDate}</p>
              </div>
            ))} */}
          </div>
        ) : (
          <div>No Downloads yet</div>
        )}
      </section>
    </div>
  );
};

export default DownloadListPage;