// app/event/[slug].client.tsx
"use client";

import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XCircle, Download } from 'react-bootstrap-icons';
import Markdown from 'react-markdown';
import Layout from '@/components/layout';
import CoverImageContentful from "@/components/cover-image-contentful";

const EventPageClient: React.FC<EventPageClientProps> = ({ event, metaDefault }) => {

    const [selectedImage, setSelectedImage] = useState("");

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-900">
                <div className="mb-4 flex justify-start flex-col w-full p-4">
                    <h1 className="text-3xl font-bold ">
                        {event?.title}
                    </h1>
                    <div className='prose'>
                        <Markdown>
                            {event?.description}
                        </Markdown>
                    </div>
                    {/* <p>{event.description}</p> */}
                    <p className="text-stone-600">
                        Date: {event?.date}
                    </p>
                </div>
                <div className="mb-8 p-4 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event?.gallery.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(file.fields.file.url)}
                            className="w-full  relative group cursor-pointer overflow-hidden rounded-lg focus:outline-none focus:ring focus:ring-secondary2"
                        >

                            <CoverImageContentful
                                url={file.fields.file.url}
                                title={file.fields.file.fileName}
                                className="transition-transform duration-300 transform group-hover:scale-105 rounded-lg aspect-auto"
                            />


                        </button>
                    ))}
                </div>



                {/* Modal for Image */}
                <Transition show={selectedImage !== ""} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto top-1/3 md:top-6"
                        onClose={() => setSelectedImage("")}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-stone-100    bg-opacity-30 backdrop-blur-sm" />
                            </Transition.Child>

                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
                                    <div className="bg-white p-4">
                                        <CoverImageContentful
                                            url={selectedImage}
                                            title={`selectedImage`}
                                            className='rounded-lg object-contain aspect-video'
                                        />
                                    </div>
                                    <div className="p-4 flex">
                                        <button
                                            onClick={() => setSelectedImage("")}
                                            className="text-secondary2 hover:underline flex mr-4"
                                        >
                                            <XCircle size={20} className="mr-2" />
                                            Close
                                        </button>
                                        <a
                                            href={selectedImage}
                                            download
                                            className="text-secondary2 flex hover:underline"
                                        >
                                            <Download size={20} className="mr-2" />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </Layout>
    );
};

export default EventPageClient;
