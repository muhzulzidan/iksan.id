"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../data-table";

interface DownloadData {
  customerId: number;
  customerName: string;
  customerEmail: string;
  links: string[];
}

const DownloadListPage = ({ downloadsData }: { downloadsData: DownloadData[] }) => {
  console.log(downloadsData, "downloadsData");

  const transformedData = downloadsData.flatMap((download) => {
    return download.links.map((link) => {
      const urlParts = link.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const linkName = fileName.replace(/_/g, ' ').split('.')[0];

      return {
        customerId: download.customerId,
        customerName: download.customerName,
        customerEmail: download.customerEmail,
        download: link,
        link: linkName,
      };
    });
  });

  return (
    <div className="">
      <section className="pb-24">
        {/* Displaying the list of downloads */}
        {
          transformedData && transformedData.length > 0 ? (
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