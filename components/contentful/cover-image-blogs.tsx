import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import CoverImageContentful from '../cover-image-contentful';

interface Props {
  title: string;
  coverImage:any;
  slug?: string;
  blogDetails?: boolean;
  category?: string; // New prop for category
}

export default function CoverImageBlogs({ title, coverImage, slug, blogDetails, category }: Props) {

  const image = (
    <div className='relative w-full rounded overflow-hidden'>
      {category && (
        <div className="absolute top-4 left-4 bg-secondary2 rounded-full z-20 text-white 
        py-2 px-4 ">
          {category}
        </div>
      )}

      <CoverImageContentful
        url={coverImage.fields.file.url ?? ''}
        title={coverImage.fields?.title ?? 'Default Title'}
        className={cn(
          'w-full h-full object-cover transition-transform duration-300 transform rounded aspect-video ',
          {
            'hover:scale-105': slug, // Zoom out effect on hover
          }
        )}
      />
    </div>
  );

  return (
    <div className="sm:mx-0 shadow-md bg-stone-200 hover:shadow-lg relative">
      {slug ? (
        <Link href={`/blogs/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
