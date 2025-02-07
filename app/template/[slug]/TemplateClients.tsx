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
import { SignIn,  } from "@clerk/nextjs";
const TemplateClients = ({ template }: { template: Template }) => {

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


    // console.log(user, "user")

    // const handleCreateInvoice = async () => {
    //     console.log("handle Create Invoice")


    //     if (!user) {
    //         console.log("handleCreateInvoice user null")
    //         toast({
    //             variant: "default",
    //             title: "Sign In Required",
    //             description: "Please sign in to create an invoice.",
    //         });
    //         localStorage.setItem('redirectURL', pathname);
    //         return router.push('/sign-in')
    //     }

    //     console.log(user, "user")
    //     try {
    //         // Try to retrieve the customer from Xendit
    //         let customer;
    //         try {
    //             console.log("make customer")
    //             const response = await axios.get(`/api/xendit/customer?reference_id=${user?.id}`);
    //             customer = response.data;
    //             console.log(customer, "found customer")
    //         } catch (err) {
    //             console.log("the customer doesn't exist")
    //             // If the customer doesn't exist, create the customer
    //             const response = await axios.post('/api/xendit/customer', {
    //                 name: user?.fullName,
    //                 email: user?.primaryEmailAddress?.emailAddress,
    //                 phoneNumber: '', // Replace with the user's phone number if available
    //             });
    //             customer = response.data;
    //         }

    //         // Create the invoice if the price is greater than 0
    //         if (template.price > 0) {
    //             console.log("price is greater than 0")
    //             const response = await axios.post('/api/xendit/invoice', {
    //                 price: template.price,
    //                 title: template.title,
    //                 slug: template.slug,
    //                 userEmail: user?.primaryEmailAddress?.emailAddress,
    //             });

    //             setInvoiceUrl(response.data.invoiceUrl);
    //             console.log(invoiceUrl, "state of invoiceUrl");
    //             setError(null);
    //             // Open the invoice URL in a new window
    //             window.open(response.data.invoiceUrl, '_blank');
    //         } else {
    //             console.log("price is 0")
    //             handleDownloadInvoice();
    //         }
    //     } catch (err) {
    //         setError('Error creating invoice');
    //         setInvoiceUrl(null);
    //     }
    // };

    // const handleDownloadInvoice = async () => {
    //     if (!user) {
    //         return redirect('/sign-in')
    //     }

    //     try {
    //         const response = await axios.get(`/api/file-download?userId=${user?.id}&fileName=${template.slug}`);
    //         const data = response.data;
    //         window.open(data.fileUrl, '_blank');
    //     } catch (err) {
    //         console.error('Error downloading invoice', err);
    //     }
    // }
    const handleCreateInvoice = async () => {
        addToCart({ id: template.slug, name: template.title, price: template.price, image: template.image, quantity: 1 })
        router.push('/checkout');
    }

    type CartItem = {
        id: string;
        name: string;
        // other properties...
    };

    // console.log(template, "template")

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
                            {template.price === 0 ? 'Gratis' : `Rp.${template.price}${template.price.toString().includes('.') ? '00' : '.000'}`}
                        </p>
                        <h1 className="text-4xl mb-4 font-bold w-full md:w-8/12">{template.title}</h1>
                        <div className='flex gap-4 mb-4'>
                            <Button onClick={handleCreateInvoice} className='bg-secondary2 hover:bg-purple-800 text-stone-50 hover:scale-105'>
                                <ArrowRightCircleFill className="mr-2 w-4 h-4 fill-stone-50" />
                                Download
                            </Button>
                            <Button onClick={() => addToCart({ id: template.slug, name: template.title, price: template.price, image: template.image, quantity: 1 })} className='bg-secondary2 hover:bg-purple-800 text-stone-50 transform transition duration-500 ease-in-out hover:scale-105'>
                                <CartPlusFill className="mr-2 w-4 h-4 fill-stone-50" />
                                Add to Cart
                            </Button>
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
                        title="template iksan bangsawan indonesia image"
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


                <div ref={myRef} className='flex flex-col prose max-w-none px-4 w-full'>
                    <ReactMarkdown className="text-lg" >{template.description}</ReactMarkdown>
                    <div className='flex flex-col w-full'>
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
                    </div>
                </div>




                <div className='flex gap-4'>
                    {/* <Button className='bg-secondary2 text-stone-50' >
                        <ChevronUp /> Beli
                    </Button> */}
                    <Button variant={"outline"} className="" asChild>
                        <Link href="/template/" className='no-underline hover:bg-secondary2 hover:text-stone-50'>
                            <ChevronLeft /> Kembali ke Daftar Template
                        </Link>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}
export default TemplateClients;