import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { isToday, startOfDay } from "date-fns";
import { getServerSession } from "next-auth";

export const GET = async (req: Request) => {
    try {
        /*const session = await getServerSession(authOptions)

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401})
        }*/

        const {searchParams} = new URL(req.url)

       let queryParamsObject: any = {};
            searchParams.forEach((value, key) => {
                let tempValue: string | boolean = value;


            queryParamsObject[key] = tempValue;

        });

        const bookings = await db.booking.findMany({
            where: queryParamsObject,
            orderBy: {
                checkInDate: 'desc'
            }
        })

        const pendingBookings = bookings.filter(booking => booking.status === 'PENDING');
        const inProcessBookings = bookings.filter(booking => booking.status === 'IN_PROCESS');
        const completedBookings = bookings.filter(booking => booking.status === 'COMPLETED');

        return new Response(JSON.stringify({ pendingBookings, inProcessBookings, completedBookings }), { status: 200 });

    } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 400 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401})
        }

        const body = await req.json()

        const bookingToUpdate = await db.booking.findFirst({
            where: {
                id: body.id
            }
        })

        if(!bookingToUpdate) {
            return new Response(JSON.stringify('Not found!'), { status: 404})            
        }
 
        if(bookingToUpdate?.hostId !== session.user.id) {
            return new Response(JSON.stringify('Unauthorized!'), { status: 401})
        }

        const updatedBooking = await db.booking.update({
            where: {
                id: body.id
            }, 
            data: {
                status: body.status
            }
        })

        return new Response(JSON.stringify(updatedBooking), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 });
    }
}