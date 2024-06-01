"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";

const DownloadListPage = () => {
  const { user, isLoaded } = useUser();
  const [downloadsData, setDownloadsData] = useState<CustomerDownloadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      fetchDownloads();
    }
  }, [user, isLoaded]);

  const fetchDownloads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/record-download`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setDownloadsData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

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
        ) : downloadsData.length > 0 ? (
          <div className="">
            {/* Replace this with your own component to display the downloads data */}
            {/* <DataTable data={downloadsData} onRefresh={fetchDownloads} /> */}
            
            <DataTable data={downloadsData} onRefresh={fetchDownloads} />
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