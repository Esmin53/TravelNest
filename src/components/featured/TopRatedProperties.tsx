import { Property } from "@prisma/client"
import { Ghost, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const TopRatedProperties = ({data}: {
    data: Pick<Property, 'id' | 'name' | 'location' | 'country' | 'images' | 'avgRating' | 'numReviews' >[]
}) => {

    return (
            <div className="max-w-7xl w-full flex flex-col gap-2 p-4">
                <div className="w-full py-2 flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Guest favourite accomodations</h1>
                    <p className="text-gray-500">Best rated and reviewed accomodations by our users</p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-y-4">
                        {data.map((item) => {
                            return (
                                <Link href={`/accomodations/${item.id}`} className="rounded-sm sm:rounded-md relative overflow-hidden gap-2 shadow-lg" key={item.id}>
                                <div className="w-full h-64 xs:h-52 sm:h-64 relative">
                                    <Image fill alt="Fav accomodation cover" src={item.images[0]}/>
                                </div>
                                <div className="w-full p-2">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-gray-600 text-sm">{item.location}, {item.country}</p>
                                    <div className="flex w-full justify-between items-center">
                                        <p className="flex"><Star className="w-5 h-5 text-yellow-400"/> {item.avgRating}</p>
                                        <p>{item.numReviews} reviews</p>
                                    </div>
                                </div>
                            </Link>
                            )
                        })}

                    </div>
                    { !data?.length ? <div className="w-full flex flex-col justify-center items-center relative py-4">
                        <Ghost className="w-28 h-28 text-gray-300 duration-1000 motion-safe:animate-bounce"/>
                        <p className=" text-gray-300 text-sm text-center"> 
                            No Sign of Accomodations Around Here!
                        </p>
                        <span className="text-lg font-semibold text-gray-300">
                            Data Ghost Town:
                        </span>
                    </div> : null }
                </div>
            </div>


    )
}

export default TopRatedProperties