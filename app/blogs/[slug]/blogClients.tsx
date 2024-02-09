"use client"

import { useRouter } from 'next/navigation'
import ErrorPage from 'next/error'
// import Head from 'next/head'
// import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import PostTitle from '@/components/post-title'
import Tags from '@/components/tags'



const PostClient: React.FC<PostClientProps & { metaDefault: MetaDefault }> = ({ post, posts, metaDefault }) => {

    const router = useRouter()

    return (
        <Layout metaDefault={false} >

            <Container>
             
                    <>
                        <article className='md:pt-10 mx-auto max-w-screen-lg md:px-6'>
                            {/* <Head>
                                <title>
                                    {`${post.title} | iksan bangsawan indonesia ${CMS_NAME}`}
                                </title>
                                <meta
                                    property="og:image"
                                    content={post.featuredImage?.node.sourceUrl}
                                />
                            </Head> */}
                            <PostHeader
                                title={post.title}
                                coverImage={post.featuredImage}
                                date={post.date}
                                author={post.author}
                                categories={post.categories}
                                url={post.slug}
                                blogDetails={true}
                                category={undefined}
                            />
                            {post.content
                                ?
                                <PostBody content={post.content} />
                                :
                                <div>

                                </div>}
                            <footer>
                                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                            </footer>
                        </article>

                        <SectionSeparator />
                        {/* {morePosts.length > 0 && <MoreStories posts={morePosts} more={true} />} */}
                    </>
             
            </Container>
        </Layout>
    )
}


export default PostClient