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

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const PostClient: React.FC<PostClientProps> = ({ post, }) => {


    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
            // Add more custom renderers as needed
        },
    };

    const router = useRouter()
// console.log(post, "post")
    return (
        <Layout metaDefault={false} >

            <Container>

                <>
                    <article className='md:pt-10 mx-auto max-w-screen-lg md:px-6'>
                        <PostHeader
                            title={post.postTitle}
                            coverImage={post.featuredImage}
                            date={post.date}
                            author={"iksan bangsawan"}
                            categories={post.categories}
                            url={post.slug}
                            blogDetails="true" // Fix: Change the value to a string
                            category="" // Fix: Assign an empty string instead of undefined
                        />
                        {post.content
                                ?
                              <div className='prose max-w-none'>  
                                {documentToReactComponents(post.content, options)}

                              {/* <PostBody content={post.content} /> */}
                              </div>
                                :
                                <div>
                                </div>}
                        <footer>
                            {/* {post.tags.edges.length > 0 && <Tags tags={post.tags} />} */}
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