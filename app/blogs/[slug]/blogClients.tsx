import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import PostTitle from '@/components/post-title'
import Tags from '@/components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import { getMetaDefault } from '@/lib/contentful'
import { CMS_NAME } from '@/lib/constants'


export default function PostClient({ post, posts }) {
    const router = useRouter()
    const morePosts = posts?.edges

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }
    if (!router.isFallback && !post.author) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout metaDefault={false} >

            <Container>
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article className='md:pt-10 mx-auto max-w-screen-lg md:px-6'>
                            <Head>
                                <title>
                                    {`${post.title} | iksan bangsawan indonesia ${CMS_NAME}`}
                                </title>
                                <meta
                                    property="og:image"
                                    content={post.featuredImage?.node.sourceUrl}
                                />
                            </Head>
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
                )}
            </Container>
        </Layout>
    )
}

