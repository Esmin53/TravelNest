"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"


const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean >(false)

    return (
        <div className="w-full flex justify-center border-b border-gray-200 shadow-sm">
            <div className="w-full max-w-7xl h-14 md:h-20 flex items-center justify-between px-2">
                <h1 className="text-xl font-bold">TravelNest</h1>
                <ul className="hidden sm:flex h-full flex-1 justify-center items-center gap-4 md:gap-6 text-gray-400 text-md 
                md:text-lg">
                    <li className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 px-2">Home</li>
                    <li className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 px-2">About Us</li>
                    <li className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 px-2">Blog</li>
                    <li className="cursor-pointer rounded-sm hover:bg-gray-50 py-1 px-2">Favourites</li>
                </ul>
                <div className="hidden sm:flex gap-2 items-center">
                    <button className="text-sm text-gray-600 border-r px-2 hover:mb-1">List your property</button>
                    <button className="text-sm text-blue-500 px-4 py-2 md:py-3 rounded-sm hover:bg-blue-500 hover:text-white">Sign In</button>
                    <button className="text-sm text-blue-500 px-4 py-2 md:py-3 border border-blue-500 rounded-md
                    hover:text-white hover:bg-blue-500">Create Account</button>
                </div>
                <div className="flex flex-col sm:hidden justify-center items-center cursor-pointer gap-1"
                onClick={() => setIsOpen(prev => !prev)}>
                    <div className="w-6 h-0 border-b-2 border-gray-500"></div>
                    <div className="w-6 h-0 border-b-2 border-gray-600"></div>
                    <div className="w-6 h-0 border-b-2 border-gray-600"></div>
                </div>
                {isOpen ? <div className="fixed top-0 right-0 max-w-xl w-screen h-screen bg-white-50 z-40 flex flex-col bg-gray-50">
                    <div className="flex justify-between h-14 md:h-20 px-2 items-center border-b border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold">TravelNest</h2>
                        <span onClick={() => setIsOpen(false)}>
                            <ArrowRight className="w-7 h-7"/>
                        </span>
                    </div>
                    <ul className="flex flex-col pl-6 gap-4 text-xl py-4 text-gray-400">
                        <li className="">Home</li>
                        <li className="">About Us</li>
                        <li className="">Blog</li>
                        <li className="">Favourites</li>
                        <li>List your property</li>
                        <li>Sign In</li>
                        <li>Create Account</li>
                    </ul>
                </div> : null}
            </div>
        </div>
    )
}

export default Navbar