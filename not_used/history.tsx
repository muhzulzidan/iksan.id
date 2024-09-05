"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../app/my-account/data-table-history";

const HistoryPage = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [customerId, setCustomerId] = useState(null);
    const [transactionsData, setTransactionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const fetchTransactions = async () => {
        if (!customerId) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/customer-transactions?customerId=${customerId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            console.log(data, "data fetchTransactions")
            setTransactionsData(data.transactions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (customerId) {
            fetchTransactions();
        }
    }, [customerId]);

    const transformedData = transactionsData.map((transaction) => ({
        id: transaction.id,
        amount: transaction.total,
        status: transaction.status,
        createdAt: transaction.createdAt,
        updatedAt: transaction.paidAt,
        orderItems: transaction.orderItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            productSlug: item.productSlug,
        })),
    }));
    console.log(transformedData, "transformedData")

    return (
        <div className="">
            <section className="pb-24">
                {isLoading ? (
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
                    </ul>
                ) : transactionsData && transactionsData.length > 0 ? (
                    <div className="">
                        <DataTable data={transformedData} onRefresh={fetchTransactions} />
                    </div>
                ) : (
                    <div>No Transactions yet</div>
                )}
            </section>
        </div>
    );
};

export default HistoryPage;