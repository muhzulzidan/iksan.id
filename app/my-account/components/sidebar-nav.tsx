"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useClerk } from "@clerk/clerk-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut, openUserProfile } = useClerk()
  return (
   <nav>
      <div className="md:hidden">
        <h3 className="bg-secondary1 text-stone-50 p-4 rounded-t-lg">
          My Account
        </h3>
      </div>
      <nav
        className={cn(
          "flex w-full relative  overflow-auto lg:flex-col border border-stone-300 rounded-lg ",
          className
        )}
        {...props}
      >
        <div className="hidden md:block">
          <h3 className="bg-secondary1 text-stone-50 p-4 rounded-t-lg">
            My Account
          </h3>
        </div>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-blue-100  hover:text-stone-600"
                : " hover:bg-secondary1 hover:text-stone-600",
              "justify-start hover:bg-blue-400 hover:text-stone-50 rounded-none"
            )}
          >
            {item.title}
          </Link>
        ))}
        <div>
          <Button onClick={() => signOut(() => router.push('/'))} variant={"ghost"} className="justify-start hover:bg-pink-500 hover:text-stone-50 rounded-none w-full text-primary1">
            Sign Out
          </Button>
        </div>
      </nav>
   </nav>
  )
}
