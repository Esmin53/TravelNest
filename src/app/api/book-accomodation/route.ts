import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
import { BookPropertyValidator } from "@/lib/validators/book";
import { BookingStatus } from "@prisma/client";
import { isToday } from "date-fns";
import { getServerSession } from "next-auth"

export const POST = async (req: Request) => {
    try {
        
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401})
        }

        const body = await req.json()

        const {checkInDate, checkOutDate, nights, price, hostId, propertyId} = BookPropertyValidator.parse(body);
        let status: BookingStatus = 'PENDING'

        if(isToday(checkInDate)) {
            status = 'IN_PROCESS'
        }

        if(hostId === session.user.id) {
            return new Response(JSON.stringify('Can not book your own property'), { status: 400 })            
        }

        const alreadyBooked = await db.booking.findFirst({
            where: {
                checkInDate,
                checkOutDate,
                propertyId,
                customerId: session.user.id
            }
        })

        if(alreadyBooked) {
            return new Response(JSON.stringify('You already booked here at the same times'), { status: 400 })
        }

        const booking = await db.booking.create({
            data: {
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                nights,
                price,
                hostId,
                propertyId,
                customerId: session.user.id,
                status
            }
        })

        return new Response(JSON.stringify(booking), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}