// app/gadget/gadgetClient.tsx (Client component for rendering)
"use client";

import React from 'react';
import Layout from '@/components/layout';
import Image from 'next/image';
import CoverImageContentful from "@/components/cover-image-contentful";
import gadgetIcon from "@/app/images/toolbox.png"
import { usePathname } from 'next/navigation';

const GadgetClient: React.FC<GadgetClientProps> = ({ gadget, pageTitles, metaDefault }) => {

    const router = usePathname();
    const currentSlug = router;

    const filteredPageTitles = pageTitles.filter((page) => `/${page.slug}` === currentSlug);
    if (!gadget || gadget.length === 0) {
        // Handle the case where no data is available
        return (
            <Layout metaDefault={metaDefault}>
                <div className="container mx-auto p-4">
                    <p className="text-xl font-bold">No data available</p>
                </div>
            </Layout>
        );
    }

    const reversedgadget = [...gadget].reverse();

    const hardwareItems = reversedgadget.filter(item => item.categories === 'Hardware');
    const accessoriesItems = reversedgadget.filter(item => item.categories === 'Accessories');

    return (
        <Layout metaDefault={metaDefault}>
            <div className="max-w-screen-lg mx-auto py-10 px-4 bg-stone-100 text-stone-800">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <Image width={150} height={150} className="rounded-xl" src={gadgetIcon} alt="product image" />
                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Our gadget'}</h1>
                    <p className="text-center text-xl max-w-md"> {filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Kumpulan hardware dan software yang saya gunakan dalam membuat project pribadi ataupun project untuk klien dari Skena.'}</p>
                </div>

                <section className='py-12 flex flex-col gap-4 px-10'>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">Hardware</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {hardwareItems.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <div className="bg-white p-4 rounded-md shadow-md ">
                                        <div className="relative">
                                            <CoverImageContentful
                                                url={item.image.fields.file.url}
                                                title={item.title}
                                                className="w-full h-48 object-contain transition-transform transform-gpu group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                        </div>
                                        <h3 className="text-xl text-center font-semibold mt-2">{item.title}</h3>
                                        <p className="text-stone-600 text-center">{item.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">Accessories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {accessoriesItems.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <div className="bg-white p-4 rounded-md shadow-md ">
                                        <div className="relative">
                                            <CoverImageContentful
                                                url={item.image.fields.file.url}
                                                title={item.title}
                                                className="w-full h-48 object-contain transition-transform transform-gpu group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                        </div>
                                        <h3 className="text-xl text-center font-semibold mt-2">{item.title}</h3>
                                        <p className="text-stone-600 text-center">{item.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default GadgetClient;
