// app/posts/[slug]/page.tsx

import { getPostAndMorePosts } from '@/lib/api';
import { getBlogBySlug, getBlogs, getMetaDefault } from '@/lib/contentful';
import PostPageClient from './blogClients'; // Assuming this is your client component
import { Metadata } from 'next'

// genereate excerpt from data.post.content

// can you see the data.post.content  ?
// const excerpt = data.post.content.slice(0, 160); 

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     const { slug } = params;
//     const allPosts = await getBlogs();
//     const data = await getBlogBySlug(slug, );
//     const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
//     const metaDefault = metaDefaults[0];
    
//     // console.log(`/blogs/${slug}`, "data.post.content")

//     const title = data.title || metaDefault?.title || 'Default Title';

//     const description = data.content.replace(/<[^>]*>/g, '').slice(0, 160) || metaDefault?.description || 'Default Description';

//     const imageUrl = metaDefault?.image?.fields?.file?.url
//         ? `https://${new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString()}`
//         : '/default-image.jpg';

//     const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
//     const metadataBase = new URL(baseUrl);

//     return {
//         metadataBase,
//         alternates: {
//             canonical: `/blogs/${slug}`,
//         },
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//             images: [
//                 {
//                     url: data.post.featuredImage?.node.sourceUrl || imageUrl,
//                     width: 1200,
//                     height: 630,
//                     alt: title,
//                 },
//             ],
//         },
//         twitter: {
//             card: 'summary_large_image',
//             site: '@iksanbangsawan',
//             title,
//             description,
//             images: data.post.featuredImage?.node.sourceUrl || imageUrl,
//         },
//     };
// }
async function BlogPages({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data = await getBlogBySlug(slug,);
    const metaDefault = await getMetaDefault()  as unknown as MetaDefault
    console.log(data, "blogs")
    // Pass fetched data to the client component
    return(
        <PostPageClient
            post={data}    
            />
    )
}
export default BlogPages