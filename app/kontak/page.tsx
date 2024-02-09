import { Fragment } from 'react';
import Image from 'next/image';
import { getMetaDefault } from '@/lib/contentful';
import KontakImage from "@/app/images/contact.png"
import Layout from '@/components/layout';

async function Contact() {

    const metaDefault = await getMetaDefault();
    
    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 space-y-10">
                <div className='w-full max-w-md p-6 rounded-md flex flex-col items-center space-y-4 relative  '>

                    <Image src={KontakImage} alt="Contact Image" width={150} height={150} className="rounded-xl justify-center items-center flex" />
                    <h1 className="text-4xl font-bold text-center">Get In Touch</h1>
                    <p className="text-center text-xl max-w-md">Have questions or want to collaborate? Reach out to us.</p>

                </div>

                <div className="w-full max-w-md p-6 bg-stone-50 border rounded-md shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold">Contact Details:</h2>
                    <p><strong>Location:</strong> Indonesia</p>
                    <p><strong>Phone:</strong> 0811 422 02 04</p>
                    <p><strong>Email Management:</strong> iksan@skena.co.id</p>
                    <p><strong>Alternate Email:</strong> iksanbangsawan@gmail.com</p>
                    <p><strong>Contact Skena:</strong> halo@skena.co.id</p>
                </div>

                <form className="w-full max-w-md p-6 space-y-6 bg-stone-50 border rounded-md shadow-lg">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-lg">Name</label>
                        <input type="text" id="name" placeholder="Your Name" className="p-2 border rounded-md focus:ring-2 focus:ring-stone-500" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-lg">Email</label>
                        <input type="email" id="email" placeholder="example@example.com" className="p-2 border rounded-md focus:ring-2 focus:ring-stone-500" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="message" className="text-lg">Message</label>
                        <textarea id="message" rows={5} placeholder="Your Message" className="p-2 border rounded-md focus:ring-2 focus:ring-stone-500"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-lg font-bold text-white bg-secondary2 hover:bg-purple-800 focus:ring-4 focus:ring-stone-300">Send Message</button>
                </form>
            </div>
        </Layout>
    );
}

export default Contact