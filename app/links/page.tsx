// app/links/page.tsx

import { getMetaDefault, getEbooks, getTemplates, getTtemplateCategory, getTtemplatePopular } from '@/lib/contentful';
import { getAllPostsForHome } from '@/lib/api'
import LinktreeClient from './linktreeClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];


    const title = `${metaDefault?.title} ` || 'Template';
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
            canonical: `/links/`,
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



export default async function LinktreePage() {

    const allPosts = await getAllPostsForHome(false);
    const ebooks = await getEbooks() as unknown as Ebook[];
    const templates = await getTemplates() as unknown as Template[]; 
    const templateCategory = await getTtemplateCategory();
    const templatePopular = await getTtemplatePopular();

    return (
        <LinktreeClient
            allPosts={allPosts}
            templates={templates}
            ebooks={ebooks}
            templateCategory={templateCategory}
            templatePopular={templatePopular}
        />
    );
}

