"use client"

import { useState, useRef, useEffect, SetStateAction } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation'
// Import the useStore hook from your store file
import useStore from '@/store';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
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
import Spinner from '@/components/Spinner';
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

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClickOpen = (image: SetStateAction<null>) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
    const [loading, setLoading] = useState(false);


    const handleCreateInvoice = async () => {
        setLoading(true);
        const isEarlyBird = today <= earlyBirdEndDate;
        await addToCart({
            id: isEarlyBird ? 'early-bird-content-creator-mentoring' : 'content-creator-mentoring',
            name: isEarlyBird ? 'Early Bird Content Creator Mentoring' : 'Content Creator Mentoring',
            price: price,
            image: "/content-creator-mentoring.jpeg",
            quantity: 1
        })
        router.push('/checkout');
        // setLoading(false);
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
                            <a href='https://iksanbangsawan.myr.id/pl/ccm3'>
                                <Button className='bg-secondary2 hover:bg-purple-800 text-stone-50 hover:scale-105'  >
                                    <ArrowRightCircleFill className="mr-2" />
                                    DAFTAR
                                </Button>
                            </a>
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
                            <div key={index} onClick={() => handleClickOpen(image)} className='cursor-pointer'>
                                <Image src={image} alt={`Content ${index + 1}`} />
                            </div>
                        ))}
                    </div>
               
                </div>
                <AlertDialog open={loading} onOpenChange={setLoading} >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className='text-center'>Loading Halaman Checkout</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Spinner />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>

                {selectedImage && (
                    <Dialog open={open} onClose={handleClose} className="fixed z-10 inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-stone-950 opacity-75" />
                            <div className="mx-auto z-50 p-12 md:w-6/12 flex justify-center items-center flex-col">
                                <div className='flex gap-4 justify-between py-4 items-center w-full'>
                                   
                                    <div className="modal-buttons bg-stone-50 rounded-lg p-4 py-2 w-fit">
                                        <button className="text-stone-950" onClick={handleClose}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-content ">
                                    <Image alt='image' src={selectedImage} />
                                </div>

                            </div>
                        </div>
                    </Dialog>
                )}
                <a href='https://iksanbangsawan.myr.id/pl/ccm3'>
                <Button  className='bg-secondary2 hover:bg-purple-800 text-stone-50 hover:scale-105'  >
                    <ArrowRightCircleFill className="mr-2" />
                    DAFTAR
                </Button>
                </a>
            </div>
        </Layout>
    )
}
export default MentoringClient;