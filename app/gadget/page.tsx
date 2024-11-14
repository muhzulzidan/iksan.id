// app/gadget/page.tsx (Server component for fetching data)
import { getgadget, getPageTitles, getMetaDefault } from '@/lib/contentful';
import GadgetClient from './GadgetClients';
import { Metadata } from 'next';
import { headers } from 'next/headers';


export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];


    const title = `Gadget ${metaDefault?.title} ` || 'Template';
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
        alternates: {
            canonical: `/gadget/`,
        },
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

 async function GadgetPage() {
    const gadget = await getgadget() as unknown as GadgetItem[]
    const pageTitles = await getPageTitles() as unknown as PageTitle[]
    const metaDefault = await getMetaDefault() as unknown as MetaDefault
    
     const headersList = headers();
     const activePath = (await headersList).get("x-invoke-path");

     console.log(activePath, "headers");

    // Pass the fetched data to the page via props
    return (
        <GadgetClient
            gadget={gadget} 
            pageTitles={pageTitles} 
            metaDefault={metaDefault}
        />
    );
}


export default GadgetPage