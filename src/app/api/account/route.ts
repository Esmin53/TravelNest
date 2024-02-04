import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401})
        }

        const data = await db.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                property: true
            }
        })

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error))
    }
}