import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import CoverImageBlogs from './cover-image-blogs'
import PostTitle from './post-title'
import Categories from './categories'
import ShareButton from './ShareButton'

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
  url,
  blogDetails, 
  category
}) {
  // console.log(coverImage)
  const authorName = author || 'admin';
  return (
    <div className=''>
      <div className='mb-4 flex flex-col gap-2 md:gap-0 md:flex-row justify-start items-start md:justify-between md:items-center'>
        <Categories categories={categories} />
        <div className='flex'>
          <Avatar author={authorName} />
        </div>
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="flex justify-between mb-6 text-sm md:text-lg max-w-screen-lg mx-auto  text-stone-700">
        <Date dateString={date} />
      
        <ShareButton title={title} url={url} />

      </div>
      <div className="mb-8 ">
        {
          coverImage ? (
            category ? (
              <CoverImageBlogs
                title={title}
                coverImage={coverImage}
                blogDetails={blogDetails}
                category={category}
              />
            ) : (
              <CoverImage
                title={title}
                coverImage={coverImage}
                blogDetails={blogDetails}
              />
            )
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-full h-full"
            >
              <rect width="100%" height="100%" fill="#D1D5DB" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )
}

      </div>

    </div >
  )
}
