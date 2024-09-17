// pages/member/profile/page.tsx

import ProfilePage from './ProfileClient';
import { getUser } from '@/lib/getUser';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function Profile() {
    const user = await getUser();

    return (
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <ProfilePage userData={user} />
        </Suspense>
    );
}

export default Profile;