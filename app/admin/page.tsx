// pages/member/profile/page.tsx

import ProfilePage from './ProfileClient';
import { getUser } from '@/lib/getUser';

async function Profile() {
    const user = await getUser()
    
    return <ProfilePage userData={user} />;
}

export default Profile;

