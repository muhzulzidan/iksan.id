// app/wallpaper/[slug]/page.tsx

import { getWallpaper, getMetaDefault, getWallpaperBySlug } from '@/lib/contentful';
import WallpaperPageClient from './wallpaperClient';
import { Metadata } from 'next';

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

interface Wallpaper {
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

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    const title = `Wallpaper ${metaDefault?.title} ` || 'Template';
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

async function WallpaperPageServer({ params }: any) {
    const { slug } = params;

    try {
        const metaDefault = await getMetaDefault() as unknown as MetaDefault;
        const wallpaperArray = await getWallpaper() as unknown as any[];
        const wallpaper = await getWallpaperBySlug(slug) as unknown as Wallpaper;
        const wallpapers = await getWallpaper() as unknown as any[];

        if (!wallpaper) {
            throw new Error('Not Found');
        }

        return (
            <WallpaperPageClient
                wallpapers={wallpapers}
                wallpaper={wallpaper}
                metaDefault={metaDefault}
            />
        );
    } catch (error) {
        console.error('Error fetching wallpaper data:', error);
        return (
            <div>
                <h1>Error</h1>
                <p>Could not fetch wallpaper data. Please try again later.</p>
            </div>
        );
    }
}

export default WallpaperPageServer;