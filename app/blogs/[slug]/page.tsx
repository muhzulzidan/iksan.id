// app/posts/[slug]/page.tsx

import { getPostAndMorePosts, getAllPostsWithSlug } from '@/lib/api';
import { getMetaDefault } from '@/lib/contentful';
import PostPageClient from './blogClients'; // Assuming this is your client component

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