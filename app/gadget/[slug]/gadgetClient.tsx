// app/gadget/[slug]/gadgetClient.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import CoverImageContentful from '@/components/cover-image-contentful';
import Layout from '@/components/layout';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';



interface MetaDefault {
    title: string;
    description: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
}

interface GadgetPageClientProps {
    gadget: GadgetItem;
    gadgets: GadgetItem[];
    metaDefault: MetaDefault;
}

const GadgetPageClient: React.FC<GadgetPageClientProps> = ({ gadget, gadgets, metaDefault }) => {
    const getCommonWords = (str1: string, str2: string) => {
        const words1 = str1.toLowerCase().split(' ');
        const words2 = str2.toLowerCase().split(' ');
        return words1.filter(word => words2.includes(word));
    };

    const relatedGadgets = gadgets.filter(g => {
        const commonWords = getCommonWords(g.title, gadget.title);
        return commonWords.length > 0 && g !== gadget;
    });

    const router = useRouter();

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button
                    variant={"ghost"}
                    className="flex items-center mb-4 text-gray-700 hover:text-gray-900"
                    onClick={() => router.push("/gadget")}
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Go Back
                </Button>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
                    <div className="relative ">
                        <CoverImageContentful
                            url={gadget.image.fields.file.url}
                            title={gadget.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{gadget.title}</h1>
                        <p className="text-lg text-gray-700 mb-4">{gadget.description}</p>
                        <Button >
                            <a 
                            href={gadget.link} 
                            target="_blank" 
                            rel="noopener noreferrer">
                                Beli 
                            </a>
                        </Button>
                    </div>
                </div>

                {relatedGadgets.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Related Gadgets</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedGadgets.map((relatedGadget, index) => (
                                <Link key={index} href={`/gadget/${slugify(relatedGadget.title, { lower: true })}`} passHref>
                                    <div className="relative group cursor-pointer p-2">
                                        <div
                                            className={`rounded-lg transform transition-transform duration-300 group-hover:scale-105 shadow-lg bg-white`}
                                        >
                                            <div className="overflow-hidden rounded-t-lg">
                                                <CoverImageContentful
                                                    title={relatedGadget.title}
                                                    url={relatedGadget.image.fields.file.url}
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {relatedGadget.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default GadgetPageClient;