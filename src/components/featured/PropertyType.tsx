"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import {PropertyTypesArray} from "../../utils/data.js"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PropertyTypes = () => {

    const router = useRouter()

    return (
        <div className="w-full p-w flex flex-col gap-1 sm:gap-2 py-2">
        <h1 className="text-xl font-semibold sm:font-bold">Browse by property type</h1>
        {<Carousel>
            <CarouselContent className="-ml-1 h-56 xs:h-44">
                {PropertyTypesArray.map((item, index) => {
                    return (
                        <CarouselItem className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1 overflow-hidden xs:rounded-md" key={index}>
                        <div className="w-full h-full xs:rounded-md p-1 relative z-10 " 
                        onClick={() => router.push(`/accomodations?propertyType=${item.value}`)}>
                            <Image src={item.image} fill alt={item.title} className="rounded-sm xs:rounded-md z-20
                            hover:scale-105 transition duration-500 cursor-pointer object-fill"/>
                            <h1 className="text-xl xs:text-lg text-white font-semibold 
                            z-30 absolute top-1 left-2">{item.title}</h1>
                        </div>
                    </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
    </Carousel>}
    </div>
    )
}

export default PropertyTypes