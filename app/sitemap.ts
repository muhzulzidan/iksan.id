import { MetadataRoute } from "next";
import { getBlogs } from '@/lib/contentful';
import { parseISO, format, isValid } from 'date-fns';

interface Blog {
    slug: string;
    date: string;
}

type UrlObject = {
    url: string;
    lastModified: any;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allPosts = await getBlogs();

    const URL = "https://iksan.id";

    const restUrls: UrlObject[] = [
        {
            url: `${URL}/`,
            lastModified: new Date(),
            priority: 1.0,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/blogs`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "daily",
        },
        {
            url: `${URL}/wallpaper`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/video-course`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/template`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/profil`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/press-kit`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/photos`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/links`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/kontak`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/gadget`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/event`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/ebook`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/book`,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
    ];

    const blogUrls: UrlObject[] = allPosts.map((post: any) => {
        const date = post.date ? parseISO(post.date) : null;
        const validDate = date && isValid(date) ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
        return {
            url: `${URL}/blogs/${post.slug}`,
            lastModified: validDate,
            priority: 0.64,
            changeFrequency: "daily",
        };
    });

    return [...restUrls, ...blogUrls];
}