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

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
                    variant: "default",
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
                variant: "destructive",
                title: "Error",
                description: "An error occurred while updating the phone number.",
            });
        }
    };


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
