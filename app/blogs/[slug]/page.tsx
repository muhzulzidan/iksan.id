// app/posts/[slug]/page.tsx
import { fetch } from 'next/navigation';
import { getPostAndMorePosts, getAllPostsWithSlug } from '@/lib/api';
import { getMetaDefault } from '@/lib/contentful';
import PostPageClient from './blogClients'; // Assuming this is your client component

export async function loader({ params }) {
    const { slug } = params;
    const data = await getPostAndMorePosts(slug, false, null);
    const metaDefault = await getMetaDefault();

    // Pass fetched data to the client component
    return(
        <PostPageClient
            post={data.post} 
            posts={data.posts}
        />
    )
}
