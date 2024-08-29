// app/template/templateclient.tsx

"use client"

import Image from 'next/image';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import { PersonVideo, Laptop, Globe, CartPlusFill, List, FileEarmarkText, Book, Layers, BookHalf } from "react-bootstrap-icons"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CoverImageContentful from "@/components/cover-image-contentful";
import Layout from '@/components/layout';
import useStore from '@/store';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { differenceInDays, parseISO } from 'date-fns';

interface Product {
    templates: any[];
    courses: any[];
    kelas: any[];
    ebooks: any[];
}
interface ProductsClientsProps {
    templates: Template[];
    templateCategory: TemplateCategory[];
    products: any;
}

function ProductsClients({
    products,
    templateCategory
}: ProductsClientsProps) {

    const [currentCategory, setCurrentCategory] = useState('all'); // Default category
    const { addToCart } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    // Destructure the products prop to get the categories
    const { courses, ebooks, kelas, templates } = products;
    const productsCategories = [
        {
            title: "All",
            slug: "all",
            icon: <List /> // Icon for "All"
        },
        {
            title: "Templates",
            slug: "templates",
            icon: <FileEarmarkText /> // Icon for "Templates"
        },
        {
            title: "Courses",
            slug: "courses",
            icon: <BookHalf /> // Icon for "Courses"
        },
        {
            title: "Kelas",
            slug: "kelas",
            icon: <Layers /> // Icon for "Kelas"
        },
        {
            title: "Ebooks",
            slug: "ebooks",
            icon: <Book /> // Icon for "Ebooks"
        },
    ];
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        console.log(category, "category")
    };
    useEffect(() => {
        setSelectedProducts(Array.isArray(products) ? products : []);
    }, [products]);

    const combinedItems = [
        ...templates.map((item: any) => ({ ...item, type: 'template' })),
        ...courses.map((item: any) => ({ ...item, type: 'course' })),
        ...ebooks.map((item: any) => ({ ...item, type: 'ebooks' })),
        ...kelas.map((item: any) => ({ ...item, type: 'kelas' })),
    ];

    const getItemsByCategory = (category: string): any[] => {
        switch (category) {
            case 'courses':
                return courses;
            case 'ebooks':
                return ebooks;
            case 'kelas':
                return kelas;
            case 'templates':
                return templates;
            case 'all':
            default:
                return [
                    ...templates.map((item: any) => ({ ...item, type: 'template' })),
                    ...courses.map((item: any) => ({ ...item, type: 'course' })),
                    ...ebooks.map((item: any) => ({ ...item, type: 'ebooks' })),
                    ...kelas.map((item: any) => ({ ...item, type: 'kelas' })),
                ];
        }
    };

    const getFilteredProducts = (): any[] => {
        return getItemsByCategory(selectedCategory);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentProducts = Array.isArray(filteredProducts)
        ? filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 pt-0 bg-stone-100 text-stone-950 ">
                <section className='flex flex-col'>
                    <section className='flex gap-4 justify-center pt-12'>
                        {productsCategories.map((category) => (
                            <button
                                key={category.slug}
                                className={`flex p-4 justify-center items-center gap-2 rounded-lg ${selectedCategory === category.slug ? 'bg-secondary2 text-stone-50' : 'bg-stone-200 text-stone-950'}`}
                                onClick={() => handleCategorySelect(category.slug)}
                            >
                                {category.icon}
                                {category.slug}
                            </button>
                        ))}
                    </section>

                    <div className='flex flex-col mt-12 gap-4 px-10'>
                        {selectedCategory === 'all' && (
                            <>
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {currentProducts.map((item) => {
                                        if (item.type === 'template') {
                                            const templateUrl = item.slug || "#"; // Provide a fallback URL or handle this case accordingly
                                            return (
                                                <div key={item.title} className="flex flex-col rounded-md space-y-4 w-full max-sm: gap-0 group cursor-pointer ">
                                                    <Link href={`/template/${templateUrl}`} className="relative group rounded-2xl">
                                                        <CoverImageContentful
                                                            title={item.fields ? item.fields.image.fields.title : item.image.fields.title}
                                                            url={item.fields ? item.fields.image.fields.file.url : item.image.fields.file.url}
                                                            slug={item.fields ? item.fields.image.slug : item.image.slug}
                                                            className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg "
                                                        />
                                                        <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                                    </Link>
                                                    <div className="flex flex-col gap-4 w-full relative">
                                                        <div className="flex flex-col w-full">
                                                            <h2 className="text-lg font-semibold ">
                                                                {item.fields ? item.fields.title : item.title}
                                                            </h2>
                                                            <p className="line-clamp-2 text-sm text-stone-500">
                                                                {item.fields ? item.fields.description : item.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex gap-4">
                                                            <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                                {(item.fields ? item.fields.price : item.price) === 0 ? 'Gratis' : `Rp ${(item.fields ? item.fields.price : item.price)}${(item.fields ? item.fields.price : item.price).toString().includes('.') ? '00' : '.000'}`}
                                                            </p>

                                                            <Button className='bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit' onClick={() => addToCart({ id: item.slug, name: item.title, price: item.price, image: item.image, quantity: 1 })}>
                                                                <CartPlusFill className="mr-2" />
                                                                Add to Cart</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else if (item.type === 'course') {
                                            return (
                                                <div key={item.title} className="flex flex-col rounded-md space-y-4 w-full max-sm:gap-0 group cursor-pointer">
                                                    <div className="relative group rounded-2xl aspect-video">
                                                        <Swiper
                                                            loop={true}
                                                            spaceBetween={0}
                                                            slidesPerView={1}
                                                            className="aspect-video w-full transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg ">
                                                            {item.images.map((imageUrl: { title: string; fields: { file: { url: string; }; }; slug: string | undefined; }, index: Key | null | undefined) => (
                                                                <SwiperSlide key={index}>
                                                                    <CoverImageContentful title={imageUrl.title} url={imageUrl.fields.file.url} slug={imageUrl.slug} />
                                                                </SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                        <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                                    </div>
                                                    <div className="flex flex-col gap-4 w-full relative">
                                                        <div className="flex flex-col w-full">
                                                            <h2 className="text-lg font-semibold">{item.title}</h2>
                                                            <p className="line-clamp-2 text-sm text-stone-500">{item.description}</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                                Rp{item.price},000
                                                            </p>
                                                            <button className="bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit">
                                                                Learn More
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else if (item.type === 'ebooks') {
                                            return (
                                                <div key={item.slug} className="flex flex-col rounded-md space-y-4 w-full max-sm:gap-0 group cursor-pointer">
                                                    <div className="relative group rounded-2xl">
                                                        <CoverImageContentful
                                                            title={item.fields ? item.fields.image.fields.title : item.image.fields.title}
                                                            url={item.fields ? item.fields.image.fields.file.url : item.image.fields.file.url}
                                                            slug={item.fields ? item.fields.image.slug : item.image.slug}
                                                            className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg "
                                                        />
                                                       
                                                        <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                                    </div>
                                                    <div className="flex flex-col gap-4 w-full relative">
                                                        <div className="flex flex-col w-full">
                                                            <h2 className="text-lg font-semibold">{item.title}</h2>
                                                            <p className="line-clamp-2 text-sm text-stone-500">{item.description}</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                                Rp{item.price},000
                                                            </p>
                                                            <a href={item.url} className="bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit">
                                                                Beli sekarang
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else if (item.type === 'ebooks') {
                                            const startDate = item.startDate ? parseISO(item.startDate) : null;
                                            const endDate = item.endDate ? parseISO(item.endDate) : null;
                                            const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) : null;
                                            const displayDays = numberOfDays !== null ? numberOfDays : "Coming Soon";
                                            const templateUrl = item.slug || "#"; // Provide a fallback URL or handle this case accordingly

                                            return (
                                                <div key={item.title} className="flex flex-col rounded-md space-y-4 w-full max-sm: gap-0 group cursor-pointer ">
                                                    <Link href={`/kelas/${templateUrl}`} className="relative group rounded-2xl aspect-video">
                                                        <CoverImageContentful
                                                            title={item.image.fields.title}
                                                            url={`https:${item.image.fields.file.url}`}
                                                            className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg w-full  object-cover aspect-video" // Added fixed height and object-cover
                                                        />
                                                        <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                                    </Link>
                                                    <div className="flex flex-col gap-4 w-full relative">
                                                        <div className="flex flex-col w-full">
                                                            <h2 className="text-lg font-semibold ">
                                                                {item.title}
                                                            </h2>
                                                            <p className="line-clamp-2 text-sm text-stone-500">
                                                                {item.description.content[0].content[0].value}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                                {item.price1 === 0 ? 'Gratis' : `Rp ${item.price1}${item.price1.toString().includes('.') ? '00' : '.000'}`}
                                                            </p>

                                                            <Button className='bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit' onClick={() => addToCart({ id: item.slug, name: item.title, price: item.price1, image: item.image, quantity: 1 })}>
                                                                <CartPlusFill className="mr-2" />
                                                                Add to Cart
                                                            </Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </>
                        )}
                        {selectedCategory === 'templates' && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 ">
                                {currentProducts.map((template: any) => {
                                    const templateUrl = template.slug || "#"; // Provide a fallback URL or handle this case accordingly
                                    return (
                                        <div key={template.title} className="flex flex-col rounded-md space-y-4 w-full max-sm: gap-0 group cursor-pointer ">
                                            <Link href={`/template/${templateUrl}`} className="relative group rounded-2xl">
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
                                                    <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
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
                        )}
                        {selectedCategory === 'courses' && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                                {courses.map((course: any) => (
                                    <div key={course.title} className="flex flex-col rounded-md space-y-4 w-full max-sm:gap-0 group cursor-pointer">
                                        <div className="relative group rounded-2xl aspect-video">
                                            <Swiper
                                                loop={true}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                className="aspect-video w-full transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg ">
                                                {course.images.map((imageUrl: { title: string; fields: { file: { url: string; }; }; slug: string | undefined; }, index: Key | null | undefined) => (
                                                    <SwiperSlide key={index}>
                                                        <CoverImageContentful title={imageUrl.title} url={imageUrl.fields.file.url} slug={imageUrl.slug} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                        </div>
                                        <div className="flex flex-col gap-4 w-full relative">
                                            <div className="flex flex-col w-full">
                                                <h2 className="text-lg font-semibold">{course.title}</h2>
                                                <p className="line-clamp-2 text-sm text-stone-500">{course.description}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                    Rp{course.price},000
                                                </p>
                                                <button className="bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit">
                                                    Learn More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedCategory === 'ebooks' && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-24 mt-12">
                                {ebooks.map((ebook: any) => (
                                    <div key={ebook.slug} className="flex flex-col rounded-md space-y-4 w-full max-sm:gap-0 group cursor-pointer">
                                        <div className="relative group rounded-2xl">
                                            <CoverImageContentful
                                                title={ebook.image.fields.title}
                                                url={ebook.image.fields.file.url}
                                                slug={ebook.image.slug}
                                                className="transform transition-transform duration-300 group-hover:-translate-y-2 rounded-lg aspect-video object-cover"
                                            />
                                            <div className="absolute inset-0 -z-10 bg-stone-200 bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-xl"></div>
                                        </div>
                                        <div className="flex flex-col gap-4 w-full relative">
                                            <div className="flex flex-col w-full">
                                                <h2 className="text-lg font-semibold">{ebook.title}</h2>
                                                <p className="line-clamp-2 text-sm text-stone-500">{ebook.description}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="bg-secondary2 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit hover:text-stone-50 hover:bg-purple-800">
                                                    Rp{ebook.price},000
                                                </p>
                                                <a href={ebook.url} className="bg-primary1 hover:bg-pink-800 text-stone-50 rounded-lg py-2 px-3 text-xs h-fit">
                                                    Beli sekarang
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                      
                        {selectedCategory === 'kelas' && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                                {kelas.map((template: any) => {
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
                        )}
                      
                      <div className='py-12'>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={currentPage === 1 ? undefined : handlePreviousPage}
                                            className={currentPage === 1 ? 'disabled-class' : ''}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={currentPage === index + 1}
                                                onClick={() => handlePageClick(index + 1)}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={currentPage === totalPages ? undefined : handleNextPage}
                                            className={currentPage === totalPages ? 'disabled-class' : ''}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                      </div>
                    </div>
                </section>
            </div>
        </>
    );
}


export default ProductsClients