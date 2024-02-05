// @ts-nocheck

"use client"

import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
// import style from '../styles/index.css';

export function Swiper(props) {
    const swiperRef = useRef(null);
    const {
        children,
        ...rest
    } = props;

    useEffect(() => {
        // Register Swiper web component
        register();

        // pass component props to parameters
        const params = {
            ...rest,
            injectStyles: [
                `
                .swiper-button-next svg, .swiper-button-prev svg{
width:1em;
height:1em;
                }
              .swiper-button-next,
              .swiper-button-prev {
                background-color: #fafaf9;
                padding: .5em 1em;
                opacity: .8;
                border-radius:100%;
                color: #0c0a09;
              }
              .swiper-pagination-bullet{

              }
              .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
                display: none;
              }
          `,
            ],
            // injectStylesUrls: [
            //     `${window.location}/styles/index.css`,
            // ],

        };



        // Assign it to swiper element
        Object.assign(swiperRef.current, params);

        // initialize swiper
        swiperRef.current.initialize();
    }, []);

    return (
        <swiper-container init="false" ref={swiperRef}>
            {children}
        </swiper-container>
    );
}
export function SwiperSlide(props) {
    const {
        children,
        ...rest
    } = props;

    return (
        <swiper-slide {...rest}>
            {children}
        </swiper-slide>
    );
}