import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { ListPropertyRequest, ListPropertyValidator } from "@/lib/validators/list"
import { getDownloadURL } from "firebase/storage"
import { getServerSession } from "next-auth"

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        
        console.log("SESSION: ", session)

        if(!session?.user || !session) {
            return new Response('Unauthorized!', { status: 401 })
        }

        const body = await req.json()

        const formData: ListPropertyRequest = ListPropertyValidator.parse(body)
        
        const listing = await db.property.create({
            data: {
                ...body,
                hostId: session.user.id
            }
        })

        

        return new Response(JSON.stringify(listing.id), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}