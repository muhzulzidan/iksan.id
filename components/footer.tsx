'use client';
import { useState } from 'react';
import Link from 'next/link'
import { Flowbite, Footer } from 'flowbite-react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Tiktok  } from "react-bootstrap-icons"
import CoverImageContentful from "../components/cover-image-contentful";
import { getAuthToken } from '../lib/Authentication';
import { getSubscribe } from '../lib/contentful';
// import { timeLog } from 'console';

export default function FooterWithSocialMediaIcons({ metaDefault }: { metaDefault: any }) {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    // Check if metaDefault exists and has at least one item
    const shouldUseMeta = metaDefault && metaDefault.length > 0;

    // Use the first item from metaDefault if it exists
    const metaFirst = shouldUseMeta ? metaDefault[0] : {};
    // console.log(metaFirst)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim() === '' || fullName.trim() === '') {
            // Handle validation or show an error message
            return;
        }
        // Get the current UNIX timestamp
        const time = Math.floor(Date.now() / 1000);

        // Example usage
        const username = 'iksanbangsawan';
        const apiKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY;
        const token = await getAuthToken(username, apiKey || ''); // Ensure apiKey is not undefined
        // console.log(token, "token")

        const myHeaders = new Headers();
        myHeaders.append('Auth-Id', username);
        myHeaders.append('Auth-Token', token);
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append('Timestamp', time.toString()); // Convert to string

        const urlencoded = new URLSearchParams();
        urlencoded.append('lists', '1');
        urlencoded.append('full_name', fullName);
        urlencoded.append('email', email);
        urlencoded.append('fields[no_hp]', "081354789375");
        urlencoded.append('fields[alamat]', "Indonesia");
        urlencoded.append('tags', 'iksan.id');

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow', // or another appropriate value
        };

        try {
            const response = await fetch('/api/proxy', requestOptions);
            const result = await response.text();
            // console.log(result);

            // Optionally, you can reset the form or show a success message
            setEmail('');
            setFullName('');
        } catch (error) {
            // Handle errors here
            console.error('Error sending email:', error);
        }
    };


    const customTheme = {
        footer: {
            root: {
                base: "w-full rounded-lg  bg-stone-100  dark:bg-stone-800 md:flex md:items-center md:justify-between",
            },
            groupLink: {
                "base": "flex flex-wrap text-sm text-stone-500 dark:text-white",
                "link": {
                    "base": "last:mr-0 md:mr-6",
                    "href": "hover:underline flex gap-2 items-center"
                },
                "col": "flex-col space-y-4"
            },
        },

    };
    return (
        <footer className='max-w-screen-lg  mx-auto bg-stone-50'>
            <Flowbite theme={{ theme: customTheme }}>
                <Footer container>
                    <div className="w-full">
                        <div className="grid w-full gap-12 justify-between sm:flex sm:justify-between md:flex md:grid-cols-1  ">
                            <Link href={"/"} className='sm:mt-4 '>
                                <Footer.Brand
                                    alt="iksanbangsawan"
                                    src="https://images.ctfassets.net/1612ijcm5jnx/BJSXzbfipb7T7QD4M8Jyb/f9d3b5cc117f3a9cbb131dbcbfd5954c/Logo-Iksan-Bangsawan_2x.png"
                                    className='h-12'
                                />
                            </Link>
                            <div className="grid grid-cols-1 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 w-full">

                               
                                <div className='grid col-span-2 justify-center'>
                                   <div className=' flex md:gap-4'> 
                                        <CoverImageContentful 
                                            decoding='defer'
                                            url='https://images.ctfassets.net/1612ijcm5jnx/3HOaKsON98sHlXEFxRk1Ft/15b7e9a8e9c070cae248b26f1451b7bc/mail-1-901x1024.png'
                                            className='h-10/12 w-[12rem] hidden md:flex object-contain'
                                            title='email iksan bangsawan indonesia'
                                        /> 
                                      <div className='flex flex-col gap-4 '>
                                            <h4 className='text-xl'> Dapatkan insight mingguan!  </h4>
                                            <p className='w-11/12'>Gabung bersama 5640+ member untuk dapatkan tips, trik, dan cerita tentang produktivitas, industri kreatif, karir secara berkala & gratis.</p>
                                            <a target='_blank' className='flex bg-secondary2 hover:bg-secondary3 hover:text-stone-950 text-stone-50 px-4 py-2 rounded-lg w-fit' href="https://file.iksanbangsawan.com/f/iksanid6dm01yk0-uz995rV5">Gabung</a>
                                      </div>
                                    </div>
                                    {/* Email sending form */}
                                    {/* <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-full'>
                                        <label className='flex flex-col'>
                                            <span className='text-sm'>Full Name:</span>
                                            <input
                                                type='text'
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className='border p-2 rounded-md'
                                            />
                                        </label>
                                        <label className='flex flex-col'>
                                            <span className='text-sm'>Email:</span>
                                            <input
                                                type='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='border p-2 rounded-md'
                                            />
                                        </label>
                                        <button
                                            type='submit'
                                            className='bg-secondary2 text-stone-50 w-fit px-4 py-2 rounded-md hover:bg-purple-900'
                                        >
                                            Send Email
                                        </button>
                                    </form> */}
                                </div>
                                <div className='grid  md:col-start-3'>
                                    <Footer.Title title="Sosial Media" />
                                    <Footer.LinkGroup  className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                       
                                            <Footer.Link href="https://www.instagram.com/iksanbangsawan/">
                                                <Instagram width={20} height={18} />
    
                                                Instagram
                                            </Footer.Link>
                                            <Footer.Link href="https://www.threads.net/@iksanbangsawan/">
                                                {/* <Threads width={20} height={18} /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-threads" viewBox="0 0 16 16">
                                                    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948.591.621.928 1.509 1.005 2.644.328.138.63.299.905.484 1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.217 6.217 0 0 0-1.528-.161Z" />
                                                </svg>
                                                Threads
                                            </Footer.Link>
                                            <Footer.Link href="https://twitter.com/iksanbangsawan">
                                                <Twitter width={20} height={18} />
                                                X
                                            </Footer.Link>
                                            <Footer.Link href="https://twitter.com/iksanbangsawan">
                                                <Tiktok width={20} height={18} />
                                                Tiktok
                                            </Footer.Link>
                                            <Footer.Link href="https://twitter.com/iksanbangsawan">
                                                <Youtube width={20} height={18} />
                                                Youtube
                                            </Footer.Link>
                                            <Footer.Link href="https://twitter.com/iksanbangsawan">
                                                <Linkedin width={20} height={18} />
                                                Linkedin
                                            </Footer.Link>
                                      

                                    </Footer.LinkGroup>
                                </div>
                            </div>
                        </div>
                        <Footer.Divider />
                        <div className="w-full sm:flex sm:items-center sm:justify-between">
                            <Footer.Copyright
                                by="IksanBangsawan"
                                href="#"
                                year={2023}
                            />
                            <div className="mt-4 flex  space-x-6 sm:mt-0 sm:justify-center">
                                    <Footer.LinkGroup>
                                        <Footer.Link href="#">
                                            Privacy Policy
                                        </Footer.Link>
                                        <Footer.Link href="#">
                                            Terms & Conditions
                                        </Footer.Link>
                                    </Footer.LinkGroup>
                               

                            </div>
                        </div>
                    </div>
                </Footer>
            </Flowbite>
        </footer>
    )
}

