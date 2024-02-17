import { Property } from "@prisma/client"
import { Bath, Bed, Cog, Sofa } from "lucide-react"
import Image from "next/image"
import PreviewCarousel from "./PreviewCarousel"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


const Accomodation = async ({images, name, country, location, propertyType, bedrooms, bathrooms, rooms, price, id, hostId}: Property) => {
    const session = await getServerSession(authOptions)

    return (
        <div className="w-full overflow-hidden z-20 flex flex-col justify-center items-center relative">
            {session?.user.id === hostId && <Link href={`/manage/${id}`} className="absolute top-3 right-4 z-40 rounded-sm shadow-sm bg-slate-50">
                <Cog className="w-8 h-8 text-gray-900 hover:animate-spin hover:duration-1000"/>    
            </Link>}
            <div className="w-full h-60 xs:h-72 relative rounded-md overflow-hidden">
                <PreviewCarousel images={images}/>
            </div>
            <Link href={`/accomodations/${id}`} className="w-full overflow-hidden z-20 p-2">
            <div className="flex justify-between items-center py-1 px-2">
                <div className="flex gap-1 text-lg">
                    {bedrooms}
                    <Bed />
                </div>
                <div className="flex gap-1 text-lg">
                    {bathrooms}
                    <Bath />
                </div>
                <div className="flex gap-1 text-lg">
                    {rooms}
                    <Sofa />
                </div>
            </div>
            <h1 className="font-semibold xs:text-md text-sm">{name}, {country}</h1>
            <div className="w-full flex justify-between">
                <p className="text-gray-700 xs:text-md text-sm">{location}</p>
                <p className="text-gray-700 font-semibold xs:text-md text-sm">{propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}</p>            
            </div>
            <p className="text-gray-900 xs:text-md text-sm">{price}$ <span className="text-gray-600">per night</span></p>

        </Link>
        </div>
    )
}

export default Accomodation