import { ListPropertyValidator } from "@/lib/validators/list"

export const POST = async (req: Request) => {
    try {
        const body = await req.json()

        const {images, country, city, bedrooms, bathrooms, rooms, price, propertyType, landscapeType, name,
            pets, airConditioning, kitchen, freeWiFi, noSmoking, heating} = ListPropertyValidator.parse(body)
        
            console.log(body)
        return new Response(JSON.stringify('OK'), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}