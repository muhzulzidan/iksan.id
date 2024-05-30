// app/template/templateclient.tsx

"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PersonVideo, Laptop, Globe, CartPlusFill } from "react-bootstrap-icons"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CoverImageContentful from "../../components/cover-image-contentful";
import Layout from '../../components/layout';
import useStore from '@/store';
import { Button } from '@/components/ui/button';

function TemplatesClient({
    templates,
    pageTitles,
    templateCategory,
    templatePopular, // Correctly typed as an array of TemplatePopular
    metaDefault,

}: TemplatesClientProps) {

    const { addToCart } = useStore();
    const pathname = usePathname()
    const currentSlug = pathname

    const filteredPageTitles = pageTitles.filter((page) => `/${page.slug}` === currentSlug);

    const [selectedCategory, setSelectedCategory] = useState<string | TemplateCategory>('all');
    const [categorySlugs, setCategorySlugs] = useState<TemplateCategory[]>([]);


    function handleCategorySelect(categorySlug: string) {
        console.log(categorySlug, "categorySlug");
        if (categorySlug === "all") {
            setSelectedCategory("all");
            setCategorySlugs([]); // Correctly clears the array as expected
        } else {
            const category = templateCategory.find((cat) => cat.slug === categorySlug);
            if (category) {
                setSelectedCategory(category); // Now passing a single TemplateCategory object or 'all'
                setCategorySlugs([category]); // Ensures we are passing an array of TemplateCategory
            }
        }
    }

    // Adjust to get filtered templates based on the selected category
    const getFilteredTemplates = (): Template[] => {
        if (typeof selectedCategory !== "string" && selectedCategory) {
            return selectedCategory.templates;
        }
        return templates;
    };

    // Correctly handle templatePopular assuming it's an array
    const templatePop = templatePopular.length > 0 ? templatePopular[0].template : null;
    // console.log(templates, "templatePop");
    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">

                <div className='space-y-4 flex justify-center items-center flex-col'>
                    <CoverImageContentful
                        title="template iksan bangsawan indonesia image"
                        url="https://images.ctfassets.net/1612ijcm5jnx/1mRiqnE3nC3OLExN1nC2wW/273fec4b8f908520074fe020aa5dabe8/template_iksan_bangsawan_indonesia.png"
                        className="rounded-xl w-auto h-40 "
                    />
                    {/* <h1 className="text-4xl text-center font-bold w-full"></h1> */}
                    <h1 className="text-4xl text-center font-bold w-full">{filteredPageTitles.length > 0 ? filteredPageTitles[0].title : 'Templates'}</h1>
                    <p className="text-center text-xl max-w-md">{filteredPageTitles.length > 0 ? filteredPageTitles[0].description : 'Discover our Templates'}</p>
                </div>
                <section className='flex flex-col'>
                    <section className='flex gap-4 justify-center pt-12'>
                        <button
                            className={`flex p-4 justify-center items-center gap-2 rounded-lg ${selectedCategory === "all" ? 'bg-secondary2 text-stone-50' : 'bg-stone-200 text-stone-950'}`}
                            onClick={() => handleCategorySelect("all")}
                        >
                            <Globe />
                            <p>All</p>
                        </button>

                        {templateCategory.map((category) => (
                            <button
                                key={category.slug}
                                className={`flex p-4 justify-center items-center gap-2 rounded-lg ${(typeof selectedCategory !== 'string' && selectedCategory.slug === category.slug)
                                    ? 'bg-secondary2 text-stone-50'
                                    : 'bg-stone-200 text-stone-950'
                                    }`}
                                onClick={() => handleCategorySelect(category.slug)}
                            >
                                {category.slug === "creator" ? <PersonVideo /> : <Laptop />}
                                {category.slug}
                            </button>
                        ))}
                    </section>
                    <section>
                        <div className='flex flex-col pt-12 gap-6' >
                            {templates.filter(template => template.isFeatured).map((templatePop, index) => (
                                <Link href={`/template/${templatePop.slug}`} key={index} className={`flex flex-col md:flex-row  rounded-md space-y-4 w-full max-sm: gap-4 group/edit group/item  hover:bg-stone-50    cursor-pointer px-12 md:py-8 py-12  items-center`}>
                                    <div className='flex flex-col md:w-8/12 gap-2'>
                                        <div className='flex px-4 py-2 border border-solid border-secondary2 text-xs text-stone-950 w-fit rounded-full'>
                                            Most Popular
                                        </div>
                                        <div className='flex pt-4 pb-6 flex-col '>
                                            <h2 className="text-3xl font-semibold line-clamp-1">
                                                {templatePop.title}
                                            </h2>
                                            <p className="line-clamp-3 text-xl text-stone-500">
                                                {templatePop.description}
                                            </p>
                                        </div>
                                        <Link href={`/template/${templatePop.slug}`} className='px-4 py-2 bg-secondary2 text-stone-50 w-fit rounded-xl hover:bg-stone-100 hover:border hover:border-secondary2 '>
                                            Dapatkan Segera
                                        </Link>
                                    </div>
                                    <div className='md:w-7/12  flex items-center justify-center' >
                                        <CoverImageContentful
                                            title={templatePop.image.fields.title}
                                            url={templatePop.image.fields.file.url}
                                            slug={templatePop.image.slug}
                                            className={`transform transition-transform duration-300 
                                            group-hover/edit:-translate-y-2 
                                            rounded-lg `}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>


                    </section>
                    <div className='flex flex-col mt-12 gap-4 px-10'>
                        <h2 className='text-3xl'>Featured Templates</h2>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 ">
                            {getFilteredTemplates().map((template) => {
                                const templateUrl = template.slug || "#"; // Provide a fallback URL or handle this case accordingly
                                return (
                                    <div key={template.title} className="flex flex-col rounded-md space-y-4 w-full max-sm: gap-0 group cursor-pointer ">
                                        <Link href={`/template/${templateUrl}`}  className="relative group rounded-2xl">
                                            <CoverImageContentful
                                                title={template.fields ? template.fields.image.fields.title : template.image.fields.title}
                                                url={template.fields ? template.fields.image.fields.file.url : template.image.fields.file.url}
                                                slug={template.fields ? template.fields.image.slug : template.image.slug}
                                                className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg "
                                            />
                                            <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                        </Link>
                                        <div className="flex flex-col gap-4 w-full relative">
                                            <div className="flex flex-col w-full">
                                                <h2 className="text-lg font-semibold ">
                                                    {template.fields ? template.fields.title : template.title}
                                                </h2>
                                                <p className="line-clamp-2 text-sm text-stone-500">
                                                    {template.fields ? template.fields.description : template.description}
                                                </p>
                                            </div>
                                           
                                            <div className="flex gap-4">
                                                <p  className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                    {(template.fields ? template.fields.price : template.price) === 0 ? 'Gratis' : `Rp ${(template.fields ? template.fields.price : template.price)}${(template.fields ? template.fields.price : template.price).toString().includes('.') ? '00' : '.000'}`}
                                                </p>
                                                
                                                <Button className='bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit' onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price, image: template.image, quantity: 1 })}>
                                                    <CartPlusFill className="mr-2" />
                                                    Add to Cart</Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </section>
            </div>
        </Layout>
    );
}


export default TemplatesClient