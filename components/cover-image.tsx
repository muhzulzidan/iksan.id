import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import sharp from 'sharp'


interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
  blogDetails?: boolean
}


export default function CoverImage({ title, coverImage, slug, blogDetails }: Props) {

  const image = (
    <div className='flex w-full '>
      <Image
      
        quality={50}
        priority
        width={500}
        height={250}
        alt={`Cover Image for ${title}`}
        src={coverImage?.node.sourceUrl}
        className={cn('shadow-small  w-full', {
          'hover:shadow-medium transition-shadow duration-200': slug,
          'aspect-video object-cover': !blogDetails, // Use 'object-cover' when blogDetails is false
          'h-full': blogDetails,  // Use 'object-contain' when blogDetails is true
        })}
      />
    </div>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blogs/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
