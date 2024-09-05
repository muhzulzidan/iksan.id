"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";
// import { useUser } from "@clerk/clerk-react";
const DownloadListPage = ({ downloadsData }: { downloadsData: string[] }) => {

  console.log(downloadsData, "downloadsData")

  const transformedData = downloadsData.map((download: string, index: any) => {
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