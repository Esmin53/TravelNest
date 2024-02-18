import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        };   

        let bookingsMap = new Map();
        let rankingsMap = new Map();

        const result = await db.$transaction([
            db.property.findMany({
                where: {
                    hostId: session.user.id
                },
                include: {
                    user: true
                },
                orderBy: {
                    avgRating: 'desc'
                }
            }),
            db.booking.findMany({
                where: {
                    hostId: session.user.id
                },
                include: {
                    property: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            })
        ])

        let bestRated = {
            property: result[0][0]?.name,
            rating: result[0][0]?.avgRating
        }

        if(!result[1].length || !result[0].length) {
            const monthName = format(new Date(), 'MMMM');
            bookingsMap.set(monthName, {
                revenue: 0,
                bookings: 0,
                nights: 0,
                upcomingBookings: 0
            })
            rankingsMap.set('no_data', {
                property: 0,
                revenue: 0,
                bookings: 0,
                incomingRevenue: 0 
            })
        } else {
            for await (const item of result[1]) {
                const monthName = format(item.checkInDate, 'MMMM');
                const existingBookings = await bookingsMap.get(monthName) || { revenue: 0, bookings: 0, nights: 0, upcomingBookings: 0 };
                bookingsMap.set(monthName, {
                    revenue: existingBookings.revenue + item.price,
                    bookings: existingBookings.bookings + 1,
                    nights: existingBookings.nights + item.nights,
                    upcomingBookings: item.status === 'PENDING' ? existingBookings.upcomingBookings + 1 : existingBookings.upcomingBookings + 0
                });
    
                const existingRanking = await rankingsMap.get(item.property.id) || { property: item.property.name, revenue: 0,
                     bookings: 0, incomingRevenue: 0}
                    rankingsMap.set(item.property.id, {
                    property: item.property.name,
                    revenue: existingRanking.revenue + item.price,
                    bookings: existingRanking.bookings + 1,
                    incomingRevenue: item.status === 'PENDING' ? existingRanking.incomingRevenue + item.price : existingRanking.incomingRevenue 
                })
            }
        }

        const bookingsMapObject = Object.fromEntries([...bookingsMap]);
        const rankingsArray = Array.from(rankingsMap.values())

        return new Response(JSON.stringify({property: result[0], bookings: bookingsMapObject, rankings: rankingsArray, bestRated}));
    } catch (error) {
        console.log("Error: ", error);
        return new Response(JSON.stringify('Generic server error!'), { status: 500 });
    }
}