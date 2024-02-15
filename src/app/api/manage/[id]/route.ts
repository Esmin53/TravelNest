import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
import { Booking } from "@prisma/client";
import { error } from "console";
import { format, getMonth } from "date-fns";
import { getServerSession } from "next-auth"


export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        };

        const url = new URL(req.url)
        const { pathname } = url

        const propertyId = pathname.split('/')[3];

        const property = await db.property.findFirst({
            where: {
                id: propertyId,
                hostId: session.user.id
            },
            include: {
                user: true,
                reviews: true
            }
        })

        let bookingsMap = new Map()

        const bookings = await db.booking.findMany({
            where: {
                checkInDate: { gte: new Date('2023-01-01') },
                propertyId
            }
        });

        for await (const item of bookings) {
            const monthName = format(item.checkInDate, 'MMMM');
            const existingBookings = await bookingsMap.get(monthName) || { revenue: 0, bookings: 0, nights: 0, upcomingBookings: 0 };
            bookingsMap.set(monthName, {
                revenue: existingBookings.revenue + item.price,
                bookings: existingBookings.bookings + 1,
                nights: existingBookings.nights + item.nights,
                upcomingBookings: item.status === 'PENDING' ? existingBookings.upcomingBookings + 1 : existingBookings.upcomingBookings + 0
            });
        }

        const bookingsMapObject = Object.fromEntries([...bookingsMap]);

        if(property?.hostId !== session.user.id) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        }
        
        return new Response(JSON.stringify({property, bookings: bookingsMapObject}), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}