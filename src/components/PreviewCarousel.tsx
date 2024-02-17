'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const PreviewCarousel = ({images}: {
    images: string[]
}) => {

    return (
        <Carousel className="w-full h-full">
            <CarouselContent className="-ml-1 w-full h-60 xs:h-72">
                {images.map((item, index) => {
                    return (
                        <CarouselItem className="h-72 p-1 overflow-hidden" key={index}>
                        <div className="w-full h-full xs:rounded-md p-1 relative z-10 ">
                            <Image src={item} fill alt={item} className="rounded-sm xs:rounded-md z-20
                             transition duration-500 cursor-pointer xs:object-fill"/>
                        </div>
                    </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className=" -ml-1 z-30"/>
            <CarouselNext className="z-30 mr-1"/>
    </Carousel>
    )
}

export default PreviewCarousel