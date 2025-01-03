"use client"

import { ArrowRight, ChevronDown, Cog, FileQuestion, Home, Hotel, LogIn, LogOut, LucideFileBarChart, User, User2, UserPlus } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import UserAvatar from "./UserAvatar"
import BurgerIcon from "./BurgerIcon"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean >(false)
    const [visible, setVisible] = useState(isOpen);
    const sidebarRef = useRef<HTMLDivElement | null>(null)

    const {data: session, status} = useSession()


    useEffect(() => {
        if (isOpen) {
            setVisible(true); 
        } else {
            const timeout = setTimeout(() => setVisible(false), 300); 
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <div className="w-full flex justify-center border-b border-gray-200 shadow-sm">
            <div className="w-full max-w-7xl h-14 md:h-20 flex items-center justify-between px-2">
                <Link href='/' className="text-lg md:text-xl font-semibold sm:font-bold flex gap-1 items-center justify-center text-mainBlue">
                <Image src="/icon.ico" width={24} height={24} alt="Website logo" className="sm:w-7 sm:h-7"/>
                TravelNest</Link>
                <ul className="hidden sm:flex h-full flex-1 justify-center items-center gap-4 md:gap-6 text-gray-400 text-sm 
                md:text-lg">
                    <Link href="/" className="cursor-pointer rounded-sm hover:scale-110 hover:duration-700 hover:ease-in-out py-1 md:px-2">Home</Link>
                    <Link href="/about-us" className="cursor-pointer rounded-sm hover:scale-110 hover:duration-700 hover:ease-in-out py-1 md:px-2">About Us</Link>
                    <Link href="/blog" className="cursor-pointer rounded-sm hover:scale-110 hover:duration-700 hover:ease-in-out py-1 md:px-2">Blog</Link>
                    <Link href="/join-us" className="cursor-pointer rounded-sm hover:scale-110 hover:duration-700 hover:ease-in-out py-1 md:px-2">Join us</Link>
                </ul>
                <div className="hidden sm:flex gap-2 items-center">
                    <Link href='/join-us' className={cn("text-sm text-gray-600 border-r px-2 hover:mb-1 hover:duration-300 hover:ease-in-out", {
                    "hidden lg:block": !session?.user
                    })}>List your property</Link>
                    { status === 'loading' ? <div className="py-0.5 px-1 rounded-2xl border border-gray-400 h-8 flex items-center">
                        <div className="w-6 h-full rounded-full relative">
                            <User2 className="text-gray-500 animate-pulse" />
                        </div>
                        <ChevronDown className="text-gray-500" />
                    </div>
                    : session ?
                        <Popover>
                            <PopoverTrigger className="py-0.5 px-1 rounded-2xl border border-gray-400 h-8 flex items-center">
                                <div className="w-6 h-full rounded-full relative shadow">
                                    {session?.user?.image ? <UserAvatar image={session.user.image} /> : null}
                                </div>
                                <ChevronDown className="text-gray-500" />
                            </PopoverTrigger>
                            <PopoverContent className="flex w-60 p-2 border-gray-400 -mt-1.5 flex-col rounded-sm">
                                <p className="text-gray-800 px-2 text-lg">{session.user.name}</p>
                                <hr className="h-0 border-b border-gray-200 shadow-sm my-1" />
                                <Link href='/account' className="p-2 w-full  hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                                    My profile
                                    <User className="w-5 h-5 text-gray-500"/>
                                </Link>
                                <Link href='/list-my-property' className="p-2 w-full  hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                                    List my property
                                    <Hotel className="w-5 h-5 text-gray-500" />
                                    </Link>
                                <Link href='/manage' className="p-2 w-full  hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                                    Dashboard
                                    <LucideFileBarChart className="w-5 h-5 text-gray-500"/>
                                    </Link>                                
                                <Link href='/settings' className="p-2 w-full  hover:bg-slate-100 cursor-pointer flex items-center justify-between">
                                    Settings
                                    <Cog className="w-5 h-5 text-gray-500"/>
                                    </Link>                                
                                <div className="p-2 w-full hover:bg-slate-100 cursor-pointer flex justify-between items-center"
                                onClick={() => signOut({redirect: true, callbackUrl: 'http://localhost:3000'})}>
                                    Sign Out
                                    <LogOut className="w-5 h-5 text-gray-500" />
                                    </div>
                            </PopoverContent>
                        </Popover>
                        :
                        <div className="flex gap-2 items-center">
                            <Link href='/sign-in' className="text-sm text-mainBlue px-4 py-2 md:py-3 rounded-sm hover:bg-mainBlue hover:text-white hover:duration-500 hover:ease-in-out"
                            >Sign In</Link>
                            <Link href='/sign-in' className="text-sm text-mainBlue px-4 py-2 md:py-3 border border-mainBlue rounded-md
                          hover:text-white hover:bg-mainBlue hover:duration-500 hover:ease-in-out">Create Account</Link>
                        </div>
                    }
                </div>
                <span onClick={() => setIsOpen(prev => !prev)}>
                    <BurgerIcon />
                </span>
                {visible ? <div className={cn("fixed top-0 right-0 max-w-xl w-screen h-screen bg-white-50 z-40 flex flex-col bg-slate-50", {
                    "animate-slide-in": isOpen,
                    "animate-slide-out": !isOpen,
                })}
                        ref={sidebarRef} >
                    <div className="flex justify-between h-14 md:h-20 px-2 items-center border-b border-gray-200 shadow-sm">
                        <Link href='/' className="text-lg md:text-xl font-semibold sm:font-bold flex gap-1 items-center justify-center text-mainBlue">
                            <Image src="/icon.ico" width={24} height={24} alt="Website logo" className="sm:w-7 sm:h-7"/>
                            TravelNest</Link>
                        <span onClick={() => setIsOpen(false)}>
                            <ArrowRight className="w-7 h-7"/>
                        </span>
                    </div>
                    <ul className="flex flex-col p-4 gap-4 text-xl text-gray-400">
                        <Link href="/" className="w-full flex items-center justify-between">Home <Home /></Link>
                        <Link href="/about-us" className="w-full flex items-center justify-between">About Us<FileQuestion /></Link>

                        <Link href="/join-us" className="w-full flex items-center justify-between">List your property <Hotel /></Link>
                        {
                            session?.user ?
                                <>
                                <Link href="/manage" className="w-full flex items-center justify-between">
                                    Dashboard <LucideFileBarChart /></Link> 
                                <Link href="/settings" className="w-full flex items-center justify-between">
                                    Settings <Cog /></Link>
                                <div onClick={() => signOut({redirect: true, callbackUrl: 'http://localhost:3000'})}
                                className="w-full flex items-center justify-between">
                                    Sign Out
                                    <LogOut />
                                    </div> 
                                </>                           
                             :
                                <>
                                    <Link href="/sign-in" className="w-full flex items-center justify-between">Create Account<UserPlus /></Link>       
                                    <Link href="/sign-in" className="w-full flex items-center justify-between">Sign In <LogIn /></Link>                                
                                </>
                        }
                    </ul>
                </div> : null}
            </div>
        </div>
    )
}

export default Navbar