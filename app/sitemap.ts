interface Blog {
    node: {
        slug: string;
        date: string;
    };
}

type UrlObject = {
  url: string;
  lastModified: Date;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};
// app/sitemap.ts  (App Router)
import { getAllPostsForHome, } from '@/lib/api';

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allPosts = await getAllPostsForHome(false);

    const blogs = allPosts;
    const URL = "https://iksan.id";

const restUrls: UrlObject[] = [

        {
            url: `${URL}/`, // Home Page
            lastModified: new Date(),
            priority: 1.0,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/blogs`, // Blogs Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "daily",
        },
        {
            url: `${URL}/wallpaper`, // Projects Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/video-course`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/template`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/profil`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/press-kit`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/photos`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/links`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/kontak`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/gadget`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/event`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/ebook`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
        {
            url: `${URL}/book`, // Skills Page
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "weekly",
        },
    ];

    const allBlogs = (blogs.edges).map(({ node }: Blog) => {
    
                return {
                    url: `${URL}/blogs/${node.slug}`,
                    lastModified: new Date(node.date),
                    priority: 0.64,
                    changeFrequency: "daily",
                };
            });


    return [...restUrls, ...allBlogs ];
}