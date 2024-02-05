
"use client"

import React, { useEffect, useState } from 'react'
import { Flowbite, Navbar, Dropdown } from "flowbite-react";
import type { CustomFlowbiteTheme } from 'flowbite-react';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive'
import LazyLoad from 'react-lazy-load';
import CoverImageContentful from './cover-image-contentful';
// import dynamic from 'next/dynamic'
// const DynamicHeader = dynamic(() => import('./header'), {
//   loading: () => <p>Loading...</p>,
// })

export default function Header() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [firstSlideWidth, setFirstSlideWidth] = useState('auto'); // default width
  const is200 = useMediaQuery({ query: '(max-width: 200px)' })



  useEffect(() => {
    const handleScroll = () => {
      const isHeaderScrolled = window.scrollY > 0;
      setIsScrolled(isHeaderScrolled);
    };
    is200 ? ""  : setFirstSlideWidth('7rem');
    // setFirstSlideWidth('7rem');

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

   
  }, []);


  const customThemeDropdown: CustomFlowbiteTheme['dropdown'] = {
    content: "py-1 focus:outline-none",
    inlineWrapper: "flex items-center font-mabryBold text-lg",
    floating: {
      item: {
        container: "",
        base: "flex items-center justify-start py-2 px-4 text-lg text-gray-700 cursor-pointer w-full hover:bg-gray-200 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        auto: "border border-gray-200 bg-gray-100 text-gray-950 dark:border-none dark:bg-gray-700 dark:text-white",
      },
      content: "py-1 text-lg text-gray-700 dark:text-gray-200",
      base: "z-50 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none ",
      arrow: {
        base: "absolute z-10 h-12 w-12 rotate-180",
        style: {
          "dark": "bg-gray-900 dark:bg-gray-700",
          "light": "bg-white",
          "auto": "bg-white dark:bg-gray-700"
        },
        placement: "-4px",

      },
    },

  };


  const customTheme = {
    navbar: {
      root: {
        base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 z-10",
        inner: {
          "base": `mx-auto flex flex-wrap items-center justify-between  ${isScrolled ? 'max-w-screen-lg pb-4 px-0 xl:px-4' : ''}`,
        }
      },
      link: {
        active: {
          on: "text-primary",
          off: "border-b border-gray-100  text-stone-950 hover:text-secondary2  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white"
        },
      },
      collapse: {
        "base": "w-full md:block md:w-auto",
        "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:gap-8 md:text-sm md:font-medium",
        "hidden": {
          "on": "hidden",
          "off": ""
        }
      },
    },


  };


  const dropdownLinks = {
    "Iksan’s": [
      { href: "/profil", text: "My Story" },
      { href: "/press-kit", text: "Press Kit" },
      { href: "/event", text: "Event" },
      { href: "/photos", text: "Photos" },
      { href: "/book", text: "Book" },
      { href: "/kontak/", text: "Contact" }
    ],
    "Product": [
      { href: "/template", text: "Template" },
      { href: "/video-course", text: "Ecourse" },
      { href: "/ebook", text: "Ebook" },
      { href: "/wallpaper", text: "Wallpaper" },
      { href: "/blogs", text: "Blog" },
      { href: "/gadget", text: "Gadget" },
    ],
    "Business": [
      { href: "/business/skena", text: "SKENA" },
      { href: "/business/great-upgrade", text: "GreatUpgrade" },
      { href: "/business/sapi-perjaka", text: "Sapiperjaka" }
    ],
    "CONTACT": { href: "/kontak/", text: "Contact" },
  };
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);


  return (
    <header className=" ">
      <h1 className="hidden">iksanbangsawan</h1>
      <LazyLoad offset={100}>
        <nav className='hidden md:block'>

          <Flowbite theme={{ theme: customTheme }}>

            <Navbar
              className={`bg-stone-100 sticky top-0 max-w-screen-lg mx-auto border-0 pt-4 pb-0 ${isScrolled ? 'fixed top-0 left-0 w-full z-50 max-w-none px-0' : ''}`}
              fluid={true}
              rounded={true}
            >
              <Navbar.Brand as={Link} href="/">
                {/* <Image
                  width={110}
                  height={120}
                  src="https://images.ctfassets.net/1612ijcm5jnx/BJSXzbfipb7T7QD4M8Jyb/f9d3b5cc117f3a9cbb131dbcbfd5954c/Logo-Iksan-Bangsawan_2x.png"
                  // className="mr-3 h-6 sm:h-9"
                  quality={100}
                  alt="iksanbangsawan" /> */}
                <CoverImageContentful
                  className="mr-3 h-6 w-auto sm:h-9"
                  title="iksan bangsawan indonesia"
                  url="https://images.ctfassets.net/1612ijcm5jnx/BJSXzbfipb7T7QD4M8Jyb/f9d3b5cc117f3a9cbb131dbcbfd5954c/Logo-Iksan-Bangsawan_2x.png"
                />
              </Navbar.Brand>
              <Navbar.Toggle />

              <Navbar.Collapse>
                {Object.entries(dropdownLinks).map(([dropdownLabel, links]) => {
                  if (dropdownLabel === "CONTACT") {
                    const contactLink = links as { href: string; text: string; };
                    return (

                      <Navbar.Link as="div" className='font-mabryBold text-lg' key={`navlink-${dropdownLabel}`}>
                        <Link key={contactLink.text} className='font-mabryBold ' href={contactLink.href} passHref>
                          {contactLink.text}

                        </Link>

                      </Navbar.Link>

                    );
                  } else {
                    const dropdownLinksArray = links as { href: string; text: string; }[];
                    return (

                      <Dropdown theme={customThemeDropdown} label={dropdownLabel} inline key={dropdownLabel} trigger={'hover'} className='z-50'>
                        {dropdownLinksArray.map(link => (

                          <Dropdown.Item as="div" className='text-lg font-mabryBold hover:bg-gray-200 p-0 z-50' key={link.text}>

                            <Link href={link.href} passHref className='hover:bg-gray-200 w-full h-full px-4 py-2 hover:text-gray-950 font-mabryBold'>
                              {link.text}
                            </Link>

                          </Dropdown.Item>

                        ))}
                      </Dropdown>

                    );
                  }
                })}
              </Navbar.Collapse>

            </Navbar>

          </Flowbite>
        </nav>
      </LazyLoad>

      <nav className='block md:hidden'>
        <Flowbite theme={{ theme: customTheme }}>

          <Navbar
            className={`bg-stone-100 sticky top-0 max-w-screen-lg mx-auto border-0 px-4 pt-4  ${isScrolled ? 'fixed top-0 left-0 w-full z-50 max-w-none px-4' : ''}`}
            fluid={true}
            rounded={true}
          >
            <Navbar.Brand as={Link} href="/">
              <Image
                src="https://images.ctfassets.net/1612ijcm5jnx/BJSXzbfipb7T7QD4M8Jyb/f9d3b5cc117f3a9cbb131dbcbfd5954c/Logo-Iksan-Bangsawan_2x.png"
                
                // className="mr-3 h-12 md:h-9 mb-4 md:mb-0"
                quality={100} 
                width={150}
                height={100}
                alt="iksanbangsawan" />
            </Navbar.Brand>
          </Navbar>
        </Flowbite>
        <div className={`bg-stone-100  top-0 max-w-screen-lg mx-auto px-4 py-4 border-y border-stone-950 border-solid  ${isScrolled ? 'fixed top-20 left-0 w-full z-50 max-w-none' : ''}`}>
          <Swiper
            className='uppercase '
            loop={false}
            spaceBetween={0}
            slidesPerView={2}
            breakpoints={{
              200: {
                slidesPerView: 2.1
              },
              400: {
                slidesPerView: 3.1
              }
            }}
          >
           {Object.entries(dropdownLinks).map(([dropdownLabel, links], index) => {
              const isFirstSlide = index === 0;
              if (dropdownLabel === "CONTACT") {
                const contactLink = links as { href: string; text: string; };
                return (
                  <SwiperSlide
                    className={` font-mabryBold `}
                    key={dropdownLabel}

                  >
                    <Link key={contactLink.text} as={"button"} className='text-gray-950 capitalize flex items-center  pt-[.1rem] pl-2' href={contactLink.href} passHref>

                      {contactLink.text}

                    </Link>
                  </SwiperSlide>
                );
              } else {
                const dropdownLinksArray = links as { href: string; text: string; }[];
                return (
                  <SwiperSlide
                    className={`font-mabryBold`}
                    key={dropdownLabel}
                    style={isFirstSlide ? { width: firstSlideWidth } : {}}
                  >
                    <Dropdown theme={customThemeDropdown} label={dropdownLabel}  inline key={dropdownLabel}>
                      {dropdownLinksArray.map(link => (
                        <Link key={link.text} href={link.href} passHref>
                          <Dropdown.Item as="span">
                            {link.text}
                          </Dropdown.Item>
                        </Link>
                      ))}
                    </Dropdown>
                  </SwiperSlide>
                );
              }
            })}

          </Swiper>
        </div>
      </nav>
    </header>
  )
}
