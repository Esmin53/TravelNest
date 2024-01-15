"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

const UserInfo = () => {
    const session = useSession()

    if(!session) {
        return <div className="w-full h-26 animate-pulse">

        </div>
    }

    return (
        <div className="w-full flex gap-2 bg-slate-50 rounded-md p-2 items-center">
            <div className="relative w-10 h-10 xs:h-16 xs:w-16 md:h-24 md:w-24 rounded-md">
                {session.data?.user.image && <Image src={session.data?.user.image} fill alt="User avatar" className="rounded-md" />}
            </div>
            <div className="flex flex-col gap-1">
                <p className="xs:text-lg text-gray-800">{session.data?.user.name}</p>
                <p className="text-xs sm:text-sm text-gray-500 sm:font-semibold">{session.data?.user.email}</p>
            </div>
        </div>
    )
}

export default UserInfo