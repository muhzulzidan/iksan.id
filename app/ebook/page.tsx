// pages/books.tsx
import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import { getEbooks, getMetaDefault } from '@/lib/contentful';
import CoverImageContentful from "@/components/cover-image-contentful";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];


    const title = `Buku Elektronik  ${metaDefault?.title} ` || 'Template';
    const description = metaDefault?.description || 'Default Description';
    // Ensure imageUrl is always an absolute URL
    const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    ``


    return {
        metadataBase, // Set the metadataBase
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `https://${imageUrl}`, // Ensure the URL is absolute
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        // You can add additional metadata here, such as Twitter cards or specific social media links
        twitter: {
            card: 'summary_large_image',
            site: '@iksanbangsawan', // Replace with actual Twitter username
            title,
            description,
            images: `https://${imageUrl}`,
        },

    };
}

async function Books() {
    const ebooks = await getEbooks() as unknown as Ebook[];
    const metaDefault = await getMetaDefault();

    // console.log(ebooks[0], "ebooks");

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <Image width={150} height={150} className="rounded-xl" src="https://images.ctfassets.net/1612ijcm5jnx/3qHGVpis2rQSskLkldxz7W/b8b1b7b2188c0bd3356089b1a0e095e2/ebook.png" alt="Books" />

                    <h1 className="text-4xl font-bold">Buku Iksan Bangsawan</h1>
                </div>
                <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-x-4 gap-y-4 mt-12">
                    {ebooks.map(ebook => (
                        <div key={ebook.slug} className="flex flex-col p-6 bg-white border rounded-md space-y-4">

                            <div className="flex space-x-4 aspect-video">
                                <CoverImageContentful
                                    title={ebook.image.fields.title}
                                    url={ebook.image.fields.file.url}
                                    slug={ebook.image.slug}
                                    className='aspect-video object-cover'
                                />
                            </div>
                            <div className='flex gap-4 bg-secondary2 px-4 py-2 text-sm font-bold w-fit text-stone-50 rounded-lg'>
                                {/* <p className="line-through text-gray-500">Rp{ebook.priceOld},000</p> */}
                                <p>Rp{ebook.price},000</p>
                            </div>
                            <h2 className="text-2xl font-semibold">{ebook.title}</h2>
                            <p className='line-clamp-3'>{ebook.description}</p>

                            <a href={ebook.url} className="px-4 py-3 w-fit font-bold text-lg text-white bg-secondary2 rounded-lg hover:bg-stone-100 border-secondary2 hover:border ">Beli sekarang</a>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Books