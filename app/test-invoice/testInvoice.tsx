// pages/testInvoice.tsx
"use client"

import { useState } from 'react';
import axios from 'axios';
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';

interface TestInvoiceProps {
    templates: Template[]; // replace 'any' with the actual type
    pageTitles: PageTitle[]; // replace 'any' with the actual type
    templateCategory: TemplateCategory[]; // replace 'any' with the actual type
   
}

export default function TestInvoice({
    templates,
    pageTitles,
    templateCategory,

}: TestInvoiceProps) {

    const { isSignedIn, user, isLoaded } = useUser();
    const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const templatesOne = templates[0];
    console.log(user, "user")

    const handleCreateInvoice = async () => {
        console.log(user, "user")
        console.log(templates, "templates")
        console.log(templatesOne.price, "templates price")

        try {
            // Try to retrieve the customer from Xendit
            let customer;
            try {
                const response = await axios.get(`/api/xendit/customer?reference_id=${user?.id}`);
                customer = response.data;
            } catch (err) {
                // If the customer doesn't exist, create the customer
                const response = await axios.post('/api/xendit/customer', {
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    phoneNumber: '', // Replace with the user's phone number if available
                });
                customer = response.data;
            }

            // Create the invoice if the price is greater than 0
            if (templatesOne.price > 0) {
                const response = await axios.post('/api/xendit/invoice', {
                    price: templatesOne.price,
                    title: templatesOne.title,
                    slug: templatesOne.slug,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                });

                setInvoiceUrl(response.data.invoiceUrl);
                setError(null);
            }
        } catch (err) {
            setError('Error creating invoice');
            setInvoiceUrl(null);
        }
    };

    const handleDownloadInvoice = async () => {
        try {
            const response = await axios.get(`/api/file-download?userId=${user?.id}&fileName=${templatesOne.slug}`);
            const data = response.data;
            window.open(data.fileUrl, '_blank');
        } catch (err) {
            console.error('Error downloading invoice', err);
        }
    }
    // console.log(user, "user")
    // console.log(templatesOne, "templates");
    if (templatesOne.file) {
        console.log(templatesOne.file[0].fields.file.url.substring(2), "templates");
    } else {
        console.log('File is undefined');
    }
    return (
        <Layout>
           <div className='flex justify-center items-center flex-col '>
                <h1>Test Invoice</h1>
                <Button onClick={handleDownloadInvoice}>Download</Button>
                {
                    // user user name email 
                    isSignedIn ? <div>
                        <p>Hi {user.fullName}, you are signed in with {user.primaryEmailAddress?.emailAddress}</p>
                        <p>
                            username : {user?.username?.replace('number_', '')},
                        </p>
                        </div> : <UserButton />
                }
                <Button onClick={handleCreateInvoice}>Create Invoice</Button>
                {invoiceUrl && <p>Invoice URL: {invoiceUrl}</p>}
                {error && <p>Error: {error}</p>}
           </div>
        </Layout>
    );
}