// wallpaperClient.tsx
"use client"

import React from 'react';
import CoverImageContentful from '@/components/cover-image-contentful';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import Link from 'next/link';
import slugify from 'slugify';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

interface Wallpaper {
    title: string;
    description?: any;
    image: {
        fields: {
            file: {
                url: string;
                details: {
                    image: {
                        height: number;
                        width: number;
                    };
                };
                fileName: string;
                contentType: string;
                size: number;
            };
        };
    };
    copyright?: string;
    designer?: string;
}

interface WallpaperClientProps {
    wallpaper: any;
    wallpapers: any[];
    metaDefault: MetaDefault;
}

const WallpaperClient: React.FC<WallpaperClientProps> = ({ wallpaper, wallpapers, metaDefault }) => {
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

    console.log(wallpaper, "wallpaper");
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => <strong>{text}</strong>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => <p className="text-xs text-gray-700 mb-4">{children}</p>,
            [BLOCKS.HEADING_1]: (node: any, children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
            [BLOCKS.HEADING_2]: (node: any, children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
            // Add more renderers as needed
        },
    };

    const resolution = wallpaper.image.fields.file.details.image
        ? `${wallpaper.image.fields.file.details.image.width} x ${wallpaper.image.fields.file.details.image.height}`
        : '';

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button
                    variant={"ghost"}
                    className="flex items-center mb-4 text-gray-700 hover:text-gray-900"
                    onClick={() => router.push("/wallpaper")}
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Go Back
                </Button>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                        <CoverImageContentful
                            url={wallpaper.image.fields.file.url}
                            title={wallpaper.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{wallpaper.title}</h1>
                        {wallpaper.description && (
                            <div className="text-xs text-gray-700 mb-4">
                                {documentToReactComponents(wallpaper.description, options)}
                            </div>
                        )}
                       <div className='flex flex-col gap-0'>
                            {resolution && (
                                <p className="text-xs text-gray-700 ">Resolution: {resolution}</p>
                            )}
                            {wallpaper.copyright && (
                                <p className="text-xs text-gray-700 ">Copyright: {wallpaper.copyright}</p>
                            )}
                            {wallpaper.designer && (
                                <p className="text-xs text-gray-700 ">Designer: {wallpaper.designer}</p>
                            )}
                       </div>
                        {wallpaper.image.fields.file.url && (
                            <Button
                                className="mt-4 bg-secondary3 hover:scale-110 transform transition-transform duration-300 hover:bg-yellow-800"
                                onClick={() => window.open(wallpaper.image.fields.file.url, '_blank')}
                            >
                                Download
                            </Button>
                        )}
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

export default WallpaperClient;