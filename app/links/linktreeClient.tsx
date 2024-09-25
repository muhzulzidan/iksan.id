// app/links/linktreeClient.tsx
"use client"

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CoverImageContentful from "@/components/cover-image-contentful";
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
import skena from "@/public/SKENA-Logo-icon.png"
import sapiperjaka from "@/app/images/sapiperjaka.webp"
import folder from "@/app/images/folder.png"
import Toolbox from "@/app/images/toolbox-300x300.png"
import Capcut from "@/app/images/Expert-capcut-square-50.jpg";
import Youtub from "@/app/images/youtub.jpg";
import Youtub2 from "@/app/images/yutub2.jpg";

import { ArrowRightCircleFill, Calendar, Facebook, Folder, Instagram, Linkedin, Telegram, Tiktok, Twitter, Whatsapp, Youtube } from 'react-bootstrap-icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Markdown } from '@/lib/markdown';
import ProductsClients from '@/components/products-linktree';

const LinktreeClient: React.FC<LinktreeClientProps> = ({ templates, ebooks, templateCategory, kelas, products  }) => {
   
    const comingSoonKelas = kelas.filter((k: Kelas) => k.comingSoon);

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

                <div className='flex flex-col gap-4 p-2'>

                    <Link href={"https://wasap.at/bBl7Jg"} className='shadow-costum border border-stone-200 rounded-2xl flex items-center gap-4 p-4'>
                        <Image
                            className='rounded-lg w-14 h-14'
                            src={fotoiksanpembicara}
                            alt="iksanbangsawan"
                            placeholder='blur'
                            />
                        <h3 className="font-bold text-lg">Endorsement  / Invitation</h3>
                    </Link>

                    <Link href={"https://wa.me/message/KAYLHTPTDZ6SD1"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4 '>
                        <Image
                            className='rounded-lg w-14 h-14'
                            src={konsul}
                            alt="iksanbangsawan"
                            placeholder='blur'
                        />
                        <div className='flex flex-col '>
                            <h3 className="font-bold text-lg">1 on 1 Consultation</h3>
                            <p className="font-mabry-light  text-xs">Diskusi dan konsultasi konten kreator, marketing, branding, karir, dan lainnya</p>
                        </div>

                    </Link>
                    <Suspense fallback={<Skeleton className="h-[20rem] w-full" />}>
                        <section className='bg-[#fdf9eb] w-full'>
                            {comingSoonKelas.length > 0 ? (
                                comingSoonKelas.map((k, index) => (
                                    <div key={index} className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-4 ">
                                        <Link href={"https://wa.me/message/KAYLHTPTDZ6SD1"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4 '>
                                            <CoverImageContentful
                                                title={k.title}
                                                url={k?.image.fields.file.url}
                                                className="rounded-lg w-14 h-14"
                                            />
                                            <div className='flex flex-col '>
                                                <h3 className="font-bold text-lg">Webinar Selanjutnya 🔥</h3>
                                                <p className="font-mabry-light  text-xs">{k.title}</p>
                                            </div>

                                        </Link>



                                    </div>

                                ))
                            ) : (
                                <div>No upcoming classes</div>
                            )}
                        </section>
                    </Suspense>

                    <Link href={"https://wa.me/message/KAYLHTPTDZ6SD1"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4 '>
                        <Image
                            className='rounded-lg w-14 h-14 p-2'
                            src={skena}
                            alt="skena"
                            placeholder='blur'
                        />
                        <div className='flex flex-col '>
                            <h3 className="font-bold text-lg">My Business: SKENA </h3>
                            <p className="font-mabry-light  text-xs">Creative Digital Agency:  Website development, social media management, augmented reality, GIF sticker, branding, and 2D-3D animation.</p>
                        </div>
                    </Link>
                    <Link href={"https://wa.me/message/KAYLHTPTDZ6SD1"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4'>
                        <Image
                            className='rounded-lg w-14 h-14 p-2'
                            src={Toolbox}
                            alt="toolbox"
                            placeholder='blur'
                        />
                        <div className='flex flex-col '>
                            <h3 className="font-bold text-lg">Rekomendasi Gadget </h3>
                            <p className="font-mabry-light  text-xs">Daftar peralatan produksi konten, gadget, aksesoris dan aplikasi produktivitas.</p>
                        </div>
                    </Link>
<div className='text-center py-12 flex flex-col gap-4'>
                        <h4 className="">📽️ My Youtube Video</h4>
                        <Link href={"https://youtu.be/1zF3CX4_Amc?feature=shared"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4 '>
                            <Image
                                className='rounded-lg w-14 h-14 '
                                src={Youtub}
                                alt="toolbox"
                                placeholder='blur'
                            />
                            <div className='flex flex-col '>
                                <h3 className="font-bold text-lg">10 Penghasilan konten kreator</h3>

                            </div>
                        </Link>
                        <Link href={"https://youtu.be/1zF3CX4_Amc?feature=shared"} className='flex items-center gap-4 shadow-costum border rounded-2xl p-4 '>
                            <Image
                                className='rounded-lg w-14 h-14 '
                                src={Youtub2}
                                alt="toolbox"
                                placeholder='blur'
                            />
                            <div className='flex flex-col '>
                                <h3 className="font-bold text-lg">10 Aplikasi produktifivitas</h3>

                            </div>
                        </Link>

</div>

                    <section className="bg-stone-100 w-full max-w-screen-lg mx-auto pt-0">
                        <h2 className='text-center text-xl font-bold py-1  mx-auto'>
                            Great Products for Personal & Business
                        </h2>
                        <p className='text-center text-sm mb-0'>
                            Event kelas, ebook, template, & video course
                        </p>
                        <div className="container px-0">
                            <ProductsClients templates={templates} templateCategory={templateCategory} products={products} />
                        </div>
                    </section>

                    <div className='shadow-costum border border-stone-200 rounded-lg flex flex-col   gap-4 py-4'>
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
                                href="https://chat.whatsapp.com/I6rEMFQUQcj9zDx8xg03pJ"
                                className="flex items-end gap-2 justify-start border-0 pb-2 border-b hover:underline"
                            >
                                <span className="text-2xl mr-2">
                                    <Whatsapp size={".8em"} />
                                </span>
                                <p>Whatsapp Group</p>
                            </a>
                            <a
                                href="https://www.instagram.com/j/AbY_9CXwrcAAP2ss/"
                                className="flex items-end gap-2 justify-start border-0 pb-2 border-b hover:underline"
                            >
                                <span className="text-2xl mr-2">
                                    <Whatsapp size={".8em"} />
                                </span>
                                <p>Info Lowongan Kerja</p>
                            </a>

                        </div>
                    </div>

                 

                    <Link href={"/"}>
                        <div className='shadow-costum border border-stone-200 rounded-lg flex  flex-col items-center p-3 '>
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
