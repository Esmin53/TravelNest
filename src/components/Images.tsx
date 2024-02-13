'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"


const Images = ({images}: {images: string[]}) => {

    return (
        <Carousel className="w-full h-full">
        <CarouselContent className="-ml-2 w-full h-52 xs:h-64 md:h-80 lg:h-96">
            {images.map((item, index) => {
                return (
                    <CarouselItem className="pl-2  md:basis-1/2 h-full p-1 overflow-hidden" key={index}>
                    <div className="w-full h-full xs:rounded-md p-1 relative z-10 ">
                        <Image src={item} fill alt={item} className="rounded-sm xs:rounded-md z-20
                         transition duration-500 cursor-pointer xs:object-fill"/>
                    </div>
                </CarouselItem>
                )
            })}
        </CarouselContent>
        <CarouselPrevious className="ml-8 xl:w-9 xl:h-9 z-30"/>
        <CarouselNext className="mr-10 xl:w-9 xl:h-9 z-30"/>
</Carousel>
    )
}

export default Images