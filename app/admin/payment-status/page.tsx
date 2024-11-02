'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useStore from '@/store';
import { CustomerIksanId as UserData } from "@prisma/client";
import Link from 'next/link';

const PaymentStatus = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const PaymentId = searchParams.get('paymentId');
    const { cart, removeFromCart, decrementQuantity, incrementQuantity } = useStore();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/get-user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.log('Failed to fetch user data', response);
                    throw new Error('Failed to fetch user data');
                }

                const user = await response.json();
                setUserData(user);
            } catch (err) {
                console.error('Error fetching user data', err);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!PaymentId || !userData) return;

        const checkPaymentStatus = async () => {

            try {
                const response = await fetch(`/api/payment-status?id=${PaymentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.log('Failed to fetch payment status', response);
                    throw new Error('Failed to fetch payment status');
                }

                const payment = await response.json();

                if (payment && payment.order && payment.order.status === 'PAID') {
                    setIsPaid(true);

                    const downloadLinks = [];

                    for (const item of cart) {
                        const response = await axios.get(`/api/file-download?fileName=${item.id}`);
                        const data = response.data;
                        downloadLinks.push(data.fileUrl);
                    }

                    const customerDownloadLinkResponse = await axios.post('/api/customer-download-links', {
                        customerIksanId: userData.id,
                        downloadLinks: downloadLinks,
                    });

                    if (customerDownloadLinkResponse.status === 200) {
                        // Reset the cart
                        cart.forEach(item => removeFromCart(item.id));
                        router.push("/my-account/download");
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
        checkPaymentStatus()
        // const intervalId = setInterval(checkPaymentStatus, 10000);
        // return () => clearInterval(intervalId);
    }, [PaymentId, cart, userData, router, removeFromCart]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : isPaid ? (
                <div>
                    <p>Payment successful! Redirecting...</p>
                    <Link href={"/my-account"}>Click Here if not Redirecting</Link>
                </div>
            ) : (
                <p>Waiting for payment...</p>
            )}
        </div>
    );
};

export default PaymentStatus;