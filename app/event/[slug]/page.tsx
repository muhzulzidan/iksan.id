// app/event/[slug]/page.tsx



import { getEvent, getMetaDefault } from '@/lib/contentful';
import EventPageClient from './eventClient';

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