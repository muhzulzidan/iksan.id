// app/wallpaper/[slug]/wallpaperClient.tsx
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

interface Wallpaper {
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

interface WallpaperPageClientProps {
    wallpaper: Wallpaper;
    wallpapers: Wallpaper[];
    metaDefault: MetaDefault;
}

const WallpaperPageClient: React.FC<WallpaperPageClientProps> = ({ wallpaper, wallpapers, metaDefault }) => {
    const getCommonWords = (str1: string, str2: string) => {
        const words1 = str1.toLowerCase().split(' ');
        const words2 = str2.toLowerCase().split(' ');
        return words1.filter(word => words2.includes(word));
    };

    const relatedWallpapers = wallpapers.filter(wp => {
        const commonWords = getCommonWords(wp.title, wallpaper.title);
        return commonWords.length > 0 && wp !== wallpaper;
    });

    const router = useRouter();

    return (
      <Layout>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button
                    variant={"ghost"}
                    className="flex items-center mb-4 text-gray-700 hover:text-gray-900"
                    onClick={() => router.push("/wallpaper")}
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Go Back
                </Button>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
                    <div className="relative ">
                        <CoverImageContentful
                            url={wallpaper.image.fields.file.url}
                            title={wallpaper.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{wallpaper.title}</h1>
                        <p className="text-lg text-gray-700 mb-4">{wallpaper.description}</p>
                    </div>
                </div>
    
                {relatedWallpapers.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Related Wallpapers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedWallpapers.map((relatedWallpaper, index) => (
                                <Link key={index} href={`/wallpaper/${slugify(relatedWallpaper.title, { lower: true })}`} passHref>
                                    <div className="relative group cursor-pointer p-2">
                                        <div
                                            className={`rounded-lg transform transition-transform duration-300 group-hover:scale-105 shadow-lg bg-white`}
                                        >
                                            <div className="overflow-hidden rounded-t-lg">
                                                <CoverImageContentful
                                                    title={relatedWallpaper.title}
                                                    url={relatedWallpaper.image.fields.file.url}
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {relatedWallpaper.title}
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

export default WallpaperPageClient;