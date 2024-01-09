"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import UserAvatar from "./UserAvatar"
import BurgerIcon from "./BurgerIcon"
import Link from "next/link"


const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean >(false)

    const {data: session} = useSession()

    return (
        <div className="w-full flex justify-center border-b border-gray-200 shadow-sm">
            <div className="w-full max-w-6xl h-14 md:h-20 flex items-center justify-between px-2">
                <h1 className="text-xl font-bold">TravelNest</h1>
                <ul className="hidden sm:flex h-full flex-1 justify-center items-center gap-4 md:gap-6 text-gray-400 text-sm 
                md:text-lg">
                    <Link href="/" className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 md:px-2">Home</Link>
                    <Link href="/about-us" className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 md:px-2">About Us</Link>
                    <Link href="/blog" className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 md:px-2">Blog</Link>
                    <Link href="/favourites" className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 md:px-2">Favourites</Link>
                </ul>
                <div className="hidden sm:flex gap-2 items-center">
                    <Link href='/join-us' className="text-sm text-gray-600 border-r px-2 hover:mb-1">List your property</Link>
                    {   session ?
                        <Popover>
                            <PopoverTrigger className="py-0.5 px-1 rounded-2xl border border-gray-400 h-8 flex items-center">
                                <div className="w-6 h-full rounded-full relative shadow">
                                    {session?.user?.image ? <UserAvatar image={session.user.image} /> : null}
                                </div>
                                <ChevronDown className="text-gray-500" />
                            </PopoverTrigger>
                            <PopoverContent className="flex w-40 p-1 border-gray-400 -mt-2 flex-col">
                                <p className="text-sm text-gray-500 font-semibold">{session.user.name}</p>
                                <hr className="h-0 border-b border-gray-200 shadow-sm my-1" />
                                <div className="py-1 px-1 w-full rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => signOut({redirect: true, callbackUrl: 'http://localhost:3000'})}>Sign Out</div>
                            </PopoverContent>
                        </Popover>
                        :
                        <div className="flex gap-2 items-center">
                            <Link href='/sign-in' className="text-sm text-blue-500 px-4 py-2 md:py-3 rounded-sm hover:bg-blue-500 hover:text-white">Sign In</Link>
                            <Link href='/signin' className="text-sm text-blue-500 px-4 py-2 md:py-3 border border-blue-500 rounded-md
                          hover:text-white hover:bg-blue-500">Create Account</Link>
                        </div>
                    }
                </div>
                <span onClick={() => setIsOpen(prev => !prev)}>
                    <BurgerIcon />
                </span>
                {isOpen ? <div className="fixed top-0 right-0 max-w-xl w-screen h-screen bg-white-50 z-40 flex flex-col bg-gray-50">
                    <div className="flex justify-between h-14 md:h-20 px-2 items-center border-b border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold">TravelNest</h2>
                        <span onClick={() => setIsOpen(false)}>
                            <ArrowRight className="w-7 h-7"/>
                        </span>
                    </div>
                    <ul className="flex flex-col pl-6 gap-4 text-xl py-4 text-gray-400">
                        <Link href="/" className="">Home</Link>
                        <Link href="/about-us" className="">About Us</Link>
                        <Link href="/blog" className="">Blog</Link>
                        <Link href="/favourites" className="">Favourites</Link>
                        <Link href="/join-us">List your property</Link>
                        {
                            session?.user ?
                                <div onClick={() => signOut({redirect: true, callbackUrl: 'http://localhost:3000'})}>Sign Out</div>                            
                             :
                                <>
                                    <Link href="/sign-in">Sign In</Link>
                                    <Link href="/sign-in">Create Account</Link>       
                                </>
                        }
                    </ul>
                </div> : null}
            </div>
        </div>
    )
}

export default Navbar