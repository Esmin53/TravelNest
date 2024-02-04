import { Booking as BookingType } from "@prisma/client"
import Booking from "./Booking"
import { Ghost } from "lucide-react"


const Bookings = async ({id}: {
    id: string
}) => {

    const response = await fetch(`http://localhost:3000/api/bookings?guestId=${id}`, {cache: 'no-store'})

    const data = await response.json()


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-2">
            {data && data.length ? data.map((booking: BookingType) => {
                return <Booking {...booking}/>
            }) : <div className="flex flex-col items-center py-6">
                    <Ghost className="w-10 h-10 text-gray-300" />
                    <p className="sm:text-lg font-semibold text-gray-400">You have no bookings so far</p>
                </div>}
        </div>
    )
}

export default Bookings