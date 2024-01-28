import { db } from "@/lib/db"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const accomodationId = pathname.split('/')[3]

        const accomodation = await db.property.findFirst({
            where: {
                id: accomodationId
            },
            include: {
                user: true,
                bookings: true
            }
        })

        if(!accomodation) {
            return new Response(JSON.stringify('Not Found'), { status: 404 })
        }

        return new Response(JSON.stringify(accomodation), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}