// app/event/[slug]/page.tsx



import { getEvent, getMetaDefault } from '@/lib/contentful';
import EventPageClient from './eventClient';
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

async function EventPageServer({ params }: EventPageServerProps) {

    const { slug } = params;
    const metaDefault = await getMetaDefault() as unknown as MetaDefault;
    const eventArray = await getEvent(slug) as unknown as Event[]
    const event = eventArray[0] ?? null;

    if (!event) {
        throw new Response('Not Found', { status: 404 });
    }
     return (
         <EventPageClient 
             event={event}
             metaDefault={metaDefault}
         />
     );
}

export default EventPageServer