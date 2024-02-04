import { db } from "@/lib/db";
import PropertyTypes from "./PropertyType"
import Image from "next/image";
import Link from "next/link";

const Featured = async () => {
    const sixMostCommonLocations = await db.property.groupBy({
        by: ['location'],
        _count: {
          location: true,
        },
        orderBy: {
          _count: {
            location: 'desc',
          },
        },
        take: 6,
      });
      
    
    return (
        <div className="w-full max-w-7xl gap-6 flex flex-col p-2">
            <div className="w-full p-w flex flex-col gap-2">
                 <h1 className="text-xl font-bold">Trending Destinations</h1>
                 <p className="text-gray-500">Most popular choices for travelers worldwide</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {sixMostCommonLocations?.map((item, index) => {
                        return <Link href={`/accomodations?location=${item.location}&`} key={index} className="h-28 xs:h-40 sm:h-52 md:h-60 rounded-md p-2 relative overflow-hidden">
                        <p className="shadow-sm text-sm sm:text-md font-semibold bg-gray-50 rounded-sm px-2 py-1 
                        text-gray-900 absolute top-2 left-2 z-20">{item.location}</p>
                        <Image src={`/featured/visited${index + 1}.jpg`} fill alt="Visited location image" className="object-cover md:object-fill"/>
                    </Link>
                    })}
                 </div>
            </div>
            <PropertyTypes /> 

        </div>
    )
}

export default Featured