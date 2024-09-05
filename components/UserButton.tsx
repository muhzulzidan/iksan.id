'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowPathIcon,
    ArrowRightCircleIcon,
    ArrowRightEndOnRectangleIcon,
    CurrencyDollarIcon,
    UserIcon,
    CogIcon,
    ShieldCheckIcon,
    ArrowDownCircleIcon,
} from '@heroicons/react/24/solid'
import { Button } from './ui/button'
import { UserCircleIcon } from 'lucide-react'
import { ClockHistory } from 'react-bootstrap-icons'


// Create a new UserButtonandMenu component and move the old return into this
const UserButtonAndMenu = () => {
    const { user } = useUser()
    const { signOut, openUserProfile } = useClerk()
    const router = useRouter()
    const label = user?.firstName ? user.firstName : 'Profile'
    const fullname = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Profile'
    const email = user?.emailAddresses ? `${user.emailAddresses}` : 'Email Addresses'

    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild className="outline-none  ">
                {/* <Button variant="accent" className="min-w-[192px]"> */}

                <div className='flex items-center justify-center rounded-full w-12 h-auto cursor-pointer hover:opacity-80 '>
                    {user?.hasImage ? (
                        <Image
                            alt={label ? label : 'Profile image'}
                            src={user?.imageUrl}
                            width={30}
                            height={30}
                            className="border-stone-950 mr-2 rounded-full border drop-shadow-sm hover:border-blue-700 hover:border-2 w-full h-full"
                        />
                    ) : (
                        <UserIcon className="mr-2 h-6 w-auto" />
                    )}
                    {/* {label} */}
                </div>

                {/* </Button> */}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="mt-4 w-[20rem]  rounded-xl border border-gray-200 bg-white py-6 text-black drop-shadow-2xl absolute -right-4 -top-4 ">
                    <DropdownMenu.Label />
                    <DropdownMenu.Group className="">
                        <DropdownMenu.Item asChild className="outline-none">
                            <div className='flex gap-2 px-10 py-4'>
                                <div className='flex items-center justify-center rounded-full w-12 h-12 cursor-pointer  '>
                                    {user?.hasImage ? (
                                        <Image
                                            alt={label ? label : 'Profile image'}
                                            src={user?.imageUrl}
                                            width={30}
                                            height={30}
                                            className="border-stone-950 mr-2 rounded-full border drop-shadow-sm w-full h-full"
                                        />
                                    ) : (
                                        <UserIcon className="mr-2 h-6 w-auto" />
                                    )}
                                </div>
                                <div className='flex flex-col text-xs text-stone-500'>
                                    <p className='text-sm text-stone-950'>
                                        {fullname}
                                    </p>
                                    <p>
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-4 " />
                        {/* <DropdownMenu.Item asChild className="outline-none px-8 ">
                            <Button onClick={() => openUserProfile()} className='w-full justify-start outline-none ring-0' variant={"ghost"} >
                                <UserIcon className="mr-2 h-6 w-auto" />
                                Profile
                            </Button>
                        </DropdownMenu.Item> */}
                        <DropdownMenu.Item asChild className="outline-none">
                            <Link href="/my-account" passHref>
                                <Button className='w-full justify-start  px-8' variant={"ghost"}>
                                    <UserCircleIcon className="mr-2 h-6 w-auto" />
                                    Profile
                                </Button>
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild className="outline-none">
                            <Link href="/my-account/download" passHref>
                                <Button className='w-full justify-start  px-8' variant={"ghost"}>
                                    <ArrowDownCircleIcon className="mr-2 h-6 w-auto" />
                                    Download
                                </Button>
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild className="outline-none">
                            <Link href="/my-account/history" passHref>
                                <Button className='w-full justify-start  px-8' variant={"ghost"}>
                                    <ClockHistory className="mr-2 h-6 w-auto" />
                                    History
                                </Button>
                            </Link>
                        </DropdownMenu.Item>
                        {/* <DropdownMenu.Item asChild className="outline-none">
                            <Link href="/admin" passHref>
                                <Button className='w-full justify-start  px-8' variant={"ghost"}>
                                    <ShieldCheckIcon className="mr-2 h-6 w-auto" />
                                    Admin
                                </Button>
                            </Link>
                        </DropdownMenu.Item> */}
                    </DropdownMenu.Group>
                    <DropdownMenu.Separator className="my-4" />
                    <DropdownMenu.Item asChild className="outline-none px-8">
                        <Button onClick={() => signOut(() => router.push('/'))} className='w-full justify-start' variant={"ghost"} >
                            <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-auto" /> Sign Out
                        </Button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}


interface UserButtonProps {
    path?: string;
}
export const UserButton: React.FC<UserButtonProps> = ({ path }) => {
    const { isLoaded, user } = useUser();
    const { openSignIn } = useClerk();

    if (!isLoaded)
        return (
            <Button onClick={() => openSignIn()} className="w-48">
                <ArrowPathIcon className="ml-2 h-6 w-auto animate-spin" />
            </Button>
        );

    if (!user?.id)
        return (
            <Button
                type="button"
                onClick={() =>
                    openSignIn({
                        afterSignInUrl: path,
                    })
                }
                variant={"outline"}
                className="border-stone-700 hover:bg-secondary2 hover:border-secondary2 bg-stone-100 hover:text-stone-50"
            >
                Sign In
            </Button>
        );

    return <UserButtonAndMenu />;
};