"use client"

import { BookingStatus } from "@prisma/client"
import { format } from "date-fns"
import { ChevronDown, Edit2, Trash } from "lucide-react"
import { useSession } from "next-auth/react"

interface BookingProps {
    checkInDate: Date
    checkOutDate: Date
    hostId: string
    status: BookingStatus
    location: string
    propertyName: string
}

const Booking = ({checkInDate, checkOutDate, hostId, status, location, propertyName}: BookingProps) => {

    const session = useSession()
    
    return <div className="bg-gray-100 shadow sm:rounded-sm p-2 gap-4">
        <div className="w-full flex justify-between items-center">
            <p>{location}</p>
            <p>{propertyName}</p>
        </div>
        <div className="w-full flex justify-between items-center text-sm xs:text-md md:text-sm lg:text-md">
            <p >{format(checkInDate, 'PPP')}</p>
            <span className="text-lg font-bold">-</span>
            <p >{format(checkOutDate, 'PPP')}</p>
        </div>
        {session.data?.user.id === hostId && <div className="w-full flex justify-between items-center gap-2">
            <button className="flex-1 bg-blue-400 text-white text-center p-1 flex justify-between shadow-sm hover:bg-blue-500">
                {status} 
                <ChevronDown />
            </button>
        </div>}
    </div>
}

export default Booking