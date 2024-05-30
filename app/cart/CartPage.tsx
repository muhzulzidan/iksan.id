// CartPage.tsx
"use client"

import React from 'react';
import useStore from '@/store';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';

const CartPage = () => {
    const { cart, removeFromCart } = useStore();

    return (
       <Layout>
            <div className="container max-w-screen-lg mx-auto px-6 py-8 text-stone-950">
                <h3 className="text-gray-700 uppercase text-lg">Shopping Cart</h3>
                <div className="flex flex-col mt-6">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center mt-6">
                            <div className="flex">
                                <img className="h-20 w-20 object-cover rounded" src={item.image} alt={item.name} />
                                <div className="mx-3">
                                    <h3 className="text-sm text-gray-600">{item.name}</h3>
                                    <div className="flex items-center mt-2">
                                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                            <FaTrash onClick={() => removeFromCart(item.id)} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span className="text-gray-600">${item.price}</span>
                        </div>
                    ))}
                </div>
                <Button className="flex justify-center w-full px-10 py-3 mt-6 font-medium  uppercase bg-secondary2 hover:text-white rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" asChild >
                    <Link href={"/checkout"} >
        
                            Checkout
    </Link>
                   
                </Button>
            </div>
       </Layout>
    );
};

export default CartPage;