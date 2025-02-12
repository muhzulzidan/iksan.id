// app/template/[slug]/page.tsx

import Checkout from './checkoutClient';
import { getUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';

async function checkoutPage() {
    try {
        const user = await getUser();
        console.log('checkoutPage User:', user);

        // if (!user) {
        //     console.log('User not authenticated, redirecting to sign-in page');
        //     redirect('/sign-in'); // Redirect to sign-in page if user is not authenticated
        //     return null;
        // }

        return <Checkout userData={user} />;
    } catch (error) {
        console.log('Error in checkoutPage:', error);
        console.error('Error in checkoutPage:', error);
        // Handle the error appropriately, e.g., show an error message or redirect
        // redirect('/sign-in');
        return <div>Error loading checkout page. Please try again later.</div>;
    }
}

export default checkoutPage;