import React from "react"; // Ensure React is imported for JSX to work
import { Metadata } from 'next'
import { getHomepage, getMetaDefault } from "@/lib/contentful";
import Markdown from 'react-markdown'

import { Product, WithContext } from 'schema-dts'

import TwoColumnLayout from "@/components/TwoColumnLayout";
import Clients from "@/components/clients";
import CoverImageContentful from "@/components/cover-image-contentful";
import Layout from "@/components/layout";
import { Swiper, SwiperSlide } from "@/components/swiperElement";
// Assuming environment variables are correctly set for the API URL and any auth tokens
const API_URL = process.env.WORDPRESS_API_URL || "https://default.api.url";



// Ensure the environment variable is set, otherwise use a fallback URL
if (!API_URL) {
  throw new Error("WORDPRESS_API_URL environment variable is not set.");
}

async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Network response was not ok, status: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}, first: 100) {
        edges {
          node {
            title
            excerpt
            slug
            date
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `);

  return data?.posts;
}



export async function generateMetadata(): Promise<Metadata> {
  // Assuming getMetaDefault is your fetching function
  const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];

  const metaDefault = metaDefaults[0];


  const title = metaDefault?.title || 'Default Title';
  const description = metaDefault?.description || 'Default Description';
  // Ensure imageUrl is always an absolute URL
  const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

  // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
  const metadataBase = new URL(baseUrl);

``
  console.log(metaDefaults)

  return {
    metadataBase, // Set the metadataBase
    title,
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


// Example Page component assuming other necessary imports and definitions
const HomePage: React.FC<{ preview?: boolean }> = async ({ preview = false }) => {
  const allPostsData = await getAllPostsForHome();
  const homepageDataResult = await getHomepage();

  const homepageData: HomepageData = homepageDataResult[0] as unknown as HomepageData;

  // Use optional chaining and nullish coalescing to safely access properties and provide fallback values
  const blogs = allPostsData?.edges?.slice(0, 3) ?? [];
  const insights = allPostsData?.edges?.slice(3, 7) ?? [];

  const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];

  const metaDefault = metaDefaults[0];

  // Ensure there's a fallback for each field to prevent runtime errors
  const title = metaDefault?.title || 'Default Title';
  const description = metaDefault?.description || 'Default Description';
  const imageUrl = metaDefault?.image?.fields?.file?.url || '/default-image.jpg'; // Adjust according to your object structure
  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${title}`,
    image: imageUrl,
    description: `${description}`,
  }

  return (
    <Layout metaDefault={metaDefault}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col flex-wrap ">

        <section className="bg-stone-100 w-full max-w-screen-lg mx-auto text-stone-950">
          <div className="grid  px-4 py-8 mx-auto lg:gap-2 xl:gap-0 lg:py-16 lg:grid-cols-12 max-w-screen-lg">
            <div className=" relative  mb-8 md:mb-0 lg:mt-0 lg:col-span-6 md:flex ">
              {homepageData.hero && (
                <CoverImageContentful
                  url={homepageData.hero.fields?.file.url ?? ''}
                  title={homepageData.hero.fields?.title ?? 'Default Title'}
                />
              )}
            </div>

            <div className="mr-auto lg:pr-12 lg:pl-8  place-self-center lg:col-span-6">
              <h3 className="text-2xl  font-semibold mb-2">{homepageData.h2}</h3>
              <h2 className='font-kanakiraHeavy font-extrabold relative max-w-2xl mb-4 text-2xl  tracking-tight leading-none md:text-4xl text-stone-950 flex flex-col gap-1 '>
                <Markdown>
                  {homepageData.ttile}
                </Markdown>

              </h2>
              <div className='flex flex-col gap-1 py-2 mb-4 text-lg'>
                <p className="">{homepageData.description}</p>
              </div>
              <a href={homepageData?.linksPrimary?.fields.links} className="inline-flex font-kanakiraBold items-center justify-center px-5 py-3 mr-3 mb-4 md:mb-0 text-base font-medium text-center text-stone-50 rounded-lg bg-secondary2 hover:bg-purple-800 focus:ring-4 focus:ring-stone-300 hover:text-stone-50">
                {homepageData?.linksPrimary?.fields.title}

                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
              <a href={homepageData?.linksSecondary?.fields.links} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-stone-900 border border-secondary2 rounded-lg hover:bg-purple-600 focus:ring-4 focus:ring-stone-100 hover:text-stone-50  ">
                {homepageData?.linksSecondary?.fields.title}
              </a>
            </div>

          </div>
        </section>
        <section className='bg-stone-100 w-full max-w-screen-lg mx-auto'>
          <Clients logos={homepageData.logos} />
        </section>

        <section className='bg-stone-100 px-4 w-full max-w-screen-lg mx-auto py-12 text-stone-950  '>

          <h2 className='text-center text-3xl font-bold py-1 w-[80%] mx-auto'>{homepageData.headingSection3}</h2>
          <p className='text-center text-lg mb-16'>{homepageData?.descriptionSection3}</p>
          <div className='hidden md:grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

            {homepageData?.greatUpgrade?.map((item, index) => (
              <div
                key={index}
                className={`flex  w-full py-6 max-w-sm bg-${item.fields.color} text-stone-50 border border-stone-200 rounded-xl shadow gap-4`}
              >
                <div className='flex items-center justify-center  flex-col'>
                  <a href={item.fields.links} target="_blank" rel="noopener noreferrer">
                    <CoverImageContentful
                      url={item.fields.icons.fields.file.url}
                      title={item.fields.icons.fields.title}
                    />
                    {/* {console.log(item)} */}
                  </a>
                  <div className="px-5 pt-3">
                    <h2 className='font-mabryBold text-center'>{item.fields.title}</h2>
                  </div>
                </div>
              </div>
            ))}




          </div>
          <div className='md:hidden block'>
            <Swiper
              className='uppercase'
              loop={false}
              spaceBetween={20}
              slidesPerView={1.1}
            >
              {homepageData?.greatUpgrade?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`w-full py-6 max-w-sm bg-${item.fields.color} text-stone-50 border border-stone-200 rounded-xl shadow gap-4`}
                  >
                    <a href={item.fields.links} target="_blank" rel="noopener noreferrer">
                      <CoverImageContentful
                        url={item.fields.icons.fields.file.url}
                        title={item.fields.icons.fields.title}
                      />
                    </a>
                    <div className="px-5 pt-3">
                      <h2 className='font-mabryBold text-center'>{item.fields.title}</h2>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* </LazyLoad> */}
        </section>


        <section className='w-full  max-w-screen-lg mx-auto' >

          <TwoColumnLayout blogs={blogs} insights={insights} data={allPostsData} />

        </section>


      </main>
    </Layout>
  );
}

export default HomePage;
