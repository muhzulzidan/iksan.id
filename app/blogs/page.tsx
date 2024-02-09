

import Container from '@/components/container';
import MoreStories from '@/components/more-stories';
import Layout from '@/components/layout';
import { getAllPostsForHome, getPostAndMorePosts, } from '@/lib/api';
import { getMetaDefault } from '@/lib/contentful';
import { CMS_NAME } from '@/lib/constants';


async function Blogs() {
    const allPosts = await getAllPostsForHome(false);
    const metaDefault = await getMetaDefault();


    const heroPost = allPosts.edges[0]?.node;
    const initialPosts = allPosts.edges // Display initial 3 posts
    // const [morePosts, setMorePosts] = useState(initialPosts);

    return (
        <Layout metaDefault={metaDefault}>

            <Container>
                <div className="py-12">
                    {initialPosts.length > 4 && <MoreStories posts={initialPosts} more={false} />}
                    {/* <button onClick={handleLoadMore}>Load More</button> */}
                </div>
            </Container>
        </Layout>
    );
}

export default Blogs