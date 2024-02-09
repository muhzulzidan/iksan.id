import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getEvent, getMetaDefault } from '@/lib/contentful';
import Layout from '@/components/layout';
import CoverImageContentful from "@/components/cover-image-contentful";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
const EventsPage = async () => {

    const event = await getEvent() as unknown as EventItem[];
    const metaDefault = await getMetaDefault();

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-gray-100 text-gray-900">
                <h1 className="text-3xl font-bold mb-4">All Events</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4'>
                    {event.map((event) => (
                        <Link href={`/event/${event.slug}`} key={event.slug} className="mb-8 p-4  rounded-lg ">

                              <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>

                                {event?.gallery.map((file, index) => (
                                    <CarouselItem key={index} className='aspect-video' >
                                        <CoverImageContentful
                                            url={file.fields.file.url}
                                            title={file.fields.file.fileName}
                                            className="rounded-lg object-cover aspect-video"
                                        />
                                    </CarouselItem>
                                ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <div className='pt-4'>
                                <h2 className="text-2xl font-semibold">{event?.title}</h2>
                                <p className="text-gray-600">{event?.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default EventsPage;
