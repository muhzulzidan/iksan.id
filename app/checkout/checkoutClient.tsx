"use client"

import { Check } from 'react-bootstrap-icons'; // Import a checkmark icon
import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import useStore from '@/store';
import { CartX } from 'react-bootstrap-icons';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/Spinner';
import { toast } from '@/components/ui/use-toast';
import { UserButton } from "@/components/UserButton"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from "@clerk/clerk-react"
import prisma from '@/prisma/client';
import { CustomerIksanId as UserData } from "@prisma/client";

const Checkout = ({ userData }: { userData: UserData }) => {

    const [customerData, setCustomerData] = useState({ name: '', email: '', phoneNumber: '' });
    const [phoneNumberState, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add this line
    const [isPaid, setIsPaid] = useState(false); // Add a new state variable
    const { cart, removeFromCart, decrementQuantity, incrementQuantity } = useStore();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const { user } = useUser()
    const path = usePathname()
    const router = useRouter()

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Start loading when the form is submitted
        // Set the state of customerData
        // Create a new object with the updated customer data
        const updatedCustomerData = {
            ...customerData,
            name: userData.name,
            email: userData.email,
            phoneNumber: phoneNumberState,
        };

        console.log(updatedCustomerData, "customerData handle submit")

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerData: updatedCustomerData, cart }), // Use updatedCustomerData here
        });

      
        if (!response.ok) {
            console.error('Checkout failed');
            toast({
                variant: "destructive",
                title: `Checkout failed`,
            });
            // return;
        }

        const data = await response.json();
        // Handle successful checkout
        console.log('Checkout successful', data);
        toast({
            variant: "default",
            title: `Checkout successful`,
        });
        console.log(data, "data")
        // Open the invoice URL in a new window or tab
        window.open(data.data.invoice_url, '_blank');

        // Start polling for payment status
        // const paymentId = await response.json(); // Assume the response contains the payment ID
        // Start polling for payment status
        const intervalId = setInterval(async () => {
            // Assume you have the paymentId available
            // const paymentId = "664cb095e9d4c97372ccaa64";
            const paymentId = data.data.id;

            console.log(paymentId, "paymentId")
            // Fetch the payment status from the database using Prisma
            const response = await fetch(`/api/customers?id=${paymentId}`, {
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

            console.log(response, "response")
            console.log(payment, "payment status")

            if (payment && payment.order && payment.order.status === 'PAID') {
                setIsPaid(true);
                clearInterval(intervalId);
                console.log('Payment successful', cart);
                try {
                    // Collect all download links
                    const downloadLinks = [];

                    // Loop over each item in the cart
                    for (const item of cart) {
                        const response = await axios.get(`/api/file-download?fileName=${item.id}`);
                        const data = response.data;

                        // Add the link to the downloadLinks array
                        downloadLinks.push(data.fileUrl);
                    }

                    // Add the links and the user id to the customer-download-link
                    const customerDownloadLinkResponse = await axios.post('/api/customer-download-link', {
                        customerIksanId: userData.id, // Assuming userData.id is the user id
                        downloadLinks: downloadLinks,
                    });

                    if (customerDownloadLinkResponse.status === 200) {
                        // Redirect to a specific link if the request is successful
                        router.push("/my-account/download");
                    } else {
                        console.error('Error adding links and user id to customer-download-link', customerDownloadLinkResponse.data);
                    }

                    setIsLoading(false); // Stop loading when the request is done
                } catch (err) {
                    console.error('Error downloading invoice', err);
                    setIsLoading(false); // Stop loading when there's an error
                }
                // Delay closing the dialog to allow the check icon to be displayed
                setTimeout(() => setIsLoading(false), 1000); // Adjust delay as needed
            }
        }, 10000); // Check every 5 seconds
    }

    console.log(user, "user")

    return (
        <Layout>
            <div className='max-w-screen-lg mx-auto container py-12 flex gap-4'>
                {/* {isLoading && <Spinner />} */}
                <AlertDialog open={isLoading} onOpenChange={setIsLoading} >

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-center'>Processing The Checkout</AlertDialogTitle>
                            <AlertDialogDescription>
                                {isPaid ?
                                    <>
                                        <div className="flex justify-center items-center p-4  md:p-12 ">
                                            <div className='p-1  rounded-full border border-green-500'>
                                                <Check className="h-12 w-12 md:h-24 md:w-24 text-green-500" />
                                            </div>
                                        </div>
                                    </>
                                    : <Spinner />}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        {/* <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter> */}
                    </AlertDialogContent>
                </AlertDialog>

                <form onSubmit={handleSubmit} className='flex gap-4 w-full flex-col md:flex-row' >
                    <div className='flex flex-col gap-4 w-full'>
                        {/* <Button type="submit">Checkout</Button> */}
                        {userData ?

                            <div className='flex flex-col gap-4 w-full'>
                                <h2>Customer Details</h2>

                                {userData && userData.name ?
                                    <Input type="text" name="name" value={userData.name} placeholder="Name" disabled />
                                    :
                                    <Input type="text" name="name" value={customerData.name} onChange={handleCustomerChange} placeholder="Name" required />
                                }
                                {userData && userData.email ?
                                    <Input type="text" name="name" value={userData.email} placeholder="Name" disabled />
                                    :
                                    <Input type="text" name="name" value={customerData.name} onChange={handleCustomerChange} placeholder="Name" required />
                                }
                                {userData && userData.phoneNumber ?
                                    <Input type="text" name="name" value={userData.phoneNumber} placeholder="Name" disabled />
                                    :
                                    <Input type="tel" name="phoneNumber" value={phoneNumberState} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                                }

                            </div>

                            :

                            <div className='flex flex-col gap-4'>
                                <h2 className='text-xl font-bold'>Kamu Harus Login Dulu</h2>
                                <UserButton path={path} />
                            </div>

                        }
                    </div>

                    <div className='w-full md:w-8/12 bg-stone-50 p-4'>
                        {cart.length === 0 ? (
                            <div className='py-4 justify-center items-center flex-col flex gap-2 h-full text-primary1'>
                                <CartX size={42} className='mb-1' />
                                <h4 className=' m-0 font-kanakiraBold w-10/12 text-center'>
                                    Keranjang Masih kosong
                                </h4>
                            </div>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.id} className='py-4'>
                                        <div className="grid grid-cols-12 gap-2 items-center justify-center pr-2 ">
                                            <div className='flex flex-col gap-1 col-span-7'>
                                                <h4 className=' m-0 font-kanakiraBold text-stone-950 w-full'>  {item.name}</h4>
                                                <p className='m-0'>
                                                    {item.price === 0 ? 'Gratis' : `Rp.${item.price}${item.price.toString().includes('.') ? '00' : '.000'}`}
                                                </p>
                                            </div>
                                            <form className="max-w-xs mx-auto ">
                                                <div className="relative  gap-2 flex items-end justify-end">
                                                    {item.quantity > 1 ? (
                                                        <button
                                                            type="button"
                                                            id="decrement-button"
                                                            data-input-counter-decrement="counter-input"
                                                            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                            onClick={() => decrementQuantity(item.id)}
                                                        >
                                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            id="remove-button"
                                                            className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-stone-950 inline-flex items-center justify-center border border-red-500 rounded-md h-5 w-5 focus:ring-red-500 focus:ring-2 focus:outline-none"
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    <input
                                                        type="text"
                                                        id="counter-input"
                                                        data-input-counter
                                                        className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[0.5rem] text-center"
                                                        placeholder=""
                                                        value={item.quantity}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        id="increment-button"
                                                        data-input-counter-increment="counter-input"
                                                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                        onClick={() => incrementQuantity(item.id)} // Assuming you have the id of the item
                                                    >
                                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                ))}

                                <div className='py-4 flex flex-col gap-2'>
                                    <h4 className=' m-0 font-kanakiraBold text-stone-950'>
                                        Total Harga: {
                                            cart.reduce((total, item) => total + item.price * item.quantity, 0) === 0
                                                ? 'Gratis'
                                                : `Rp.${cart.reduce((total, item) => total + item.price * item.quantity, 0)}${cart.reduce((total, item) => total + item.price * item.quantity, 0).toString().includes('.') ? '00' : '.000'}`
                                        }
                                    </h4>

                                    <Button type="submit">Checkout</Button>
                                </div>

                            </>
                        )}
                    </div>
                </form>
                {/* <Button type="submit">Checkout</Button> */}
            </div>
        </Layout>
    );
};

export default Checkout;