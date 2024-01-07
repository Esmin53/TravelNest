"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import PropertyTypes from "./PropertyType"

const Featured = () => {
    
    return (
        <div className="w-full max-w-6xl gap-6 flex flex-col p-2">
            <div className="w-full p-w flex flex-col gap-2">
                 <h1 className="text-xl font-bold">Trending Destinations</h1>
                 <p className="text-gray-500">Most popular choices for travelers worldwide</p>
                 <div className="grid grid-cols-3 grid-rows-2 gap-2">
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                    <div className="bg-emerald-200 h-60 rounded-md p-2">
                        <p className="text-lg font-semibold text-white">Sydney</p>
                    </div>
                 </div>
            </div>
            <PropertyTypes /> 

        </div>
    )
}

export default Featured