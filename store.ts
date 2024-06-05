// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define a type for the items in the cart
type CartItem = {
    id: string;
    name: string;
    price: number; // Add price property
    image: string;
    quantity: number; // Add quantity property
    // Add other properties as needed
};


// Define the store's state
interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
};



const useStore = create<CartState>()( 

    persist(
        (set) => ({
            cart: [],
            addToCart: (item: { id: any; quantity: unknown; }) => set((state: { cart: any[]; }) => {
                const existingItemIndex = state.cart.findIndex((i: { id: any; }) => i.id === item.id);
                if (existingItemIndex >= 0) {
                    // If the item already exists in the cart, increase its quantity
                    const newCart = [...state.cart];
                    newCart[existingItemIndex].quantity += Number.isFinite(item.quantity) ? item.quantity : 1;
                    return { cart: newCart };
                } else {
                    // If the item does not exist in the cart, add it
                    const newCart = [...state.cart, { ...item, quantity: Number.isFinite(item.quantity) ? item.quantity : 1 }];
                    return { cart: newCart };
                }
            }),
            removeFromCart: (id: any) => set((state: { cart: any[]; }) => {
                const newCart = state.cart.filter((i: { id: any; }) => i.id !== id);
                return { cart: newCart };
            }),
            incrementQuantity: (id: any) => set((state: { cart: any[]; }) => {
                const existingItemIndex = state.cart.findIndex((i: { id: any; }) => i.id === id);
                if (existingItemIndex >= 0) {
                    const newCart = [...state.cart];
                    newCart[existingItemIndex].quantity += 1;
                    return { cart: newCart };
                }
                return { cart: state.cart };  // return current state if condition is not met
            }),
            decrementQuantity: (id: any) => set((state: { cart: any[]; }) => {
                const existingItemIndex = state.cart.findIndex((i: { id: any; }) => i.id === id);
                if (existingItemIndex >= 0 && state.cart[existingItemIndex].quantity > 1) {
                    const newCart = [...state.cart];
                    newCart[existingItemIndex].quantity -= 1;
                    return { cart: newCart };
                }
                return { cart: state.cart };  // return current state if condition is not met
            }),
        }),

        {
            name: 'cart-storage', // unique name
        })
);


export default useStore;