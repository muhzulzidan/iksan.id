"use client";

// app/admin/company/page.tsx

import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useSession } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DataTable from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import generateSlug from "@/lib/generateSlugs";

const formSchema = z.object({
  // logo_file: z.string().optional(),
  brand_name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters long." }),
  legal_name: z
    .string()
    .min(2, { message: "Legal name must be at least 2 characters long." })
    .optional(), // Assuming legal name is optional
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long." }),
  office_phone: z
    .string()
    .min(5, { message: "Office phone must be at least 5 characters long." })
    .optional(), // Assuming office phone is optional
  categories: z.array(z.string()).optional(), // Now an array of category IDs
  // categoryId: z.string().optional(), // Assuming this is a string and optional
  website_url: z.string().url().optional(),
  description: z.string().optional(), // Add a description field to your form schema
  execProducerName: z.string().min(2, "Name must be at least 2 characters long").optional(),
  execProducerPhone: z.string().min(5, "Phone must be at least 5 characters long").optional(),
  execProducerEmail: z.string().email().optional(),
});


function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const DownloadListPage = () => {

  const { user, isLoaded } = useUser();

  const [companiesData, setCompaniesData] = useState<CompaniesData>({
    companies: [],
  });

  // Define the ref with the specific type for a file input
  const logoFileRef = useRef<HTMLInputElement>(null); // Add a ref for the file input
  console.log(logoFileRef, "logo file ref")

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
      fetchCategories();
    }
  }, [user, isLoaded]);



  // Fetch categories from your API and set the state
  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    if (response.ok) {
      const data = await response.json();
      setCategories(data.categories);
    }
  };


  // Modify the fetchCompanies function to also fetch executive producers
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/record-download`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCompaniesData({ companies: data });
      console.log(data, "data");
      console.log(companiesData, "companies Data");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const firstCompany = companiesData.companies; // This will be of type Company | undefined
  // console.log(categories, "categories");


  return (
    <div className="">

      <section className="pb-24">
        {/* Displaying the list of companies */}
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
        ) : firstCompany ? (
          <div className="">
            <DataTable data={companiesData.companies} categories={categories} onRefresh={fetchCompanies} />

          </div>
        ) : (
          <div>No Companies yet</div>
        )}
      </section>


     
    </div>
  );
};

export default DownloadListPage;
