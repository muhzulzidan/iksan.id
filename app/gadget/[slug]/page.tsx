// app/gadget/[slug]/page.tsx

import { getgadget, getMetaDefault } from '@/lib/contentful';
import GadgetPageClient from './gadgetClient';
import { Metadata } from 'next';
import slugify from 'slugify';

interface Params {
    params: {
        slug: string;
    };
}

interface MetaDefault {
    title: string;
    description: string;
    image: {
        fields: {
            file: {
                url: string;
            };
        };
    };
}


export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    const title = `Gadget ${metaDefault?.title} ` || 'Template';
    const description = metaDefault?.description || 'Default Description';
    const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);

    return {
        metadataBase,
        title,
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
        twitter: {
            card: 'summary_large_image',
            site: '@iksanbangsawan',
            title,
            description,
            images: `https://${imageUrl}`,
        },
    };
}

async function GadgetPageServer({ params }: Params) {
    const { slug } = params;

    try {
        const metaDefault = await getMetaDefault() as unknown as MetaDefault;
        const gadgets = await getgadget() as unknown as GadgetItem[];
        const gadget = gadgets.find((item) => slugify(item.title, { lower: true }) === slug);

        if (!gadget) {
            throw new Error('Not Found');
        }

        return (
            <GadgetPageClient
                gadgets={gadgets}
                gadget={gadget}
                metaDefault={metaDefault}
            />
        );
    } catch (error) {
        console.error('Error fetching gadget data:', error);
        return (
            <div>
                <h1>Error</h1>
                <p>Could not fetch gadget data. Please try again later.</p>
            </div>
        );
    }
}

export default GadgetPageServer;