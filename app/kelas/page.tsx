// app/template/page.tsx


import { Metadata, ResolvingMetadata } from 'next';
import { getKelas, getTtemplateCategory, getPageTitles, getMetaDefault } from '../../lib/contentful';
// import notion from '../../lib/notion';
import KelasClient from './kelasClient';


export async function generateMetadata(): Promise<Metadata> {
  // Assuming getMetaDefault is your fetching function
  const metaDefaults = await getMetaDefault() as unknown as MetaDefault[];
  const metaDefault = metaDefaults[0];



  const title = `Kelas ${metaDefault?.title} ` || 'Kelas';
  const description = metaDefault?.description || 'Default Description';
  // Ensure imageUrl is always an absolute URL
  const imageUrl = metaDefault?.image?.fields?.file?.url ? new URL(metaDefault.image.fields.file.url, process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id').toString() : '/default-image.jpg';

  // Assuming NEXT_PUBLIC_SITE_BASE_URL is properly defined in your environment
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://iksan.id';
  const metadataBase = new URL(baseUrl);

  ``


  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: `/template/`,
    },
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


async function Kelas () {
    const kelas = await getKelas() as unknown as Kelas[]; 

    const PageTitles = await getPageTitles() as unknown as PageTitle[];
    const templateCategory = await getTtemplateCategory() as unknown as TemplateCategory[];

    const metaDefault = await getMetaDefault();


    // console.log(kelas, "kelas");

    return (
      <KelasClient 
            metaDefault={metaDefault}
            kelas={kelas}
            pageTitles={PageTitles}
            templateCategory={templateCategory}

      />
    );
}


export default Kelas