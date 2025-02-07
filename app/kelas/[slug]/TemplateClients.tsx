"use client"

import { useState, useRef, useEffect, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from 'react';
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { setCookie } from 'nookies';

import { ChevronUp, ChevronLeft, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { SignIn, } from "@clerk/nextjs";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const TemplateClients = ({ template }: { template: any }) => {
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => <strong>{text}</strong>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => <p className='my-2'>{children}</p>,
            [BLOCKS.HEADING_1]: (node: any, children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => <h1>{children}</h1>,
            // Add more custom renderers as needed
        },
    };

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

    const handleCreateInvoice = async () => {
        addToCart({ id: template.slug, name: template.title, price: template.price1, image: template.image, quantity: 1 })
        router.push('/checkout');
    }

    type CartItem = {
        id: string;
        name: string;
        // other properties...
    };

    console.log(template, "template")

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
                        <p className='text-lg my-2 font-bold underline'>
                            {template.price1 === 0 ? 'Gratis' : `Rp.${template.price1}${template.price1.toString().includes('.') ? '00' : '.000'}`}
                            {template.priceDesc && template.priceDesc[0] ? ` (${template.priceDesc[0]})` : ''}
                        </p>
                        <p className='text-lg my-2 font-bold underline'>
                            {template.price2 === 0 ? 'Gratis' : `Rp.${template.price2}${template.price2.toString().includes('.') ? '00' : '.000'}`}
                            {template.priceDesc && template.priceDesc[1] ? ` (${template.priceDesc[1]})` : ''}
                        </p>
                        <h1 className="text-4xl mb-4 font-bold w-full md:w-8/12">{template.title}</h1>
                        <div className='flex flex-col md:pr-12'>
                            <div className='grid grid-cols-1 gap-4 mb-4'>
                                <Button onClick={handleCreateInvoice} className='bg-tertiary1 hover:bg-green-800 text-stone-50 transform transition duration-500 ease-in-out hover:scale-105'>
                                    <ArrowRightCircleFill className="mr-2 w-4 h-4 fill-stone-50" />
                                    Download
                                </Button>
                            </div>
                            <div className='grid grid-cols-1  gap-4 mb-4'>


                                <Button onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price1, image: template.image, quantity: 1 })} className='bg-secondary2 hover:bg-purple-800 text-stone-50 transform transition duration-500 ease-in-out hover:scale-105'>
                                    <CartPlusFill className="mr-2 w-4 h-4 fill-stone-50" />
                                    Add to Cart ({template.priceDesc[0]})
                                </Button>
                                <Button onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price2, image: template.image, quantity: 1 })} className='bg-secondary2 hover:bg-purple-800 text-stone-50 transform transition duration-500 ease-in-out hover:scale-105'>
                                    <CartPlusFill className="mr-2 w-4 h-4 fill-stone-50 " />
                                    Add to Cart ({template.priceDesc[1]})
                                </Button>
                            </div>
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
                    <CoverImageContentful
                        title={template.title}
                        url={template?.image.fields.file.url}
                        className="rounded-xl w-full lg:h-80 my-8"
                    />
                </div>

                {/* testimony */}
                {/* <section className='grid grid-cols-1 gap-4 md:grid-cols-3 py-12'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className='text-center'>

                            <CardContent className='m-0 pt-12 flex-col flex justify-center items-center'>
                                <div className='flex gap-1 m-0 pb-4'>
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                </div>
                                <p>This is a dummy testimony content for testimony number {index + 1}.</p>

                            </CardContent>
                            <CardFooter className='flex flex-col gap-2 justify-center items-center'>

                                <Avatar className='h-12 w-12' >
                                    <AvatarImage className='' src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='felx flex-col gap-0'>
                                    <h4 className='m-0 text-lg'>Jasmin Reinhard</h4>
                                    <p className='m-0 text-sm'>YouTuber, Jusuf (500K subscriberss)</p>
                                </div>

                            </CardFooter>
                        </Card>


                    ))}
                </section> */}


                <div ref={myRef} className='flex flex-col prose max-w-none px-4 pt-12 w-full'>
                    {documentToReactComponents(template.description, options)}
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

                <div className='flex gap-4'>
                    <Button variant={"outline"} className="" asChild>
                        <Link href="/kelas/" className='no-underline hover:bg-secondary2 hover:text-stone-50'>
                            <ChevronLeft /> Kembali ke Daftar Kelas
                        </Link>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}
export default TemplateClients;