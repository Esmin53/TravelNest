import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
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
                bookings: true,
                user: true
            }
        })

        if(property?.hostId !== session.user.id) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401 });
        }
        
        return new Response(JSON.stringify(property), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}