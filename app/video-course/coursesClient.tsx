"use client"

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import Layout from '@/components/layout';
import CoverImageContentful from '@/components/cover-image-contentful'
import { usePathname } from 'next/navigation';



const CoursesClient: React.FC<CoursesClientProps> = ({ courses, pageTitles, metaDefault }) => {
    const currentSlug = usePathname();
    const filteredPageTitles = pageTitles.filter((page) => `/${page.slug}` === currentSlug);

    return (
        <Layout metaDefault={metaDefault} >
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">
                <div className='space-y-4 flex justify-center items-center flex-col'>
                  
                    <CoverImageContentful
                        title="video course iksan bangsawan indonesia"
                        url="https://images.ctfassets.net/1612ijcm5jnx/7oOayygIkuLcslnSJQYx2n/cbddf975c23fe74c03880242b10683e6/course.png"
                        // slug="video course iksan bangsawan indonesia" 
                        className="rounded-xl w-auto h-40 "
                    />

                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Iksan Bangsawan Courses'}</h1>
                    <p className="text-center text-xl max-w-md">{filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Explore our range of courses and find the perfect one for you.'}</p>
                </div>

                <div className="w-full  grid grid-cols-1  md:grid-cols-2 gap-24 mt-12">
                    {courses.map(course => (
                        <div key={course.title} className="flex flex-col p-6 bg-stone-50 border rounded-md gap-4 justify-between w-full">
                            <div className='w-full flex aspect-video'>
                                <Swiper
                                    loop={true}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    className=" aspect-video w-full">

                                    {course.images.map((imageUrl, index) => (
                                        <SwiperSlide key={index}>
                                            <CoverImageContentful title={imageUrl.title} url={imageUrl.fields.file.url} slug={imageUrl.slug} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='flex gap-4 bg-secondary2 px-4 py-2 rounded-lg w-fit text-stone-50 font-medium my-2 text-sm'>
                                {/* <p className="line-through text-gray-500">Rp{course.priceOld},000</p> */}
                                <p>Rp{course.price},000</p>
                            </div>
                            <h2 className="text-2xl font-semibold">{course.title}</h2>
                            {/* <p>{course.descriptionShort}</p> */}
                            <p className='line-clamp-3'>{course.description}</p>

                            {/* <p>Total Videos: {course.videosTotal}</p> */}
                            <button className="px-4 py-3 font-bold text-xl text-white bg-secondary2 rounded-lg hover:bg-purple-700">Learn More</button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CoursesClient;
