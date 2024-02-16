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

export const PUT = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized'), { status: 401})
        }

        const user = await db.user.findFirst({
            where: {
                id: session?.user.id
            }
        })

        if(!user) {
            return new Response(JSON.stringify('Not found'), { status: 400 })
        }

        const body = await req.json();

        console.log(body)

        const newData = await db.user.update({
            where: {
                id: session.user.id
            },
            data: body
        })

        return new Response(JSON.stringify(newData), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error))
    }
}