import { db } from "@/lib/db";

export const GET = async () => {
    try {
        const result = await db.$transaction([
            db.property.findMany({
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
              }),
              db.booking.groupBy({
                by: ['location'],
                _count: {
                  location: true,
                },
                orderBy: {
                  _count: {
                    location: 'desc',
                  },
                } as const,
                take: 6,
              }),
              db.property.findMany({
                orderBy: [
                    {
                      avgRating: 'desc',
                    },
                    {
                      numReviews: 'desc',
                    },
                  ],
                  take: 9,
                  select: {
                    id: true,
                    name: true,
                    location: true,
                    images: true,
                    avgRating: true,
                    numReviews: true
                  }
              })
        ])

          return new Response(JSON.stringify({favouriteProperties: result[0], 
            trendingDestinations: result[1].map(item => item.location), 
            topRatedProperties: result[2]}), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}