// app/photos/page.tsx
import { getPhotos, getMetaDefault } from '@/lib/contentful';
import PhotosClient from './photosClient'; // Make sure this points to your client component

 async function PhotosPage() {
    const photos = await getPhotos() as unknown as Photo[];
    const metaDefault = await getMetaDefault() as unknown as MetaDefault;

    // Return the client component and pass fetched data as props
    return <PhotosClient photos={photos} metaDefault={metaDefault} />;
}

export default PhotosPage;
