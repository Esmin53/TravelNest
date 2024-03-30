import AccountInfo from "@/components/AccountInfo";
import AccountProperties from "@/components/AccountProperties";
import Bookings from "@/components/Bookings";
import { authOptions } from "@/lib/auth";
import { Property, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headers } from 'next/headers'


const MyProfile = async () => {
    
    const session = await getServerSession(authOptions)

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account`, {
        headers: headers()
    })

    const data: User & {property: Property[]} = await response.json()

    if(!session) {
        window.location.href = '/'
    }

    return (
        <div className="w-full p-2 space-y-4">
            <AccountInfo id={session?.user.id!} />
            <div className="w-full">
                <Bookings id={session?.user.id!} />
            </div>
            <div className="w-full">
                <h1 className="text-xl font-bold">My Properties</h1>
                <p className="text-gray-500">All properties listed by {session?.user.name}</p>
                <AccountProperties  properties={data.property} />
            </div>
        </div>
    )
}

export default MyProfile;