// Import necessary functions and client components
import { getBusinessInfo, getMetaDefault } from '@/lib/contentful';
import BusinessPageClient from './bussinessClient';
import { Props } from 'next/script';
import { ParsedUrlQuery } from 'querystring';


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