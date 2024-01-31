import { Booking as BookingType } from "@prisma/client"
import Booking from "./Booking"


const Bookings = async ({id}: {
    id: string
}) => {

    const response = await fetch(`http://localhost:3000/api/bookings?customerId=${id}`)

    const data = await response.json()


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-2">
            {data && data.map((booking: BookingType) => {
                return <Booking {...booking}/>
            })}
        </div>
    )
}

export default Bookings