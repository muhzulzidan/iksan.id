// app/wallpapers/wallpapersClient.tsx
'use client'

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import Layout from '@/components/layout';
import CoverImageContentful from '@/components/cover-image-contentful';
import wallpaperIcon from '@/app/images/wallpaperIcon.png';
import { usePathname } from 'next/navigation';

const WallpapersClient: React.FC<WallpapersClientProps> = ({ wallpapers, pageTitles, metaDefault }) => {
    const router = usePathname();
    const currentSlug = router;

    const filteredPageTitles = pageTitles.filter((page) => `/${page.slug}` === currentSlug);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

    const openModal = (wallpaper: Wallpaper) => {
        setSelectedWallpaper(wallpaper);
        setIsOpen(true);
    };


    const closeModal = () => {
        setSelectedWallpaper(null);
        setIsOpen(false);
    };
    return (
        <Layout metaDefault={metaDefault}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className='gap-4 mb-8 flex justify-center items-center flex-col'>
                    <Image width={150} height={150} className="rounded-xl" src={wallpaperIcon} alt="wallpaper pages iksan bangsawan" />
                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Wallpapers'}</h1>
                    <p className="text-center text-xl max-w-md">
                        <Markdown>
                            {filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Silakan download dan gunakan sebagai wallpaper, dengan senang hati jika kamu posting di media sosial dan menandai @iksanbangsawan di postingan kamu.'}
                        </Markdown>
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wallpapers.map((wallpaper, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            <div
                                className={`rounded-lg transform transition-transform duration-300 group-hover:scale-105`}
                                onClick={() => openModal(wallpaper)}
                            >
                                <CoverImageContentful
                                    title={wallpaper.title}
                                    url={wallpaper.image.fields.file.url}

                                />
                            </div>
                        </div>
                    ))}
                </div>
                {selectedWallpaper && (
                    <Dialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-stone-950 opacity-75" />
                            <div className="mx-auto z-50 p-12 md:w-6/12 flex justify-center items-center flex-col">
                                <div className='flex gap-4 justify-between py-4 items-center w-full'>
                                    <Dialog.Title className="text-2xl font-bold text-white text-center">
                                        {selectedWallpaper.title}
                                    </Dialog.Title>
                                    <div className="modal-buttons bg-stone-50 rounded-lg p-4 py-2 w-fit">
                                        <button className="text-stone-950" onClick={closeModal}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-content ">
                                    <CoverImageContentful title={selectedWallpaper.title}
                                        url={selectedWallpaper.image.fields.file.url} className="" />
                                </div>

                            </div>
                        </div>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default WallpapersClient;
