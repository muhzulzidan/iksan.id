// app/photos/photosClient.tsx
import React from 'react';
import CoverImageContentful from "@/components/cover-image-contentful"
import Layout from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '...',
    description: '...',
}

const PhotosClient: React.FC<PhotosClientProps> = ({ photos, metaDefault }) => {

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950">
                <div className="flex w-full justify-center text-center flex-col gap-1 py-12">
                    <h1 className="text-2xl font-mabryBold">Photos of Iksan Bangsawan</h1>
                    <p>Use these for marketing purposes</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-0 gap-4">
                    {photos.map((photo) => (
                        <div key={photo.title} className="relative group">
                            <a
                                href={photo.image.fields.file.url}
                                download={photo.title}
                                className="block relative rounded-lg overflow-hidden"
                            >
                                <CoverImageContentful
                                    url={photo.image.fields.file.url}
                                    title={photo.title}
                                    className="rounded-lg transform transition-transform duration-300 group-hover:scale-110 relative"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 z-20 bg-stone-950 group-hover:opacity-80 transition-opacity duration-300">
                                    <p className="text-white text-lg">Click to download</p>
                                </div>
                            </a>
                            <p className="mt-2">{photo.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PhotosClient;
