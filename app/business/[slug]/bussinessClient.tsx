"use client"

import Layout from '@/components/layout';
import CoverImageContentful from "@/components/cover-image-contentful";

const BusinessPage: React.FC<BusinessPageProps> = ({ businessInfo, metaDefault }) => {


    console.log(businessInfo, "businessInfo")
    // Destructure data from the array
    const { title, description, services, websiteUrl, instagram, establishmentYear, location, businessImage } = businessInfo[0];

    return (
        <Layout metaDefault={metaDefault}>
            <div className="flex flex-col  w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 px-10">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="text-lg mb-4">{description}</p>
                <p className="text-base mb-4">{services}</p>

                <div className="my-4">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-stone-50 bg-secondary2 px-4 py-2 rounded-lg ">Website</a>
                </div>

                <div className="my-4">
                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-stone-50 bg-secondary2 px-4 py-2 rounded-lg ">Instagram</a>
                </div>

                <p className="text-lg">Establishment Year: {establishmentYear}</p>
                <p className="text-lg">Location: {location ? location.lat : ""}, {location ? location.lon : ""}</p>

                <div className="my-4 flex flex-col gap-4">
                    {businessImage.map((image, index) => (
                        <CoverImageContentful
                            key={index}
                            url={image.fields.file.url}
                            title={title}
                            className='w-full h-full'
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default BusinessPage;
