import { db } from "@/lib/db"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const accountId = pathname.split('/')[3]
        
        const data = await db.user.findFirst({
            where: {
                id: accountId
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