// app/template/templateclient.tsx

"use client"


import React from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PersonVideo, Laptop, Globe, CartPlusFill,  } from "react-bootstrap-icons"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CoverImageContentful from "../../components/cover-image-contentful";
import Layout from '../../components/layout';
import useStore from '@/store';
import { Button } from '@/components/ui/button';


function KelasClient({
    kelas,
    pageTitles,
    templateCategory,
    metaDefault,

}: KelasClientProps) {

    const { addToCart } = useStore();
    const pathname = usePathname()
    const currentSlug = pathname

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

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <CoverImageContentful
                        title="template iksan bangsawan indonesia image"
                        url="https://images.ctfassets.net/1612ijcm5jnx/1mRiqnE3nC3OLExN1nC2wW/273fec4b8f908520074fe020aa5dabe8/template_iksan_bangsawan_indonesia.png"
                        className="rounded-xl w-auto h-40 "
                    />
                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Templates'}</h1>
                    <p className="text-center text-xl max-w-md">{filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Discover our Templates'}</p>
                </div>
                <section className='flex flex-wrap justify-center px-4 container'>
                    {kelas.map((template) => {
                        const startDate = parseISO(template.startDate);
                        const endDate = parseISO(template.endDate);
                        const numberOfDays = differenceInDays(endDate, startDate);

                        return (
                            <div key={template.slug} className="bg-white shadow-md rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/4 ">
                                <CoverImageContentful
                                    title={template.image.fields.title}
                                    url={`https:${template.image.fields.file.url}`}
                                    className="rounded-xl w-full h-40 object-cover"
                                />
                                <h1 className="text-2xl font-bold mt-4">{template.title}</h1>
                                <p className=" text-md mt-2 line-clamp-2">{template.description.content[0].content[0].value}</p>
                                <p className="mt-2"><strong>Duration:</strong> {numberOfDays} days (from {template.startDate} to {template.endDate})</p>

                                <p className=''><strong>Monthly Price:</strong> <span className="">{formatPrice(template.monthlyPrice)}</span></p>
                                <p className='text-secondary2'><strong>Package Price:</strong> <span >{formatPrice(template.monthPackagePrice)}</span></p>

                                <p><strong>Categories:</strong> {template.category.join(', ')}</p>

                                <div className="mt-4 flex gap-4 justify-between w-auto">
                                    <Button className="break-words w-auto text-sm whitespace-normal py-8 bg-secondary2 font-extrabold text-start flex gap-2" onClick={() => addToCart({ id: `${template.slug}-monthly`, name: `${template.title} (Monthly)`, price: template.monthlyPrice, image: template.image, quantity: 1 })}>
                                        <CartPlusFill className='w-8 h-auto' />   Add to Cart (Monthly)
                                    </Button>
                                    <Button className="break-words w-auto text-sm whitespace-normal py-8 bg-secondary3 text-stone-950 font-extrabold text-start flex gap-2" onClick={() => addToCart({ id: `${template.slug}-3-month-package`, name: `${template.title} (3-Month Package)`, price: template.monthPackagePrice, image: template.image, quantity: 1 })}>
                                        <CartPlusFill className='w-8 h-auto' /> Add to Cart (3-Month Package)
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </Layout>
    );
}


export default KelasClient

