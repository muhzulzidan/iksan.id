import { CalendarDateFill, PersonFill } from "react-bootstrap-icons"
import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import CoverImageBlogs from './cover-image-blogs'
import Link from 'next/link'
type CoverImageType = string | { node: { sourceUrl: string } };

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category
}: {
  title: string,
  coverImage: CoverImageType,
  date: string,
  excerpt: string,
  author: string,
  slug: string,
  category: string
}) {
//  const category = coverImage?.node.categories.edges[0]?.node.name;
  // console.log(category, "post preview")
  return (
    <div >
      <div className="mb-5">
        {
          coverImage ? (
            category ? (
              <CoverImageBlogs title={title} coverImage={coverImage as { node: { sourceUrl: string } }} slug={slug} category={category} />
            ) : (
              <CoverImage title={title} coverImage={coverImage as { node: { sourceUrl: string } }} slug={slug} />
            )
          ) : (
              
              <div className="placeholder-svg rounded-lg">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100%" height="100%" fill="#d6d3d1" />
                  <path
                    fill="#44403c"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                  />
                </svg>
              </div>
          )
        }
      </div>
      <h3 className="text-2xl mb-4 font-mabryBold leading-tight">
        <Link
          href={`/blogs/${slug}`}
          className="hover:underline"
          dangerouslySetInnerHTML={{ __html: title }}
        >
          
        </Link>
      </h3>
      <div className="text-sm  mb-2 flex gap-5 text-stone-500 items-center">
        <div className="flex gap-2 ">
          <CalendarDateFill className="text-stone-400 mt-[.1em]" />
          <Date dateString={date} />
        </div>
        <div className="flex gap-1 ">
          {/* <PersonFill className="text-stone-600" /> */}
          {/* <Avatar author={author} /> */}
        </div>
      </div>
      {/* <div
        className="text-sm leading-relaxed mb-4 line-clamp-3 text-stone-700"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      /> */}

    </div>
  )
}
