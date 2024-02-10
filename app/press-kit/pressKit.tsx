"use client"

import React from 'react';
import Layout from '@/components/layout';
import CoverImageContentful from '@/components/cover-image-contentful';
import { useRouter } from 'next/navigation'; 
import ClampLines from 'react-clamp-lines';

// Define the props based on what you're passing from the server component
interface PressKitClientProps {
    pressKits: PressKit[];
    pressKitLogos: PressKitLogo[];
    pressKitLogosOrder: PressKitLogoOrder[];
    metaDefault: any; // Define a more specific type if possible
}

const PressKitClient: React.FC<PressKitClientProps> = ({ pressKits, pressKitLogos, pressKitLogosOrder, metaDefault }) => {
    const router = useRouter()

    // Sort the pressKitLogosOrder array by the 'order' property
    pressKitLogosOrder.sort((a, b) => a.order - b.order);

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <h1 className="text-4xl font-bold">Press Kit</h1>
                </div>

                <div className="mt-12 max-w-screen-xl mx-auto w-full bg-white shadow-md rounded-lg p-4 pt-10 ">
                    {/* <h2 className="text-xl text-stone-700 font-mabryLight mb-2 text-center">Telah diliput oleh:</h2> */}
                    <div className="grid grid-cols-2  lg:flex  lg:flex-row justify-between gap-2">
                        {pressKitLogosOrder.map((logo, index) => (
                            <div key={index} className="flex flex-col items-center   transition-all duration-200 rounded-md justify-center ">
                                <div className="w-40 h-40 relative overflow-hidden rounded-lg  transition-shadow items-center flex p-6">
                                    <CoverImageContentful
                                        title={logo.pressKitLogo.fields.logo.fields.title}
                                        url={logo.pressKitLogo.fields.logo.fields.file.url}
                                        slug={logo.pressKitLogo.fields.logo.slug}
                                        className='w-full h-full'
                                    />
                                </div>
                                {/* <p className="text-center font-medium">{logo.name}</p> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full grid grid-cols-1  gap-8 mt-12">
                    {pressKits.map((pressKit, index) => (
                        <div onClick={() => router.push(pressKit.url)} key={index} className="flex flex-col md:flex-row items-center bg-stone-50 border rounded-md space-x-4 transition transform duration-200 hover:shadow-md cursor-pointer">
                            <div className="flex-shrink-0 w-full md:w-1/3 p-4">
                                <CoverImageContentful
                                    title={pressKit.pressImage.fields.title}
                                    url={pressKit.pressImage.fields.file.url}
                                    slug={pressKit.pressImage.slug}
                                    className='w-full h-48 object-cover rounded-md'
                                />
                            </div>
                            <div className='flex-grow p-4'>
                                <h2 className="text-2xl font-semibold mb-2">{pressKit.title}</h2>
                                <div className="mb-4 flex gap-4 items-center">

                                    <p className='text-stone-600'>Article by:</p>

                                    {/* {pressKit.companyName} */}
                                    <CoverImageContentful
                                        title={pressKit.presskitlogo.fields.logo.fields.title}
                                        url={pressKit.presskitlogo.fields.logo.fields.file.url}
                                        slug={pressKit.presskitlogo.fields.logo.slug}
                                        className='w-12'
                                    />
                                </div>

                                <ClampLines
                                    text={pressKit.description}
                                    id="really-unique-id"
                                    lines={3}
                                    ellipsis="..."
                                    moreText="Expand"
                                    lessText="Collapse"
                                    className="mt-4 line-clamp-2 mb-4"
                                    innerElement="p"
                                />
                                {pressKit.url && <a href={pressKit.url} className="text-blue-600 hover:underline">Read More</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PressKitClient;
