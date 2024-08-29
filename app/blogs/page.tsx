
import { Metadata } from 'next';

import Container from '@/components/container';
import MoreStories from '@/components/contentful/more-stories';
import Layout from '@/components/layout';
import { getAllPostsForHome,  } from '@/lib/api';
import { getMetaDefault, getBlogs } from '@/lib/contentful';``


export async function generateMetadata(): Promise<Metadata> {
    // Assuming getMetaDefault is your fetching function
    const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
    const metaDefault = metaDefaults[0];

    const title = `Blog ${metaDefault?.title} ` || 'Blog';
    const description = metaDefault?.description || 'Default Description';
    // Ensure imageUrl is always an absolute URL
    const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

    // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
    const metadataBase = new URL(baseUrl);
    
    return {
        metadataBase, // Set the metadataBase
        title,
        alternates: {
            canonical: `/blogs/`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `https://${imageUrl}`, // Ensure the URL is absolute
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        // You can add additional metadata here, such as Twitter cards or specific social media links
        twitter: {
            card: 'summary_large_image',
            site: '@iksanbangsawan', // Replace with actual Twitter username
            title,
            description,
            images: `https://${imageUrl}`,
        },

    };
}


async function Blogs() {
    // const allPosts = await getAllPostsForHome(false);
    const metaDefault = await getMetaDefault();
    
    const allPosts = await getBlogs();
    // const heroPost = allPosts.edges[0]?.node;
    // const initialPosts = allPosts.edges // Display initial 3 posts
    const initialPosts = allPosts // Display initial 3 posts
    // const [morePosts, setMorePosts] = useState(initialPosts);
    // console.log(allPosts)
    // console.log(initialPosts)
    
//     const blogs = allPosts;

//     const URL = "https://iksan.id";
//     console.log(blogs.edges, "blogs");
// const allBlogs = (blogs.edges).map(({ node }: Blog) => {

//             return {
//                 url: `${URL}/blogs/${node.slug}`,
//                 lastModified: new Date(node.date),
//                 priority: 0.64,
//                 changeFrequency: "daily",
//             };
//         });
    console.log(allPosts, "slug");

    return (
        <Layout metaDefault={metaDefault}>

            <Container>
                <div className="py-12">
                    {initialPosts.length > 4 && <MoreStories posts={initialPosts} more={false} />}
                </div>
            </Container>
        </Layout>
    );
}

export default Blogs