import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

export const PUT = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const propertyId = pathname.split('/')[3]

        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify('Unauthorized!'), { status: 401 })
        }

        const body = await req.json()

        const updatedProperty = await db.$transaction(async (prisma) => {
            
            const property = await prisma.property.findUnique({
                where: {
                    id: propertyId
                }
            });
        
            if (!property || property.hostId !== session.user.id) {
                throw new Error('Unauthorized!');
            }
        
            return prisma.property.update({
                where: {
                    id: propertyId
                },
                data: body
            });
        });
        

        return new Response(JSON.stringify(updatedProperty), { status: 200 })
        
    } catch (error) {
        console.log("Error: ", error)
        return new Response(JSON.stringify('Internal server error'), { status: 500 })
    }
}