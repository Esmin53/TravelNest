"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import {PropertyTypesArray} from "../../app/utils/data.js"
import Image from "next/image"

const PropertyTypes = () => {

    return (
        <div className="w-full p-w flex flex-col gap-2 py-2">
        <h1 className="text-xl font-bold">Browse by property type</h1>
        {<Carousel>
            <CarouselContent className="-ml-1 h-44">
                {PropertyTypesArray.map((item, index) => {
                    return (
                        <CarouselItem className="basis-1/4 p-1 overflow-hidden" key={index}>
                        <div className="w-full h-full rounded-md p-1 relative z-10 overflow-hidden">
                            <Image src={item.image} fill alt={item.title} className="rounded-md z-20
                            hover:scale-110 transition duration-500 cursor-pointer"/>
                            <h1 className="text-lg text-white font-semibold 
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