// app/template/[slug]/page.tsx

import Checkout from './checkoutClient';
import { getUser } from '@/lib/getUser';
import { redirect } from 'next/navigation'

async function checkoutPage() {
    // const router = useRouter();

    try {
        const user = await getUser();
        if (!user) {
            redirect('/sign-in'); // Redirect to sign-in page if user is not authenticated
            return null;
        }
        return <Checkout userData={user} />;
    } catch (error) {
        redirect('/sign-in'); 
        console.error('Error in checkoutPage:', error);
        // Handle the error appropriately, e.g., show an error message or redirect
        return <div>Error loading checkout page. Please try again later.</div>;
    }
}

export default checkoutPage;