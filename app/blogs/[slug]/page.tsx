// app/posts/[slug]/page.tsx

import { getPostAndMorePosts, getAllPostsWithSlug } from '@/lib/api';
import { getMetaDefault } from '@/lib/contentful';
import PostPageClient from './blogClients'; // Assuming this is your client component
import { Metadata } from 'next'

// genereate excerpt from data.post.content

// can you see the data.post.content  ?
// const excerpt = data.post.content.slice(0, 160); 

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    const data = await getPostAndMorePosts(slug, false, null);
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];
    
    console.log(data.post.content, "data.post.content")

    const title = data.post.title || metaDefault?.title || 'Default Title';

    const description = data.post.content.replace(/<[^>]*>/g, '').slice(0, 160) || metaDefault?.description || 'Default Description';
    
    const imageUrl = metaDefault?.image?.fields?.file?.url
        ? `https://${new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString()}`
        : '/default-image.jpg';

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
                    url: data.post.featuredImage?.node.sourceUrl || imageUrl,
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
            images: data.post.featuredImage?.node.sourceUrl || imageUrl,
        },
    };
}
async function BlogPages({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data = await getPostAndMorePosts(slug, false, null);
    const metaDefault = await getMetaDefault()  as unknown as MetaDefault

    // Pass fetched data to the client component
    return(
        <PostPageClient
            post={data.post}
            posts={data.posts}
            metaDefault={metaDefault}        
            />
    )
}
export default BlogPages