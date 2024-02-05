import Iframe from 'react-iframe'
import {  ArrowRightCircleFill, Telegram, Folder, Calendar } from 'react-bootstrap-icons';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
export const LatestContentSection = ({ title, content }) => {
    return (
        <section className="justify-center items-center px-4">
            <div className="flex justify-between items-center mb-12 ">
                <h2 className="text-2xl font-extrabold tracking-tight leading-tight">{title}</h2>
                <Link href={"#"} className="bg-stone-200  px-4 py-2  font-mabryRegular tracking-tight leading-tight rounded-md text-xs md:text-base flex items-center gap-2 hover:bg-secondary2 hover:text-stone-50">
                    More
                    <ArrowRightCircleFill />
                </Link>
              

            </div>
            <div className="flex shadow-xl aspect-w-16 aspect-h-9">
                <Iframe
                    width="100%"
                    loading="lazy"
                    className="rounded-xl"
                    src={content.url}
                    title={content.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    height={"300"} 
                    url={content.url}               
                    ></Iframe>
            </div>
        </section>
    );
};

const HomePage = () => {
    const latestVideo = {
        id: 1,
        title: 'Latest Video',
        url: 'https://www.youtube.com/embed/D9GcnhbGxp4',
    };

    const latestPodcast = {
        id: 1,
        title: 'Latest Podcast',
        url: 'https://www.youtube.com/embed/D9GcnhbGxp4',
    };

    return (
        <div className="flex flex-col md:flex-row px-4  md:px-0 bg-stone-100 pb-24 text-stone-950">
            <LatestContentSection title="YouTube " content={latestVideo} />
            <LatestContentSection title="Latest Podcast" content={latestPodcast} />
        </div>
    );
};

export default HomePage;
