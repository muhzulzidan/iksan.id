'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '@/store';
import { CustomerIksanId as UserData } from "@prisma/client";
import Link from 'next/link';

const ClientPaymentStatus = () => {
    const searchParams = useSearchParams();
    const PaymentId = searchParams.get('paymentId');
    const router = useRouter();
    const { cart, removeFromCart } = useStore();
    const [isPaid, setIsPaid] = useState(false);
    const [countdown, setCountdown] = useState(20);
    const [userData, setUserData] = useState<UserData | null>(null);

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
        const checkPaymentStatus = async () => {
            console.log('Checking payment status...');
            const response = await fetch(`/api/payment-status?id=${PaymentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log('Failed to fetch payment status', response);
                return;
            }

            const payment = await response.json();
            console.log(payment, "payment");

            if (payment && payment.order && payment.order.status === 'PAID') {
                console.log('Payment is PAID');
                if (cart.length === 0) {
                    console.log('Cart is empty, nothing to download');
                    return;
                }

                const hasTemplate = cart.some(item => item.id.includes('template'));

                if (!hasTemplate) {
                    setIsPaid(true);
                    // Remove items from the cart
                    cart.forEach(item => removeFromCart(item.id));
                    // Redirect to history page if no item.id includes 'template'
                    router.push("/my-account/history");
                    return;
                }

                const downloadLinks = [];

                for (const item of cart) {
                    if (item.id.includes('template')) {
                        try {
                            const response = await axios.get(`/api/file-download?fileName=${item.id}`);
                            const data = response.data;
                            downloadLinks.push(data.fileUrl);
                        } catch (error) {
                            console.error(`Error fetching download link for item ${item.id}:`, error);
                        }
                    }
                }

                if (!userData || !userData.id) {
                    console.error('userData is missing or does not have an id');
                    return;
                }

                try {
                    const customerDownloadLinkResponse = await axios.post('/api/customer-download-links', {
                        customerIksanId: userData.id,
                        downloadLinks: downloadLinks,
                    });
                    console.log(customerDownloadLinkResponse, "customerDownloadLinkResponse");

                    if (customerDownloadLinkResponse.status === 200) {
                        // Reset the cart
                        cart.forEach(item => removeFromCart(item.id));
                        router.push("/my-account/download");
                    } else {
                        console.error('Error adding links and user id to customer-download-link', customerDownloadLinkResponse.data);
                    }
                } catch (error) {
                    console.error('Error posting customer download links:', error);
                }

                setIsPaid(true);
            }
        };

        if (PaymentId && userData) {
            checkPaymentStatus();
        }

        const intervalId = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    checkPaymentStatus();
                    return 20; // Reset countdown
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [PaymentId, userData, cart, removeFromCart, router]);

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            {isPaid ? (
                <div>
                    <p>Payment successful! Redirecting...</p>
                    {countdown > 0 ? (
                        <p>Redirecting in {countdown} seconds...</p>
                    ) : (
                        <Link href={"/my-account"}>Click Here if not Redirecting</Link>
                    )}
                </div>
            ) : (
                <div>
                    <p>Waiting for payment...</p>
                    <p>Checking again in {countdown} seconds...</p>
                </div>
            )}
        </div>
    );
};

export default ClientPaymentStatus;