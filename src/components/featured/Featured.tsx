import { Ghost } from "lucide-react";
import PropertyTypes from "./PropertyType"
import Image from "next/image";
import Link from "next/link";

const Featured = async ({data}: {data: string[]}) => {
   
    return (
        <div className="w-full max-w-7xl gap-6 flex flex-col p-2">
            <div className="w-full p-w flex flex-col gap-2">
                 <h1 className="text-xl font-bold">Trending Destinations</h1>
                 <p className="text-gray-500">Most popular choices for travelers worldwide</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {data?.map((item, index) => {
                        return <Link href={`/accomodations?location=${item}&`} key={index} className="h-28 xs:h-40 sm:h-52 md:h-60 rounded-md p-2 relative overflow-hidden">
                        <p className="shadow-sm text-sm sm:text-md font-semibold bg-gray-50 rounded-sm px-2 py-1 
                        text-gray-900 absolute top-2 left-2 z-20">{item}</p>
                        <Image src={`/featured/visited${index + 1}.jpg`} fill alt="Visited location image" className="object-cover md:object-fill"/>
                    </Link>
                    })}
                 </div>
                 {!data.length && <div className="w-full flex flex-col justify-center items-center relative">
                        <Ghost className="w-28 h-28 text-gray-300 animate-bounce duration-1000"/>
                        <p className=" text-gray-300 text-sm text-center"> 
                            No Sign of Accomodations Around Here!
                        </p>
                        <span className="text-lg font-semibold text-gray-300">
                            Data Ghost Town:
                        </span>
                    </div>}
            </div>
            <PropertyTypes /> 

        </div>
    )
}

export default Featured