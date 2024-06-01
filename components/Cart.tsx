// Cart.tsx
import React from 'react';
import useStore from '@/store';
import Link from 'next/link';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button';
import { CartX, CartFill as FaShoppingCart } from 'react-bootstrap-icons';

const Cart = () => {
    const { cart, removeFromCart, decrementQuantity, incrementQuantity } = useStore();
    // Calculate the total quantity of all items in the cart
    const totalQuantity = cart.reduce((total, item) => total + (Number.isFinite(item.quantity) ? item.quantity : 0), 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div className='flex gap-2'>

            <Sheet>
                <SheetTrigger className='' asChild>
                    <Button variant={"outline"} className='flex gap-1 bg-border border-tertiary1 text-stone-950 bg-transparent hover:bg-tertiary1 hover:text-stone-50' >
                        <FaShoppingCart className="mb-1 stroke-[inherit] " />
                        Cart : {totalQuantity} {/* Display the total quantity instead of the number of items */}
                    </Button>
                </SheetTrigger>
                <SheetContent className='pt-10 overflow-y-auto'  >
                
                        <SheetHeader>
                            <SheetTitle>Your Shopping Cart</SheetTitle>
                        </SheetHeader>
                        {cart.length === 0 ? (
                            <div className='py-4 text-center flex flex-col justify-center items-center gap-2 h-full text-primary1'>
                                <CartX size={48} className='mb-4' />
                                <h4 className=' m-0 font-kanakiraBold '>
                                    Keranjang Masih kosong
                                </h4>
                            </div>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.id} className='py-4'>
                                        <SheetDescription asChild>
                                            <div className="grid grid-cols-2 items-center justify-between " >
                                               <div className='flex flex-col gap-1'>
                                                    <h4 className=' m-0 font-kanakiraBold text-stone-950 w-full'>  {item.name}</h4>
                                                    <p className='m-0'>
                                                        {item.price === 0 ? 'Gratis' : `Rp.${item.price}${item.price.toString().includes('.') ? '00' : '.000'}`}
                                                    </p>
                                               </div>
                                                <div className='w-full justify-center flex flex-col place-self-center justify-self-center items-center'>
                                                    <form className="max-w-xs ">
                                                        <div className="relative  gap-2 flex items-center">
                                                            {item.quantity > 1 ? (
                                                                <button
                                                                    type="button"
                                                                    id="decrement-button"
                                                                    data-input-counter-decrement="counter-input"
                                                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                                    onClick={() => decrementQuantity(item.id)}
                                                                >
                                                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                                    </svg>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    id="remove-button"
                                                                    className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-stone-950 inline-flex items-center justify-center border border-red-500 rounded-md h-5 w-5 focus:ring-red-500 focus:ring-2 focus:outline-none"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                            <input
                                                                type="text"
                                                                id="counter-input"
                                                                data-input-counter
                                                                className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[0.5rem] text-center"
                                                                placeholder=""
                                                                value={item.quantity} // Replace hardcoded value with quantity variable
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                id="increment-button"
                                                                data-input-counter-increment="counter-input"
                                                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                                onClick={() => incrementQuantity(item.id)} // Assuming you have the id of the item
                                                            >
                                                                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </form>
                                               </div>
                                          </div>
                                        </SheetDescription>
    
                                    </div>
                                ))}
    
                                <div className='py-4 flex flex-col gap-2 mr-10'>
                                        <h4 className=' m-0 font-kanakiraBold text-stone-950'>
                                            Total Harga: {
                                                cart.reduce((total, item) => total + item.price * item.quantity, 0) === 0
                                                    ? 'Gratis'
                                                    : `Rp.${cart.reduce((total, item) => total + item.price * item.quantity, 0)}${cart.reduce((total, item) => total + item.price * item.quantity, 0).toString().includes('.') ? '00' : '.000'}`
                                            }
                                        </h4>
                                    <Button asChild>
                                        <Link href={"/checkout/"} className='hover:text-stone-50 w-full mr-2'>
                                            Checkout
                                        </Link>
                                    </Button>
                                </div>
    
                            </>
                        )}
    
    
                 
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Cart;