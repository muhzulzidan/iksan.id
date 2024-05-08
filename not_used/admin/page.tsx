// pages/member/profile/page.tsx
"use client";

import React, { useEffect, useState } from 'react';

import { useUser, useSession, UserButton, UserProfile } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UserResource } from '@clerk/types';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

// import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
// import PhoneInput from 'react-phone-number-input/input'
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

const ProfilePage = () => {
    const { toast } = useToast()
    const [currentDate, setCurrentDate] = useState(getDate());
    const { user, isLoaded } = useUser();
    // const [companies, setCompanies] = useState<Company[]>([]);
    const [showPhoneDialog, setShowPhoneDialog] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    // Function to open phone dialog
    const openPhoneDialog = () => {
        setShowPhoneDialog(true);
    };

    // // Function to fetch user's phone number from the database
    // const fetchPhoneNumber = async (clerkUserId: any) => {
    //     console.log("fetchPhoneNumber", clerkUserId)
    //     try {
    //         const response = await fetch(`/api/users?clerkUserId=${clerkUserId}`);
    //         const data = await response.json();
    //         if (data.phone) {
    //             setPhoneNumber(data.phone);
    //         }
    //         console.log(data, "phone")
    //     } catch (error) {
    //         console.error('Error fetching phone number:', error);
    //     }
    // };

    // const handlePhoneNumberChange = (phone: any) => {
    //     // Set the phone number only if it's a non-null and non-undefined string
    //     setPhoneNumber(phone || '');
    // };
    // useEffect(() => {
    //     // const checkPhoneNumber = async () => {
    //     //     if (isLoaded && user) {
    //     //         try {
    //     //             const response = await fetch('/api/users/check-phone-number', {
    //     //                 method: 'POST',
    //     //                 headers: { 'Content-Type': 'application/json' },
    //     //                 body: JSON.stringify({ clerkUserId: user.id }),
    //     //             });

    //     //             const data = await response.json();
    //     //             // console.log(data);
    //     //             // console.log(data.phoneMatches && !data.phoneInMySQL && !data.phoneInXendit, "anjay");


    //     //             if (data.phoneMatches && !data.phoneInMySQL && !data.phoneInXendit) {
    //     //                 // Determine where to update based on the flags
    //     //                 // Update in MySQL if needed
    //     //                 if (!data.phoneInMySQL) {
    //     //                     await fetch('/api/users/update-phone-number/mysql', {
    //     //                         method: 'POST',
    //     //                         headers: { 'Content-Type': 'application/json' },
    //     //                         body: JSON.stringify({ clerkUserId: user.id, phoneNumber: phoneNumber }),
    //     //                     });
    //     //                 }

    //     //                 // Update in Xendit if needed
    //     //                 if (!data.phoneInXendit) {
    //     //                     await fetch('/api/users/update-phone-number/xendit', {
    //     //                         method: 'POST',
    //     //                         headers: { 'Content-Type': 'application/json' },
    //     //                         body: JSON.stringify({ clerkUserId: user.id, phoneNumber: phoneNumber }),
    //     //                     });
    //     //                 }
    //     //                 // Show dialog to update phone number
    //     //                 setShowPhoneDialog(true);
    //     //             }
    //     //         } catch (error) {
    //     //             console.error('Error checking phone number:', error);
    //     //         }
    //     //     }
    //     // };

    //     // checkPhoneNumber();

    //     // if (isLoaded) {
    //     //     syncUserData();

    //     // }
    //     // if (isLoaded && user) {
    //     //     fetchPhoneNumber(user.id);
    //     //     createXenditCustomer(user);
    //     // }
    // }, [user, isLoaded]);



    const handlePhoneNumberSubmit = async () => {
        try {
            const payload = {
                clerkUserId: user?.id,
                phoneNumber: phoneNumber,
            };
            console.log('Sending request with payload:', payload);

            const response = await fetch('/api/users/update-phone-number', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast({
                    variant: "success",
                    title: "Phone number updated",
                    description: "Your phone number has been successfully updated.",
                });
                setShowPhoneDialog(false); // Close the dialog
            } else {
                throw new Error('Failed to update phone number');
            }
        } catch (error) {
            console.error('Error updating phone number:', error);
            toast({
                variant: "danger",
                title: "Error",
                description: "An error occurred while updating the phone number.",
            });
        }
    };

    // const createXenditCustomer = async (clerkUser: UserResource) => {
    //     try {
    //         const response = await fetch('/api/payments/xendit/create-customer', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 reference_id: clerkUser.id,
    //                 email: clerkUser.primaryEmailAddress?.emailAddress,
    //                 mobile_number: clerkUser.primaryPhoneNumber?.phoneNumber,
    //                 given_names: clerkUser.firstName,
    //                 // Additional fields as required by your application
    //             }),
    //         });
    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log('Xendit customer created:', data);
    //             toast({
    //                 variant: "success",
    //                 title: "Success createXenditCustomer User",
    //                 description: `${currentDate}`,
    //             });
    //         } else {
    //             console.error('Error creating Xendit customer:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error while creating Xendit customer:', error);
    //     }
    // };
    // const syncUserData = async () => {
    //     if (user) {
    //         try {
    //             const username = user.fullName?.split(' ').join('-').toLowerCase() ?? '';

    //             const response = await fetch('/api/sync-user', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     clerkUserId: user.id,
    //                     email: user.emailAddresses[0].emailAddress,
    //                     username: username
    //                 })
    //             });

    //             if (response.ok) { // Check if response status is 200-299
    //                 console.log("Success syncing user");
    //                 toast({
    //                     variant: "success",
    //                     title: "Success Syncing User",
    //                     description: `${currentDate}`,
    //                 });
    //             } else if (response.status === 500) {
    //                 console.error("Server error occurred");
    //                 toast({
    //                     variant: "danger",
    //                     title: "Error",
    //                     description: "Server error occurred while syncing user.",
    //                 });
    //             } else if (response.status === 409) { // Assuming 409 for existing user
    //                 console.error("User already exists");
    //                 toast({
    //                     title: "User Exists",
    //                     description: "This user already exists.",
    //                 });
    //             } else {
    //                 console.error("Unknown error occurred");
    //                 toast({
    //                     variant: "danger",
    //                     title: "Error",
    //                     description: "An unknown error occurred while syncing user.",
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Error syncing user data:', error);
    //             toast({
    //                 variant: "danger",
    //                 title: "Error",
    //                 description: "An error occurred while syncing user.",
    //             });
    //         }
    //     }
    // };

    return (
        <div className="">
            <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
                <DialogContent>
                    <DialogTitle>Add Your Phone Number</DialogTitle>
                    <DialogDescription>
                        Please add a phone number to use all features of our service.
                    </DialogDescription>
                    {/* <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="ID"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter phone number"
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    /> */}

                    <Button onClick={handlePhoneNumberSubmit}>
                        Save Phone Number
                    </Button>
                </DialogContent>
            </Dialog>
            <div className='flex flex-col gap-6 pb-6'>
                <div>
                    <h3 className="text-lg font-medium">User Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Update your user profile
                    </p>
                </div>
                <Separator />
            </div>
            <div className='flex gap-6 items-center mb-6'>
                {!isLoaded ? (
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-[200px] h-[150px] rounded-lg" />

                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Image
                            src={user?.imageUrl || "https://source.unsplash.com/500x300/?placeholder"}
                            width={150}
                            height={150}
                            alt={user?.fullName || 'User Name'}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <div className="flex flex-col ">
                    {!isLoaded ? (
                        <div className="flex flex-col items-center">
                            <Skeleton className="w-[250px] h-[50px] rounded-lg" />
                            <Skeleton className="w-[250px] h-[50px] rounded-lg" />

                        </div>
                    ) : (
                        <div className=''>
                            <p className="text-lg"><strong>Name:</strong> {user?.fullName}</p>
                            <p className="text-lg"><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
                            <p className="text-lg"><strong>Phone:</strong> {phoneNumber}</p>
                            {/* Button to open phone number edit dialog */}
                            <Button size="sm" className='flex w-fit mt-4' onClick={openPhoneDialog}>
                                Edit Phone Number
                            </Button>
                        </div>
                    )}

                    <Button size="sm" className='flex w-fit mt-4' asChild>
                        <Link href={'/profile/'}>
                            Edit Profile
                        </Link>
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
