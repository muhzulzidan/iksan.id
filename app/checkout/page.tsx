// app/template/[slug]/page.tsx

import Checkout from './checkoutClient';
import { getUser } from '@/lib/getUser';

async function checkoutPage() {
    const user = await getUser()

    // console.log(user, "user check out page");

    return <Checkout userData={user} />;
}

export default checkoutPage;

