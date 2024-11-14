"use client"

import React, { useState } from 'react';
import styles from '../post-body.module.css'
import parse, { DOMNode } from 'html-react-parser';
import { Dialog, DialogBackdrop, Transition } from '@headlessui/react';

interface GalleryModalProps {
  imageUrl: string;
  isOpen: boolean;
  closeModal: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ imageUrl, isOpen, closeModal }) => {

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
        
      >
        <div className="min-h-screen flex items-center justify-center px-4 py-12 text-center">
          {/* Background overlay */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="ease-in duration-200"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
          >
            {/* Dark background overlay */}
            <DialogBackdrop className="fixed inset-0 bg-stone-950 opacity-75" />
          </Transition.Child>

          {/* Modal content */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="max-w-full h-full w-full fixed flex p-6 my-8 overflow-hidden transition-all transform bg-transparent shadow-xl rounded-lg justify-center">
              <button
                className="absolute top-4 right-4 text-stone-100 hover:text-stone-100 focus:outline-none"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex items-center justify-center">
                <img src={imageUrl} alt="Gallery" className="w-8/12 h-auto" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};


interface PostContentProps {
  content: string;
}


const PostContent: React.FC<PostContentProps> = ({ content }) => {

  const [modalImageUrl, setModalImageUrl] = useState(null);

  // Function to open modal
  const openModal = (imageUrl: React.SetStateAction<null>) => {
    setModalImageUrl(imageUrl);
  };

  // Function to close modal
  const closeModal = () => {
    setModalImageUrl(null);
  };

  // const options = {
  //   replace: (node: { name: string; attribs: { class: string | string[]; }; children: any[]; }) => {
  //     if (
  //       node.name === 'figure' &&
  //       node.attribs.class === 'wp-block-image size-large'
  //     ) {
  //       const imgNode = node.children.find((child: { name: string; }) => child.name === 'a');
  //       if (imgNode && imgNode.attribs.href) {
  //         const imageUrl = imgNode.children[0].attribs.src;
  //         return (
  //           <figure key={imageUrl} onClick={() => openModal(imageUrl)} className=' '>
  //             <img src={imageUrl} alt="Gallery" />
  //           </figure>
  //         );
  //       }
  //     }
  //     if (
  //       node.name === 'figure' &&
  //       node.attribs.class.includes('wp-block-gallery')
  //     ) {
  //       // Change the class of the wp-block-gallery figure here
  //       node.attribs.class = 'grid grid-cols-2 md:grid-cols-3  gap-4 pb-4'; // Replace 'your-custom-class' with your desired class name

  //       // Return the modified figure element
  //       return node;
  //     }
  //     return null;
  //   },
  // };

  const options = {
    replace: (domNode: DOMNode, index: number) => {
      const node = domNode as unknown as { name: string; attribs: { class: string | string[]; }; children: any[]; };
      if (
        node.name === 'figure' &&
        node.attribs.class === 'wp-block-image size-large'
      ) {
        const imgNode = node.children.find((child: { name: string; }) => child.name === 'a');
        if (imgNode && imgNode.attribs.href) {
          const imageUrl = imgNode.children[0].attribs.src;
          return (
            <figure key={imageUrl} onClick={() => openModal(imageUrl)} className=' '>
              <img src={imageUrl} alt="Gallery" />
            </figure>
          );
        }
      }
      if (
        node.name === 'figure' &&
        node.attribs.class.includes('wp-block-gallery')
      ) {
        // Change the class of the wp-block-gallery figure here
        node.attribs.class = 'grid grid-cols-2 md:grid-cols-3  gap-4 pb-4'; // Replace 'your-custom-class' with your desired class name

        // Return the modified figure element
        return node;
      }
      return null;
    },
  };

  return (
    <div className={`${styles.content} prose prose-p:m-0 prose-p:mb-4 prose-a:my-4 max-w-none prose-figure:m-0`}>
     
      {parse(content, options)}
      {modalImageUrl && (
        <GalleryModal imageUrl={modalImageUrl} closeModal={closeModal} isOpen={modalImageUrl !== null} />
      )}
    </div>
  );
};

export default PostContent;
