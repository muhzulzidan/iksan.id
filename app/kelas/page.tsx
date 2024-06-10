// app/template/[slug]/page.tsx

// make a landing page for each template according to the slug
// get the template data from contentful
// create a page for each template
// app router server components page.tsx

import { getBusinessInfo, getMetaDefault, getTemplates } from '@/lib/contentful';
// import { ParsedUrlQuery } from 'querystring';
// import TemplateClients from './TemplateClients';
import { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import MentoringClient from './MentoringClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;

    const data = await getTemplates();
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    let url;
    const title = 'Mentoring';
    let description = 'Default Description';

    const imageUrl = metaDefault?.image?.fields?.file?.url
        ? `https://${new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString()}`
        : '/default-image.jpg';

    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    return {
        metadataBase,
        alternates: {
            canonical: `/blogs/${slug}`,
        },
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: url || imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@iksanbangsawan',
            title,
            description,
            images: url || imageUrl,
        },
    };
}

async function MentoringPage({ params }: { params: { slug: string } }) {

    return <MentoringClient  />;
}

export default MentoringPage;

