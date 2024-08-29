// app/template/templateclient.tsx

"use client"


import React from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PersonVideo, Laptop, Globe, CartPlusFill,  } from "react-bootstrap-icons"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CoverImageContentful from "@/components/cover-image-contentful";
import Layout from '@/components/layout';
import useStore from '@/store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function KelasClient({
    kelas,
    pageTitles,
    templateCategory,
    metaDefault,

}: KelasClientProps) {

    const { addToCart } = useStore();
    const pathname = usePathname()
    const currentSlug = pathname
    const router = useRouter();

    const filteredPageTitles = pageTitles.filter((page) => `/${page.slug}` === currentSlug);
    console.log(kelas, "kelas")

    function formatPrice(price: number) {
        const priceInRupiah = new Intl.NumberFormat('id-ID').format(price);
        if (Math.floor(price) === price) {
            return `Rp ${priceInRupiah}.000`;
        }
        return `Rp ${priceInRupiah}.00`;
    }

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">

                <div className='flex flex-col mt-12 gap-4 px-10'>
                    <h2 className='text-3xl'>Featured Class</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 ">
                        {kelas.map((template) => {
                            const startDate = template.startDate ? parseISO(template.startDate) : null;
                            const endDate = template.endDate ? parseISO(template.endDate) : null;
                            const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) : null;
                            const displayDays = numberOfDays !== null ? numberOfDays : "Coming Soon";
                            const templateUrl = template.slug || "#"; // Provide a fallback URL or handle this case accordingly

                            return (
                                <div key={template.title} className="flex flex-col rounded-md space-y-4 w-full max-sm: gap-0 group cursor-pointer ">
                                    <Link href={`/kelas/${templateUrl}`} className="relative group rounded-2xl aspect-video">
                                        <CoverImageContentful
                                            title={template.image.fields.title}
                                            url={`https:${template.image.fields.file.url}`}
                                            className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg w-full  object-cover aspect-video" // Added fixed height and object-cover
                                        />
                                        <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                    </Link>
                                    <div className="flex flex-col gap-4 w-full relative">
                                        <div className="flex flex-col w-full">
                                            <h2 className="text-lg font-semibold ">
                                                {template.title}
                                            </h2>
                                            <p className="line-clamp-2 text-sm text-stone-500">
                                                {template.description.content[0].content[0].value}
                                            </p>
                                        </div>
                                        <div className="flex gap-4">
                                            <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                {template.price1 === 0 ? 'Gratis' : `Rp ${template.price1}${template.price1.toString().includes('.') ? '00' : '.000'}`}
                                            </p>

                                            <Button className='bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit' onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price1, image: template.image, quantity: 1 })}>
                                                <CartPlusFill className="mr-2" />
                                                Add to Cart
                                            </Button>
                                        </div>
                                       
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <section className='flex flex-wrap justify-center px-4 container'>
                    {kelas.map((template) => {
                        const startDate = template.startDate ? parseISO(template.startDate) : null;
                        const endDate = template.endDate ? parseISO(template.endDate) : null;
                        const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) : null;
                        const displayDays = numberOfDays !== null ? numberOfDays : "Coming Soon";

                        return (
                            <div key={template.slug} className="bg-white shadow-md rounded-lg p-6 m-4 w-full flex flex-col md:flex-row gap-4 md:justify-center md:items-center">
                                <div className='w-full '>
                                    <CoverImageContentful
                                        title={template.image.fields.title}
                                        url={`https:${template.image.fields.file.url}`}
                                        className="rounded-xl w-full h-40 md:h-full object-cover"
                                    />
                                </div>
                                <div className='md:w-8/12 '>
                                    <h1 className="text-2xl font-bold mt-4">{template.title}</h1>
                                    <p className=" text-md mt-2 line-clamp-2">{template.description.content[0].content[0].value}</p>
                                    <p className="mt-2"><strong>Duration:</strong> {displayDays} days (from {template.startDate} to {template.endDate})</p>
                                    <p className=''><strong>Monthly Price:</strong> <span className="">{formatPrice(template.monthlyPrice)}</span></p>
                                    <p className='text-secondary2'><strong>Package Price:</strong> <span >{formatPrice(template.monthPackagePrice)}</span></p>
                                    <p><strong>Categories:</strong> {template.category.join(', ')}</p>
                                    <div className="mt-4 flex gap-4 justify-between w-auto">
                                        <Button className="break-words w-auto text-sm whitespace-normal py-8 bg-secondary2 font-extrabold text-start flex gap-2" onClick={() => router.push(`/checkout-kelas?kelas=${template.slug}`)}>
                                            <CartPlusFill className='w-8 h-auto' /> Choose Package
                                        </Button>
                                        <Button className="break-words w-auto text-sm whitespace-normal py-8 bg-secondary3 text-stone-950 font-extrabold text-start flex gap-2" onClick={() => addToCart({ id: `${template.slug}-3-month-package`, name: `${template.title} (3-Month Package)`, price: template.monthPackagePrice, image: template.image, quantity: 1 })}>
                                            <CartPlusFill className='w-8 h-auto' /> Add to Cart (3-Month Package)
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section> */}
            </div>
        </Layout>
    );
}


export default KelasClient

