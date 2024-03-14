// Import necessary functions and client components
import { getBusinessInfo, getMetaDefault } from '@/lib/contentful';
import BusinessPageClient from './bussinessClient';
import { Props } from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { Metadata } from 'next';


export async function generateMetadata({ params }: { params: ParsedUrlQuery }): Promise<Metadata> {

    // Ensure slug is a string. If it's an array or undefined, handle accordingly.
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    // If slug is undefined or an empty string, throw an error or handle as a 404.
    if (!slug) {
        throw new Response('Not Found', { status: 404 });
    }

    // console.log(slug, "slug")
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];
    const businessInfo = await getBusinessInfo(slug) as unknown as BusinessInfo[]; // Since businessInfo is an array

    // console.log(businessInfo[0].businessImage[0].fields.file.url, "businessInfo[0].businessImage[0].fields.file.url")

    const title = businessInfo[0].title ||`Profil ${metaDefault?.title} ` || 'Template';
    const description = `${businessInfo[0].description}` || metaDefault?.description || 'Default Description';
    // Ensure imageUrl is always an absolute URL
    const imageUrl = businessInfo[0].businessImage[0].fields.file.url || metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    return {
        metadataBase,
        title,
        alternates: {
            canonical: `/business/${slug}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `https://${imageUrl}`, 
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


async function BusinessPage({ params }: { params: ParsedUrlQuery }): Promise<{ props: Props }> {
    // Ensure slug is a string. If it's an array or undefined, handle accordingly.
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    // If slug is undefined or an empty string, throw an error or handle as a 404.
    if (!slug) {
        throw new Response('Not Found', { status: 404 });
    }
    const businessInfo = await getBusinessInfo(slug) as unknown as BusinessInfo[]; // Since businessInfo is an array

     const metaDefault = await getMetaDefault() as unknown as MetaDefault

     // Handling the case where no business information is found
     if (!businessInfo || businessInfo.length === 0) {
         throw new Response('Not Found', { status: 404 });
     }



    return <BusinessPageClient businessInfo={businessInfo} metaDefault={metaDefault} />;
}


export default BusinessPage