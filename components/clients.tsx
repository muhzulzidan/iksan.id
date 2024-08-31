import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import CoverImageContentful from '../components/cover-image-contentful';

const Clients = ({ logos }: { logos: any[] }) => {
    const clients = logos.map((logo, index) => ({
        name: logo.title,
        logo: logo.fields.file.url,
    }));

    return (
        <section className="py-6 lg:py-0 bg-stone-100 text-stone-950">
            <div className="pt-8 lg:py-12 mx-auto max-w-screen-xl px-4">
                <div className="tracking-tight leading-tight text-center lg:mb-4">
                    <h2 className="text-3xl font-extrabold mb-2 md:text-3xl">Network & Collaborations</h2>
                    <p>Perusahaan yang percaya untuk berkolaborasi di media sosial atau pembicara event.</p>
                </div>
                <div className="hidden lg:flex self-center py-8">
                    <Marquee pauseOnHover={true} loop={0} className="hidden lg:flex items-center clients-marquee" gradientColor={'white'}>
                        {clients.map((client, index) => (
                            <a key={index} href="#" className="flex justify-center items-center rounded-xl p-6 w-[10rem] group">
                                {/* <Image src={client.logo} alt={client.name} width={100} height={100} className="w-full h-full object-contain group-hover:filter-none filter grayscale" /> */}

                                <CoverImageContentful url={client.logo} title={client.name} className="w-full h-full object-contain group-hover:filter-none filter grayscale" />
                            </a>
                        ))}
                    </Marquee>
                </div>
                <div className="flex lg:hidden self-center pt-8">
                    <Marquee pauseOnHover={true} loop={0} className="flex items-center clients-marquee-mobile" gradientColor={'white'}>
                        {clients.map((client, index) => (
                            <a key={index} href="#" className="flex justify-center items-center rounded-xl p-6 w-[10rem] group">
                                <CoverImageContentful url={client.logo} title={client.name} className="w-full h-full object-contain group-hover:filter-none filter grayscale" />
                                {/* <Image src={client.logo} alt={client.name} width={100} height={100} className="w-full h-full object-contain group-hover:filter-none filter grayscale" /> */}
                            </a>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default Clients;
