import { db } from "@/lib/db";

export const GET = async () => {
    try {
        const favouriteProperties = await db.property.findMany({
            orderBy: {
              bookings: {
                _count: 'desc'
              }
            },
            take: 20,
            select: {
                id: true,
                name: true,
                location: true,
                propertyType: true,
                images: true
            }
          });

          const popularDestinations = await db.booking.groupBy({
            by: ['location'],
            _count: {
              location: true,
            },
            orderBy: {
              _count: {
                location: 'desc',
              },
            },
            take: 6,
          });

          const trendingDestinations: string[] = popularDestinations.map((item) => item.location)  

          return new Response(JSON.stringify({favouriteProperties, trendingDestinations}), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify('Generic server error'))
    }
}