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
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];


    const title = `Profil ${metaDefault?.title} ` || 'Template';
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
        alternates: {
            canonical: `/event/`,
        },
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


const EventsPage = async () => {

    const event = await getEvent() as unknown as EventItem[];
    const metaDefault = await getMetaDefault();

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-900">
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
                                <p className="text-stone-600">{event?.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default EventsPage;
