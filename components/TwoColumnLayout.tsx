
"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircleFill, Folder, Calendar } from 'react-bootstrap-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation'

import { LatestContentSection } from "./LatestContentSection"

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ data, blogs, insights }) => {
    const router = useRouter()
    const latestVideo = {
        id: 1,
        title: 'Latest Video',
        url: 'https://www.youtube.com/embed/D9GcnhbGxp4',
    };

    const formatDate = (inputDate: string | number | Date) => {
        const months = [
            'jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ];

        const date = new Date(inputDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };
    return (
        <div className="flex flex-col md:flex-row  pt-24 bg-stone-100 text-stone-950 py-12">
            <div className="lg:w-1/2   p-4">
                <div className="flex justify-between">
                    <div className="flex flex-col mb-12 ">
                        <h2 className="text-2xl md:text-3xl font-bold font-mabryBold mb-4 ">Blog</h2>
                        <hr className="border border-b-2 border-secondary1 w-24" />
                    </div>
                    <Link href={'/blogs/'} className="appearance-none border border-solid rounded-lg h-fit px-4 py-2  bg-stone-200 text-xs md:text-base flex items-center gap-2 mt-4 md:mt-0 hover:bg-secondary2 hover:text-stone-50" >
                        View More <ArrowRightCircleFill />
                    </Link>
                </div>

                <ul className="font-mabryRegular">
                    {blogs.map((blog, index) => (
                        <li key={index} className="mb-6">
                            <div className="flex">

                                <Link href={`/blogs/${blog.node.slug}`} className='hover:text-secondary2 flex gap-4 w-full h-[4.2rem]' >

                                    {/* Updated the Image code here */}
                                    <div className="relative w-[180px] h-full aspect-video  rounded-lg overflow-hidden flex">
                                        <Image
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            className="flex aspect-[16/9]"
                                            src={blog.node.featuredImage.node.sourceUrl}
                                            alt={blog.node.title}
                                        />
                                    </div>

                                    <div className='flex flex-col text-sm w-full'>

                                        <h3 className=" ">{blog.node.title}</h3>
                                        <div className="flex gap-2 pt-2 text-stone-600">
                                            <p className='flex gap-2 items-center'> <Calendar /> {formatDate(blog.node.date)}</p>
                                            <p className='flex gap-2 items-center'> <Folder /> {blog.node.categories.edges[0].node.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <hr className="w-full border border-b border-stone-200 mt-4" />
                        </li>
                    ))}
                </ul>
              
            </div>
            <div className="lg:w-1/2 p-4 lg:pl-12">
                <LatestContentSection title="YouTube" content={latestVideo} />
            </div>
        </div>
    );
};

export default TwoColumnLayout;
