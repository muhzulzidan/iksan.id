// utils/contentful.js

import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACEID ?? '', // Ensure string type
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '', // Ensure string type
});

export async function getCourses() {
// export async function getCourses(): Promise<Course[]> {
    const entries = await client.getEntries({
        content_type: 'course',
    });

    // if (entries.items) return entries.items.map((item: any) => {
    //     const imagesArray = item.fields.images || []; // Provide a default empty array if images is undefined

    //     return {
    //         id: item.sys.id,
    //         title: item.fields.title,
    //         description: item.fields.description|| null, 
    //         descriptionShort: item.fields.descriptionShort|| null, 
    //         price: item.fields.price,
    //         priceOld: item.fields.priceOld,
    //         slug: item.fields.slug,
    //         videosTotal: item.fields.videosTotal || null, 
    //         images: imagesArray.map(image => `https:${image.fields.file.url}`) 
    //     }
    // });
    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getTemplates() {
    const entries = await client.getEntries({
        content_type: 'template',
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getKelas() {
    const entries = await client.getEntries({
        content_type: 'kelas',
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getEbooks() {
    const entries = await client.getEntries({
        content_type: 'ebook',
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getbooks() {
    const entries = await client.getEntries({
        content_type: 'books',
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getPressKits() {
    const entries = await client.getEntries({
        content_type: 'pressKit', // Make sure 'pressKit' matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}

export async function getPressKitLogos() {
    const entries = await client.getEntries({
        content_type: 'pressKit-2', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getPressKitLogosOrder() {
    const entries = await client.getEntries({
        content_type: 'pressKitLogoOrder', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}

export async function getTtemplateCategory() {
  const entries = await client.getEntries({
        content_type: 'templateCategory', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}

export async function getPhotos() {
  const entries = await client.getEntries({
        content_type: 'photos', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getTimeline() {
  const entries = await client.getEntries({
        content_type: 'timelineMilestone', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getAboutMe() {
  const entries = await client.getEntries({
        content_type: 'aboutMe', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getAbout() {
  const entries = await client.getEntries({
        content_type: 'aboutMe', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getWallpaper() {
  const entries = await client.getEntries({
        content_type: 'wallpaper', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}

export async function getWallpaperBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'wallpaper',
    'fields.slug': slug,
  });

  if (entries.items && entries.items.length > 0) {
    return entries.items[0].fields;
  }

  return null;
}

export async function getBusinessInfo(slug: string) {
  const entries = await client.getEntries({
    content_type: 'businessInfo', // Ensure this matches the content type ID in Contentful
  });

  if (entries.items) {
    // Filter the entries to find the one with the matching slug
    const businessEntry = entries.items.find((item) => item.fields.slug === slug);

    if (businessEntry) {
      return [businessEntry.fields];
    }
  }

  return [];
}
export async function getAllBusinessSlugs() {
  const entries = await client.getEntries({
    content_type: 'businessInfo', 
  });

  if (entries.items) {
    return entries.items.map((item) => item.fields.slug);
  }

  return [];
}
export async function getgadget() {
  const entries = await client.getEntries({
        content_type: 'toolbox', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getHomepage() {
  const entries = await client.getEntries({
        content_type: 'homepage', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getPageTitles() {
  const entries = await client.getEntries({
        content_type: 'pageTitles', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getMetaDefault() {
  const entries = await client.getEntries({
        content_type: 'metaDefault', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getSubscribe() {
  const entries = await client.getEntries({
        content_type: 'subscribe', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getBlogs() {
  const entries = await client.getEntries({
    content_type: 'blog', // Ensure this matches the content type ID in Contentful
    });

    if (entries.items) return entries.items.map((item) => item.fields);

    return [];
}
export async function getBlogBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blog', // Ensure this matches the content type ID in Contentful
    'fields.slug': slug,
    limit: 1,
  });

  if (entries.items && entries.items.length > 0) {
    return entries.items[0].fields;
  }

  return null;
}
export async function getEvent(slug = null) {
  // Define a filter object to include in the Contentful API request
  const filter = slug ? { 'fields.slug': slug } : {};

  const entries = await client.getEntries({
    content_type: 'event', // Ensure this matches the content type ID in Contentful
    ...filter,
  });

  if (entries.items) return entries.items.map((item) => item.fields);

  return [];
}


export async function getProducts() {
  const [templates, courses, kelas, ebooks] = await Promise.all([
    getTemplates(),
    getCourses(),
    getKelas(),
    getEbooks(),
  ]);

  return {
    templates,
    courses,
    kelas,
    ebooks,
  };
}