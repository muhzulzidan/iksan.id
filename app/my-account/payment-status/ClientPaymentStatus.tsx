'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '@/store';
import { CustomerIksanId as UserData } from "@prisma/client";
import Link from 'next/link';

const ClientPaymentStatus = ({ userData }: { userData: UserData }) => {
    const searchParams = useSearchParams();
    const PaymentId = searchParams.get('paymentId');
    const router = useRouter();
    const { cart, removeFromCart } = useStore();
    const [isPaid, setIsPaid] = useState(false);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        const checkPaymentStatus = async () => {
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

            if (payment && payment.order && payment.order.status === 'PAID') {
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
                    return 30; // Reset countdown
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [PaymentId, userData, cart, removeFromCart, router]);

    return (
        <div className='flex flex-col justify-center items-center'>
            {isPaid ? (
                <div>
                    <p>Payment successful! Redirecting...</p>
                    <Link href={"/my-account"}>Click Here if not Redirecting</Link>
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