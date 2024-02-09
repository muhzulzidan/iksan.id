// app/links/linktreeClient.tsx
"use client"

import React from 'react';


import Image from 'next/image';
import Link from 'next/link';
import CoverImageContentful from "../../components/cover-image-contentful";


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Iksan from "@/app/images/kak-iksan-prfl-1.png"
import fotoiksanpembicara from "@/app/images/foto-iksan-jadi-pembicara.png"
import videoCourse1 from "@/app/images/video-course/videocourse1.webp"
import videoCourse2 from "@/app/images/video-course/videocourse2.webp"
import videoCourse3 from "@/app/images/video-course/videocourse3.webp"
import videoCourse4 from "@/app/images/video-course/videocourse4.webp"
import konsul from "@/app/images/konsul.png"
import skena from "@/app/images/skena.png"
import sapiperjaka from "@/app/images/sapiperjaka.webp"
import folder from "@/app/images/folder.png"

import { ArrowRightCircleFill, Calendar, Facebook, Folder, Instagram, Linkedin, Telegram, Tiktok, Twitter, Whatsapp, Youtube } from 'react-bootstrap-icons';

const LinktreeClient: React.FC<LinktreeClientProps> = ({ allPosts: { edges }, templates, ebooks, templateCategory, templatePopular }) => {

    const videoCourse = [
        { title: 'Build Your Personal Branding on Socmed & Boost Your Career', url: "https://iksanbangsawan.mayar.link/course/build-your-personal-branding-on-socmed-boost-your-career", img: videoCourse1 },
        { title: 'Branding Masterclass Exclusive', url: "https://iksanbangsawan.mayar.link/course/build-your-personal-branding-on-socmed-boost-your-career", img: videoCourse2 },
        { title: 'Kelas Desain Adobe Illustrator: Mendesain Logo beragam Tema', url: "https://iksanbangsawan.mayar.link/course/build-your-personal-branding-on-socmed-boost-your-career", img: videoCourse3 },
        { title: 'Kelola Media Sosial, Kembangkan Bisnis Lebih Optimal', url: "https://iksanbangsawan.com/cloned/links/?add-to-cart=10201", img: videoCourse4 },
        // Add more links as needed
    ];
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: string) {
            return '<span class=" bg-secondary2 ' + className + '"> </span>';
        },
    };

    const blogs = edges.slice(0, 3); // Extract the first 5 items from the 'edges' array
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
        <>

            <div className="max-w-[530px]   mx-auto py-8 px-4 ">
                <div className=" relative pt-[35%] mb-4">
                    <Image src={Iksan} alt="iksanbangsawan" placeholder='blur' priority={true}
                        // width={400} height={400} 
                        sizes="w-full h-auto top-0 left-0 "
                        style={{ objectFit: "contain" }}
                        fill />
                </div>
                <div className=''>
                    <h1 className="text-xl text-center font-bold mb-2">Iksan Bangsawan</h1>
                    <p className='text-center text-xs'> 👨🏻‍💻 Creativepreneur&nbsp; ✏️ Creator&nbsp;</p>
                </div>
                {/* Social Media Section */}

                <div className="flex gap-4 py-8 text-sm justify-center items-center">


                    <a
                        href="http://instagram.com/iksanbangsawan"
                        className=" hover:text-blue-500"
                    >
                        <Instagram />
                    </a>
                    <a
                        href="http://tiktok.com/@iksanbangsawan"
                        className=" hover:text-blue-500"
                    >
                        <Tiktok />
                    </a>
                    <a
                        href="https://twitter.com/sapiperjaka"
                        className=" hover:text-blue-500"
                    >
                        <Twitter />
                    </a>
                    <a
                        href="https://www.youtube.com/iksanbangsawan"
                        className=" hover:text-blue-500"
                    >
                        <Youtube />
                    </a>
                    <a
                        href="http://facebook.com/iksanbgswn"
                        className=" hover:text-blue-500"
                    >
                        <Facebook />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/iksan-bangsawan-683a2b91/"
                        className=" hover:text-blue-500"
                    >
                        <Linkedin />
                    </a>

                </div>
                <div className='flex flex-col gap-8'>

                    <Link href={"https://wasap.at/bBl7Jg"} className='shadow-costum border border-gray-200 rounded-lg flex  items-center gap-4 '>
                        <div className=" relative p-[15%] flex w-1/12 rounded-md">
                            <Image
                                className='rounded-l-lg'
                                src={fotoiksanpembicara}
                                alt="iksanbangsawan"
                                placeholder='blur'
                                priority={true}
                                // width={400} height={400} 
                                sizes="w-full h-auto top-0 left-0 "
                                style={{ objectFit: "contain" }}
                                fill />
                        </div>
                        <h3 className="font-bold text-lg">Endorsement  / Invitation</h3>
                    </Link>
                    <div className='flex flex-col shadow-costum border border-gray-200 rounded-lg '>
                        <Link href={"https://wa.me/message/KAYLHTPTDZ6SD1"} className='flex items-center gap-4 '>
                            <div className=" relative p-[15%] flex w-1/12 rounded-md">
                                <Image
                                    className='rounded-tl-lg'
                                    src={konsul}
                                    alt="iksanbangsawan"
                                    placeholder='blur'
                                    priority={true}
                                    // width={400} height={400} 
                                    sizes="w-full h-auto top-0 left-0 "
                                    style={{ objectFit: "contain" }}
                                    fill />
                            </div>
                            <div className='flex flex-col '>
                                <h3 className="font-bold text-lg">1 on 1 Consultation</h3>
                                <p className="font-mabry-light  text-xs">Diskusi dan konsultasi konten kreator, marketing, branding, karir, dan lainnya</p>
                            </div>

                        </Link>
                        <div className='flex bg-stone-400 text-stone-50 justify-end text-xs p-2 px-4 rounded-b-lg'>
                            10+ Peserta
                        </div>
                    </div>

                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col items-start gap-4 p-4'>

                        <Image
                            className='rounded-lg'
                            src={skena}
                            alt="iksanbangsawan"
                            placeholder='blur'
                        />

                        <h3>SKENA – Creative Digital Agency</h3>
                        <p>Website development, social media management, augmented reality, GIF sticker,  branding, and 2D-3D animation.</p>
                        <div className='flex gap-2 text-sm'>
                            <a href='https://skena.co.id/' className='border border-secondary2 p-2 rounded-md'>Homepage ↗</a>
                            <a href='https://skena.co.id/works/' className='border border-secondary2 p-2 rounded-md'>Projects ↗</a>
                            <a href='https://skena.co.id/contact/' className='bg-secondary2 text-stone-50 p-2 rounded-md'>Contact</a>
                        </div>
                    </div>
                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col items-start gap-4 p-4'>
                        <div className='flex w-full justify-between'>
                            <h3>Templates</h3>
                            <p className='flex gap-2 text-sm items-center'>Lainnya <ArrowRightCircleFill /></p>
                        </div>
                        <div className='w-full'>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {templates.map((template, index) => (
                                        <CarouselItem key={index} >
                                            <a
                                                href={template.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-xl flex  w-full h-[80%]"
                                            >
                                                {/* <img src={template.url} alt={template.title} className='rounded-lg object-cover w-full' /> */}
                                                <CoverImageContentful
                                                    title={template.fields ? template.fields.image.fields.title : template.image.fields.title}
                                                    url={template.fields ? template.fields.image.fields.file.url : template.image.fields.file.url}
                                                    slug={template.fields ? template.fields.image.slug : template.image.slug}
                                                    className="rounded-lg object-cover w-full"
                                                />
                                            </a>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col items-start gap-4 p-4'>
                        <div className='w-full flex justify-between'>
                            <h3>Ebook</h3>
                            <p className='flex gap-2 text-sm items-center'>Lainnya <ArrowRightCircleFill /></p>
                        </div>
                        <div className='flex w-full'>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                {ebooks.map((ebook, index) => (
                                    <CarouselItem key={index} >
                                        <a
                                            href={ebook.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-xl flex  w-full h-[80%]"
                                        >

                                            <CoverImageContentful
                                                title={ebook.image.fields.title}
                                                url={ebook.image.fields.file.url}
                                                slug={ebook.image.slug}
                                                className='aspect-video object-cover'
                                            />
                                        </a>
                                    </CarouselItem>
                                ))}
                                    </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col items-start gap-4 p-4'>
                        <div className='w-full flex justify-between'>
                            <h3>Video Course</h3>
                            <p className='flex gap-2 text-sm items-center'>Lainnya <ArrowRightCircleFill /></p>
                        </div>

                        <div className='flex w-full px-4'>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent>

                            
                          
                                {videoCourse.map((video, index) => (
                                    <CarouselItem key={index} >
                                        <a
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-xl flex  flex-col  w-full h-[80%]"
                                        >
                                            <Image
                                                className='rounded-t-lg'
                                                src={video.img}
                                                alt="iksanbangsawan"
                                                placeholder='blur'
                                            />
                                            <h4 className='py-4 text-center px-2 text-sm font-mabry-bold bg-purple-50 rounded-b-lg '>
                                                {video.title}
                                            </h4>
                                        </a>
                                    </CarouselItem>
                                ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>


                    </div>
                    <Link href={"https://template.co.id/"} className='shadow-costum border border-gray-200 rounded-lg flex  items-center gap-4 '>
                        <div className=" relative p-[15%] flex w-1/12 rounded-md">
                            <Image
                                className='rounded-l-lg'
                                src={folder}
                                alt="iksanbangsawan"
                                placeholder='blur'
                                priority={true}
                                // width={400} height={400} 
                                sizes="w-full h-auto top-0 left-0 "
                                style={{ objectFit: "contain" }}
                                fill />
                        </div>
                        <div className='flex flex-col'>
                            <h3 className="font-bold text-lg">Template.co.id</h3>
                            <p className='text-xs w-10/12'>Produk template, ebook dan video course</p>
                        </div>
                    </Link>
                    <Link href={"/business/sapi-perjaka"} className='shadow-costum border border-gray-200 rounded-lg flex  items-center gap-4 '>
                        <div className=" relative p-[15%] flex w-1/12 rounded-md">
                            <Image
                                className='rounded-l-lg'
                                src={sapiperjaka}
                                alt="iksanbangsawan"
                                placeholder='blur'
                                priority={true}
                                // width={400} height={400} 
                                sizes="w-full h-auto top-0 left-0 "
                                style={{ objectFit: "contain" }}
                                fill />
                        </div>
                        <div className='flex flex-col'>
                            <h3 className="font-bold text-lg">Sapiperjaka</h3>
                        </div>
                    </Link>
                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col py-6 p-4 items-center gap-6 '>
                        <h4 className='text-start font-mabry-bold'>
                            Featured Blog
                        </h4>
                        <div className='flex flex-col gap-4'>
                            {blogs.map((blog, index) => (
                                <Link href={`/blogs/${blog.node.slug}`} key={index} className='flex'>

                                    <img src={blog.node.featuredImage.node.sourceUrl} alt={blog.node.title} className='flex rounded-lg w-3/12 aspect-[4/3] object-cover mr-4' />

                                    <div className='flex flex-col gap-1 justify-center'>
                                        <h4 className='text-xs font-mabry-bold'>
                                            {blog.node.title}
                                        </h4>
                                        <div className='flex  gap-4 text-xs text-stone-700'>
                                            <p className='flex gap-2 items-center'> <Calendar /> {formatDate(blog.node.date)}</p>
                                            <p className='flex gap-2 items-center'> <Folder /> {blog.node.categories.edges[0].node.name}</p>
                                        </div>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='shadow-costum border border-gray-200 rounded-lg flex flex-col   gap-4 py-4'>
                        <h4 className=' font-mabry-bold text-xl text-center px-8'>
                            Join Community
                        </h4>
                        <div className="grid grid-cols-1  gap-3 mb-4 text-sm w-full px-8 justify-start">
                            <a href="https://ig.me/j/AbbPHZUPmG7GezM3/"
                                className="flex items-end gap-2 justify-start border-0 pb-2 w-full border-b hover:underline"
                            >
                                <span className="text-2xl mr-2">
                                    <Instagram size={".8em"} />
                                </span>
                                <p>Grup Proses Kreatif</p>
                            </a>
                            <a
                                href="https://t.me/greatupgradechannel"
                                className="flex items-end gap-2 justify-start border-0 pb-2 w-full border-b hover:underline"
                            >
                                <span className="text-2xl mr-2">
                                    <Telegram size={".8em"} />
                                </span>
                                <p>Telegram Channel</p>

                            </a>
                            <a
                                href="Info Lowongan Kerja"
                                className="flex items-end gap-2 justify-start border-0 pb-2 border-b hover:underline"
                            >
                                <span className="text-2xl mr-2">
                                    <Whatsapp size={".8em"} />
                                </span>
                                <p>Whatsapp Group</p>


                            </a>

                        </div>
                    </div>

                    <div className=" shadow-costum border border-gray-200 rounded-lg w-full py-6  bg-secondary2 text-stone-50  gap-4 " >
                        <Link href="/gadget">
                            <Image width={200} height={200} className="rounded-xl h-52 mx-auto" src="https://images.ctfassets.net/1612ijcm5jnx/4gMJfdpSpO0L3Dc5py9x0P/8d9aab7c026ee223c01a2401c5112ea7/toolbox_iksan_bangasawan_indonesia.png" alt="product image" />
                        </Link>
                        <div className="px-5 py-6 gap-1 flex flex-col items-center">
                            <h4 className='font-mabry-bold text-center text-xl '>gadget</h4>
                            <p className='text-center text-sm w-10/12'>Daftar rekomendasi peralatan, gadget, aksesoris dan aplikasi.</p>
                        </div>
                    </div>

                    <Link href={"/"}>
                        <div className='shadow-costum border border-gray-200 rounded-lg flex  flex-col items-center p-3 '>
                            <h4 className='text-center font-mabry-bold mb-0'>
                                iksanbangsawan.com
                            </h4>
                            <p>See my full personal website</p>
                        </div>
                    </Link>
                </div>


            </div>
        </>
    );
};

export default LinktreeClient;
