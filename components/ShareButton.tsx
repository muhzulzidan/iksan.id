import React from 'react';
import { Facebook, Twitter, Linkedin } from 'react-bootstrap-icons';
import getURL from "../utils/getURL";
const ShareButton = ({ title, url }) => {
    // Encode the URL
    const encodedUrl = encodeURIComponent(url);
    const finalUrl = getURL(`/${encodedUrl}`);

    // Share URLs for Facebook, Twitter, and LinkedIn
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${finalUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${finalUrl}&text=${title}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${finalUrl}&title=${title}`;

    return (
        <div className="flex items-center gap-4">
            <p>Bagikan</p>
            <div className='flex gap-2'>
                <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                >
                    <Facebook color='gray' className='hover:fill-secondary2'  />
                </a>
                <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                >
                    <Twitter color='gray' className='hover:fill-secondary2' />
                </a>
                <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-900"
                >
                    <Linkedin color='gray' className='hover:fill-secondary2' />
                </a>
            </div>
        </div>
    );
};

export default ShareButton;
