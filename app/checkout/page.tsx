// app/template/[slug]/page.tsx

import Checkout from './checkoutClient';
import { getUser } from '@/lib/getUser';

async function checkoutPage() {
    try {
        const user = await getUser();
        return <Checkout userData={user} />;
    } catch (error) {
        console.error('Error in checkoutPage:', error);
        // Handle the error appropriately, e.g., show an error message or redirect
        return <div>Error loading checkout page. Please try again later.</div>;
    }
}

export default checkoutPage;