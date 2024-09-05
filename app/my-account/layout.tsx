// File: /app/admin/page.js
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs'; // Update with your actual auth hook
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
import Layout from '@/components/layout';

export const metadata: Metadata = {
    title: "My Account",
    description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/my-account",
    },
    {
        title: "Download",
        href: "/my-account/download",
    },
    {
        title: "History",
        href: "/my-account/history",
    },

]
export default async function AdminPage({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = auth(); // Get the current user's ID
    const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;


    // Check if the current user is not the admin
    // if (userId !== ADMIN_USER_ID) {
    //     // Redirect to home page or another page if not admin
    //     redirect('/');
    // }

    // Render admin page content for the admin user
    return (
        <Layout >
            <div className='flex flex-col gap-4 p-10 pb-16 w-full max-w-screen-lg container mx-auto'>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                  <main className='lg:w-4/5'>  
                    {children}
                    </main>
                </div>
            </div>
       </Layout>
    );
}

