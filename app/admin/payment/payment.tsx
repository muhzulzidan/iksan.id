"use client";

// File: /app/admin/payment/page.js

import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs'; // or your custom auth hook
import { useRouter } from 'next/navigation';
// import PaymentTable from '@/app/admin/payment-table';
import { Skeleton } from '@/components/ui/skeleton';

const PaymentPage = () => {
    const { isSignedIn, isLoaded, userId } = useAuth();

    const router = useRouter();
    const [payments, setPayments] = useState<PaymentWithCompany[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const paymentsResponse = await fetch('/api/payments');
            const paymentsData = await paymentsResponse.json();

            const companiesResponse = await fetch(`/api/companies?userId=${userId}`);
            const companiesData: CompaniesResponse = await companiesResponse.json();

            // console.log(companiesResponse, "companiesResponse")
            // console.log(companiesData, "companiesData")

            // Assuming companiesData is an array of companies
            // Use the types in your map and find methods
            const combinedData: PaymentWithCompany[] = companiesData.companies.map(company => {
                const payment = paymentsData.payments.find((p: Payment) => p.company_id === company.id);

                // Merge company and payment data
                return {
                    ...company, // Spread all company properties
                    // Include payment properties if payment is found
                    payment: payment || null, // Set payment or null
                    amount: payment?.amount,
                    status: payment?.status,
                    payment_date: payment?.payment_date,
                    transaction_id: payment?.transaction_id,
                    // Include the created_at and updated_at properties
                    created_at: company?.created_at,
                    updated_at: company?.updated_at,
                    // ... any other properties needed
                };
            });

            setPayments(combinedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };



    useEffect(() => {
        if (!isSignedIn && isLoaded) {
            router.push('/login');
        }
        // Call fetchPayments initially
        fetchPayments();


    }, [isSignedIn, isLoaded, router]);

    const handleRefresh = () => {
        fetchPayments();
    };



    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Payment Management</h1>
            {loading ? (
                // Display skeletons when data is loading
                <>
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
                </>
            ) : payments ? (
                <div className="">
                    {/* <PaymentTable data={payments} userType='admin' onRefresh={handleRefresh} /> */}
                </div>
            ) : (
                <div>No Companies yet</div>
            )}

        </div>
    );
}


export default PaymentPage;
