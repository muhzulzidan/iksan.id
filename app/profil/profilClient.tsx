// app/profil/profilClient.tsx

"use client"

import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown'

import { Swiper, SwiperSlide } from '@/components/swiperElement';
import CoverImageContentful from "@/components/cover-image-contentful"
import Layout from '@/components/layout';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const ProfilClient = ({ timelineData, aboutme, metaDefault }: ProfilClientProps) => {
    const about = aboutme[0]

    const [reversedTimelineData, setReversedTimelineData] = useState<TimelineItem[]>([]);

    useEffect(() => {
        // Reverse the order of timelineData when the component mounts
        setReversedTimelineData([...timelineData].reverse());
    }, [timelineData]);
    if (!about) {
        return null; 
    }
    return (
        <Layout metaDefault={metaDefault}>
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-3xl font-bold mb-8 hidden">My Story</h1>

                <div className='md:px-12'>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                        {reversedTimelineData.map((item, index) => (
                            <CarouselItem key={index} className="relative cursor-pointer group md:basis-1/2 lg:basis-1/3 mx-4">
                                <CoverImageContentful
                                    url={item?.image?.fields?.file.url}
                                    title={item.title}
                                    className="rounded-lg transform transition-transform duration-300 group-hover:scale-105 relative aspect-[9/16] object-cover  group-hover:delay-75"
                                />
                                <div className='absolute bottom-0 z-20 flex w-full h-full p-4 flex-col justify-end  '>
                                    <h2 className='text-stone-50 flex text-xl h-fit m-0'>{item.year}</h2>
                                    <p className='m-0 text-stone-50'>{item.description}</p>
                                </div>
                                <div className='absolute bottom-0 z-10 bg-stone-950 opacity-70 flex w-full h-full p-4  py-4 flex-col justify-end  group-hover:opacity-30 group-hover:scale-105 '></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    </Carousel>
                </div>

                <div className="mt-12 px-4 md:px-12 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">About Me:</h2>

                    <div className='prose'>
                        <Markdown>
                            {about.story}
                        </Markdown>
                    </div>
                </div>
            </div>
        </Layout>
    );
};



export default ProfilClient;
