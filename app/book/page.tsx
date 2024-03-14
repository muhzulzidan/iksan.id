// pages/books.tsx
import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import { getbooks, getMetaDefault } from '@/lib/contentful';
import CoverImageContentful from "@/components/cover-image-contentful";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];



    const title = `Buku ${metaDefault?.title} ` || 'Template';
    const description = metaDefault?.description || 'Default Description';
    // Ensure imageUrl is always an absolute URL
    const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    ``


    return {
        metadataBase,
        title,
        description,
        alternates: {
            canonical: `/book/`,
        },
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
    const books = await getbooks() as unknown as Book[];
    const metaDefault = await getMetaDefault();

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <Image width={150} height={150} className="rounded-xl" src="https://iksanbangsawan.com/wp-content/uploads/2022/10/buku.png" alt="Books" />
                    
                    <h1 className="text-4xl font-bold">Buku Iksan Bangsawan</h1>
                </div>
                <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-x-4 gap-y-4 mt-12">
                    {books?.map((book, index) => (
                        <div key={index} className="flex flex-col p-6 bg-white border rounded-md space-y-4">
                            <div className="flex space-x-4">
                                <CoverImageContentful
                                    title={book?.image?.fields.title}
                                    url={book?.image?.fields.file.url}
                                    slug={book?.image?.slug}
                                />
                            </div>
                            <h2 className="text-2xl font-semibold">{book?.title}</h2>
                            <p className='line-clamp-3'>{book?.desc}</p>
                            {book.url && <a href={book.url} className="text-blue-600 hover:underline">More Info</a>}
                            {book.url_alter && <a href={book.url_alter} className="text-blue-600 hover:underline ml-4">Alternative Link</a>}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Books