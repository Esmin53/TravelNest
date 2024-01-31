import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
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

        return new Response(JSON.stringify(bookings), {status: 200})

    } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 400 })
    }
}