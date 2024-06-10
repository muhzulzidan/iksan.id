"use client"

import { useState, useRef, useEffect } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation'
// Import the useStore hook from your store file
import useStore from '@/store';

import axios from 'axios';
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import CoverImageContentful from '@/components/cover-image-contentful';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CartPlusFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import ContentCreatorMentoring from "@/public/content-creator-mentoring.jpeg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { setCookie } from 'nookies';
import Image from 'next/image';
import { ChevronUp, ChevronLeft, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { SignIn,  } from "@clerk/nextjs";
const ContentImages = [1, 2, 3].map((num) => require(`@/public/content/${num}.jpeg`));
const MentoringClient = () => {

    const router = useRouter()
    const pathname = usePathname()

    const { isSignedIn, user, isLoaded } = useUser();
    const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Inside your component
    const addToCart = useStore(state => state.addToCart);

    const myRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement>): void => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);




    type CartItem = {
        id: string;
        name: string;
        // other properties...
    };

    // console.log(template, "template")
    const today = new Date();
    const earlyBirdEndDate = new Date(today.getFullYear(), 5, 12); // June 12
    const normalPriceStartDate = new Date(today.getFullYear(), 5, 13); // June 13

    const price = today <= earlyBirdEndDate ? 379 : today >= normalPriceStartDate ? 600 : 0;

    const handleCreateInvoice = async () => {
        const isEarlyBird = today <= earlyBirdEndDate;
        addToCart({
            id: isEarlyBird ? 'early-bird-content-creator-mentoring' : 'content-creator-mentoring',
            name: isEarlyBird ? 'Early Bird Content Creator Mentoring' : 'Content Creator Mentoring',
            price: price,
            image: "/content-creator-mentoring.jpeg",
            quantity: 1
        })
        router.push('/checkout');
    }
    return (
        <Layout>
            <div className="flex flex-col prose  items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 px-4 ">
                {
                    isVisible &&
                    <div onClick={scrollToTop} className="fixed bottom-2 right-2 cursor-pointer">
                        <Button className='bg-secondary2 text-stone-50 w-12 p-2'>
                            <ChevronUp />
                        </Button>
                    </div>
                }
                
                <div className='md:grid md:grid-cols-2 gap-4 items-center'>
                    <div>
                        <p className='text-lg my-2 font-bold underline flex flex-col gap-2'>
                            {today <= earlyBirdEndDate && <span>EARLY BIRD : 379.000 (Sampai 12 Juni)</span>}
                            <span>NORMAL : 600.000 (13-15 Juni)</span>
                        </p>
                       
                        <h1 className="text-4xl mb-4 font-bold w-full md:w-8/12">
                        Content Creator Mentoring</h1>
                        <div className='flex gap-4 mb-4'>
                            <Button onClick={handleCreateInvoice} className='bg-secondary2 hover:bg-purple-800 text-stone-50 hover:scale-105'>
                                <ArrowRightCircleFill className="mr-2" />
                                Dapatkan Segera
                            </Button>
                            {/* <Button onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price, image: template.image, quantity: 1 })} className='bg-secondary2 hover:bg-purple-800 text-stone-50 transform transition duration-500 ease-in-out hover:scale-105'>
                                <CartPlusFill className="mr-2" />
                                Add to Cart
                            </Button> */}
                        </div>
                        <div className='flex flex-col items-start gap-1 text-xs text-stone-800'>
                            4.96/5 Dari 5,608 customers
                            <div className='flex gap-1'>
                                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            </div>
                           
                        </div>
                    </div>
                    <Image src={ContentCreatorMentoring} alt="content creator mentoring" />
                    {/* <CoverImageContentful
                        title="template iksan bangsawan indonesia image"
                        url={template?.image.fields.file.url}
                        className="rounded-xl w-full lg:h-80 my-8"
                    /> */}
                </div>

                {/* testimony */}
                <section className='grid grid-cols-1 gap-4 md:grid-cols-3 py-12 w-full'>
                  
                        <Card  className='text-center w-full'>

                            <CardContent className='m-0 flex-col flex justify-center items-center'>
                            <CardTitle>
                                Program mentoring secara intensive dengan modul terkini.

                           
                            </CardTitle>
                             
                            </CardContent>
                           
                        </Card>
                        <Card  className='text-center'>

                            <CardContent className='m-0 flex-col flex justify-center items-center'>
                            <CardTitle>
                                Dilengkapi dengan banyak latihan dan praktek.

                              
                            </CardTitle>
                           
                           
                            </CardContent>
                           
                        </Card>
                        <Card  className='text-center'>

                        <CardContent className='m-0 flex-col flex justify-center items-center h-full'>
                            <CardTitle className=''>
                                Pendampingan & analisa akun secara individu.
                            </CardTitle>


                        </CardContent>

                    </Card>




                 
                </section>


                <div ref={myRef} className='flex flex-col prose max-w-none px-4 w-full'>
                    <p className="" >
                        Format kelas intensif selama 1 bulan Pendampingan ide, produksi & distribusi Dilengkapi dengan banyak latihan Disediakan peralatan untuk latihan
                    </p>
                    <h3>  Pertemuan Privat </h3>
                    <p className='my-0'>  23-27 Juni 2024 </p>
                    <h3>  Pertemuan Grup </h3>
                    <p className='my-0'> 15 Juni 2024 - 19:00 WIB</p>
                    <p className='my-0'> 21 Juni 2024 - 19:00 WIB</p>
                   <div className='flex flex-col gap-4 md:grid md:grid-cols-3'>
                        {ContentImages.map((image, index) => (
                            <Image key={index} src={image} alt={`Content ${index + 1}`} />
                        ))}
                   </div>
                    {/* <div className='flex flex-col w-full'>
                        <h3>Frequently Asked Questions</h3>

                        <div className='not-prose pt-2 pb-12'>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It comes with default styles that matches the other
                                        components&apos; aesthetic.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It&apos;s animated by default, but you can disable it if you
                                        prefer.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div> */}
                </div>




                {/* <div className='flex gap-4'>
                    <Button variant={"outline"} className="" asChild>
                        <Link href="/template/" className='no-underline hover:bg-secondary2 hover:text-stone-50'>
                            <ChevronLeft /> Kembali ke Daftar Template
                        </Link>
                    </Button>
                </div> */}
            </div>
        </Layout>
    )
}
export default MentoringClient;