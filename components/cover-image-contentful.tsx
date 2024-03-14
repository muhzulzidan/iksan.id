import ContentfulImage from '../lib/contentful-image'
import Link from 'next/link'

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function CoverImageContentful({
    title,
    url,
    slug,
    className, decoding
}: {
    title: string
    url: string
    slug?: string
    className?: string
    decoding?: string
}) {
    const image = (
        <ContentfulImage
        decoding={decoding}
            alt={`Cover Image for ${title}`}
            priority
            width={2000}
            height={1000}
            className={`shadow-small rounded-lg transform transition-transform duration-300 
  ${slug ? 'hover:shadow-medium transition-shadow duration-200' : ''} 
  ${className ? className : ''}`}
            src={url}
        />
    )

    return (
        <div className="sm:mx-0 relative ">
            {slug ? (
                <Link href={`/posts/${slug}`} aria-label={title}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    )
}