// app/template/page.tsx


import { Metadata, ResolvingMetadata } from 'next';
import { getTemplates, getTtemplateCategory, getTtemplatePopular, getPageTitles, getMetaDefault } from '../../lib/contentful';
import notion from '../../lib/notion';
import TestInvoice from './testInvoice';


export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];



    const title = `Template ${metaDefault?.title} ` || 'Template';
    const description = metaDefault?.description || 'Default Description';
    // Ensure imageUrl is always an absolute URL
    const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    ``


    return {
        metadataBase,
        title,
        description,
        alternates: {
            canonical: `/template/`,
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


// const getSession = async () => {
//     const response = await fetch('/api/session');
//     const data = await response.json();
//     console.log(data, "data")
//     return data;
// };

async function TestInvoicePage() {
    const templates = await getTemplates() as unknown as Template[];

    const PageTitles = await getPageTitles() as unknown as PageTitle[];
    const templateCategory = await getTtemplateCategory() as unknown as TemplateCategory[];
    const templatePopular = await getTtemplatePopular() as unknown as TemplatePopular[];
    const metaDefault = await getMetaDefault();
    // const session = await getSession();

    // console.log(session, "session")

    return (
        <TestInvoice
            templates={templates}
            pageTitles={PageTitles}
            templateCategory={templateCategory}
            templatePopular={templatePopular}

        />
    );
}


export default TestInvoicePage