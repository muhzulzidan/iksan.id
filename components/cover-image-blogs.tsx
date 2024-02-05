import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
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
      <Image
        priority  
        width={1000}
        height={500}
        alt={`Cover Image for ${title}`}
        src={coverImage?.node.sourceUrl}
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
    <div className="sm:mx-0 shadow-md bg-gray-200 hover:shadow-lg relative">
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
