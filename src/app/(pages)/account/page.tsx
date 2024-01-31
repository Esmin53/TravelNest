import AccountInfo from "@/components/AccountInfo";
import AccountProperties from "@/components/AccountProperties";
import Bookings from "@/components/Bookings";
import { authOptions } from "@/lib/auth";
import { Property, User } from "@prisma/client";
import { getServerSession } from "next-auth";


const MyProfile = async () => {
    
    const session = await getServerSession(authOptions)

    const response = await fetch(`http://localhost:3000/api/account/${session?.user.id}`)

    const data: User & {property: Property[]} = await response.json()

    if(!session) {
        window.location.href = '/'
    }

    return (
        <div className="w-full p-2 space-y-4">
            <AccountInfo name={session?.user.name!} email={session?.user.email!} image={session?.user.image!} />
            <div className="w-full">
                <h1 className="text-xl font-bold">My Bookings</h1>
                <p className="text-gray-500">Here are all your incoming bookings {session?.user.name}</p>
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