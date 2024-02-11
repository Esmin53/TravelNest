import { Booking as BookingType } from "@prisma/client"
import Booking from "./Booking"
import { Ghost } from "lucide-react"


const Bookings = async ({id}: {
    id: string
}) => {

    const response = await fetch(`http://localhost:3000/api/bookings?guestId=${id}`, {cache: 'no-store'})

    const data = await response.json()

    console.log("DATA-> ",data)
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Bookings in Process</h1>
                 <p className="text-gray-500">Here are all the bookings that are currently in process:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.inProcessBookings?.length ? data.inProcessBookings.map((booking: BookingType) => {
                        return <Booking {...booking} />
                    }) : <div className="flex flex-col w-full items-center py-2">
                            <Ghost className="w-12 h-12 text-gray-400"/>
                            <h2 className="text-lg text-gray-400 text-center">You have no bookings that are currently in process</h2>
                        </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Pending bookings</h1>
                 <p className="text-gray-500">Here are all your upcoming stays:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.pendingBookings?.length ? data.pendingBookings.map((booking: BookingType) => {
                        return <Booking {...booking} />
                    }) : <div className="flex flex-col w-full items-center py-2">
                            <Ghost className="w-12 h-12 text-gray-400"/>
                            <h2 className="text-lg text-gray-400 text-center">You have no upcoming check-ins</h2>
                        </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Completed bookings</h1>
                 <p className="text-gray-500">Here are all your previous bookings</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.completedBookings?.length ? data.completedBookings.map((booking: BookingType) => {
                        return <Booking {...booking} />
                    }) : <div className="flex flex-col w-full items-center py-2">
                            <Ghost className="w-12 h-12 text-gray-400"/>
                            <h2 className="text-lg text-gray-400 text-center">You have no previous bookings</h2>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Bookings