"use client"

import { Property } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image";
import { useRouter } from "next/navigation";

const FavouriteProperties = ({properties}: {
    properties: Property[]}) => {

    const router = useRouter();

    return (
        <div className="max-w-7xl w-full p-w flex flex-col gap-2 px-2 sm:px-0">
                 <h1 className="text-xl font-bold">Accomodations guests love</h1>
                 <p className="text-gray-500">Most popular accomodations by number of stays</p>
                 <Carousel>
                    <CarouselContent className="-ml-1 h-64 xs:h-72">
                        {properties.map((item) => {
                            return <CarouselItem className="sm:basis-1/2 lg:basis-1/3 p-1 cursor-pointer" key={item.id} 
                            onClick={() => router.push(`/accomodations/${item.id}`)}>
                            <div className="w-full h-full rounded-md overflow-hidden relative">
                                <div className="w-full flex justify-between absolute bottom-2 px-2 z-30 text-lg text-white font-bold">
                                    <p>{item.location}</p>
                                    <p>{item.propertyType.charAt(0).toUpperCase() + item.propertyType.slice(1)}</p>
                                </div>
                                <h2 className="z-30 absolute bottom-8 left-2 text-3xl text-white font-semibold">{item.name}</h2>
                                <Image src={item.images[0]} fill alt="Property image" className="z-10"/>
                            </div>
                        </CarouselItem>
                        })}

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
    )
}

export default FavouriteProperties;