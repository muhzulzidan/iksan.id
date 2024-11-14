// app/template/[slug]/page.tsx

// make a landing page for each template according to the slug
// get the template data from contentful
// create a page for each template
// app router server components page.tsx

import { getBusinessInfo, getMetaDefault, getTemplates } from '@/lib/contentful';
import { ParsedUrlQuery } from 'querystring';
import TemplateClients from './TemplateClients';
import { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';


export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { slug } = await params;

    const data = await getTemplates();
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    const template = data.find((template) => template.slug === slug);

    // If template is null or undefined, throw an error
    if (!template) {
        throw new Error(`Template with slug "${slug}" not found`);
    }

    let title: string | TemplateString | null | undefined = 'Default Title';
    if (typeof template.title === 'string') {
        title = template.title;
    } else if (template.title === true) {
        title = 'True Title';
    } else {
        title = metaDefault?.title;
    }

    let url;
    if (typeof template.fields === 'object' && template.fields !== null && 'image' in template.fields) {
        const fields = template.fields as { image?: { fields?: { file?: { url?: string } } } };
        url = fields.image?.fields?.file?.url;
    } else if (typeof template === 'object' && template !== null && 'image' in template) {
        const templateObj = template as { image?: { fields?: { file?: { url?: string } } } };
        url = templateObj?.image?.fields?.file?.url;
    }

    let description = 'Default Description';
    if (typeof template.description === 'string') {
        description = template.description.replace(/<[^>]*>/g, '').slice(0, 160);
    }

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

async function TemplatePage({ params }: { params: any }) {
    const { slug } = await params;
    const templates = await getTemplates() as unknown as Template[];
    const template = templates.find((template) => template.slug === slug);

    // If template is null or undefined, throw an error
    if (!template) {
        throw new Error(`Template with slug "${slug}" not found`);
    }

    return <TemplateClients template={template} />;
}

export default TemplatePage;

