// app/gadget/gadgetClient.tsx (Client component for rendering)
"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout';
import Image from 'next/image';
import CoverImageContentful from "@/components/cover-image-contentful";
import gadgetIcon from "@/app/images/toolbox.png";
import { usePathname } from 'next/navigation';
// import { Input, Button } from '@/components/ui';
import { Search } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import slugify from 'slugify';
import Link from 'next/link';

const GadgetClient: React.FC<GadgetClientProps> = ({ gadget, pageTitles, metaDefault }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = usePathname();
    const currentSlug = router;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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
    const filteredHardwareItems = hardwareItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredAccessoriesItems = accessoriesItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout metaDefault={metaDefault}>
            <div className="max-w-screen-lg mx-auto py-10 px-4 bg-stone-100 text-stone-800">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <Image width={150} height={150} className="rounded-xl" src={gadgetIcon} alt="product image" />
                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Our gadget'}</h1>
                    <p className="text-center text-xl max-w-md"> {filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Kumpulan hardware dan software yang saya gunakan dalam membuat project pribadi ataupun project untuk klien dari Skena.'}</p>
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search gadgets..."
                            className="px-4 py-2 border rounded-lg w-full"
                        />
                        <Button
                            className="absolute right-2 top-0 bg-transparent border-none cursor-pointer"
                            onClick={() => console.log('Search clicked')}
                        >
                            <Search className="h-5 w-5 text-gray-500" />
                        </Button>
                    </div>
                </div>


                <section className='py-12 flex flex-col gap-4 px-10'>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">Hardware</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            {filteredHardwareItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={`/gadget/${slugify(item.title, { lower: true })}`}
                                    passHref
                                >
                                    <div className="relative group cursor-pointer p-2">
                                        <div className="bg-white p-4 rounded-md shadow-md transform transition-transform duration-300 group-hover:scale-105">
                                            <div className="relative">
                                                <CoverImageContentful
                                                    url={item.image.fields.file.url}
                                                    title={item.title}
                                                    className="w-full h-48 object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                            </div>
                                            <h3 className="text-sm text-center font-semibold mt-2">{item.title}</h3>
                                            <p className=" text-xs text-stone-600 text-center">{item.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">Accessories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {filteredAccessoriesItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={`/gadget/${slugify(item.title, { lower: true })}`}
                                    passHref
                                >
                                    <div className="relative group cursor-pointer p-2">
                                        <div className="bg-white p-4 rounded-md shadow-md transform transition-transform duration-300 group-hover:scale-105">
                                            <div className="relative">
                                                <CoverImageContentful
                                                    url={item.image.fields.file.url}
                                                    title={item.title}
                                                    className="w-full h-48 object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                            </div>
                                            <h3 className="text-sm text-center font-semibold mt-2">{item.title}</h3>
                                            <p className="text-xs text-stone-600 text-center">{item.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default GadgetClient;