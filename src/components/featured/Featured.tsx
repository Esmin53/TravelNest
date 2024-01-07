"use client"

import { Building, Dessert, GlassWater, Home, LucidePyramid, LucideSailboat, LucideSun, LucideTent, Mountain, Palmtree, Snowflake, TreePine } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import PropertyTypes from "./PropertyType"

const Featured = () => {
    
    return (
        <div className="w-full max-w-6xl gap-6 flex flex-col">
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

            <div className="w-full flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Find land that suits your style</h1>
                <div className="flex gap-4">
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <Building className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">City</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <Home className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Country</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <Mountain className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Mountains</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <LucideSun className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Beach</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <TreePine className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Forrest</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <LucidePyramid className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Desert</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <Snowflake className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Snowy</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <LucideTent className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Camping</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <Palmtree className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Tropical</p>
                    </div>
                    <div className="flex flex-col gap cursor-pointer items-center">
                        <div className="w-14 h-14 rounded-sm flex flex-col items-center justify-center">
                            <LucideSailboat className="w-10 h-10" />
                        </div>
                        <p className="text-xs font-semibold">Island</p>
                    </div>
                </div>
            </div>

            <div className="w-full p-w flex flex-col gap-2">
                 <h1 className="text-xl font-bold">Homes guests love</h1>
                 <p className="text-gray-500">Most popular properties for our users</p>
                 <Carousel>
                    <CarouselContent className="-ml-1 h-72">
                        <CarouselItem className="basis-1/3 p-1">
                            <div className="w-full h-full rounded-md bg-orange-300">

                            </div>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-1">
                            <div className="w-full h-full rounded-md bg-orange-300">

                            </div>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-1">
                            <div className="w-full h-full rounded-md bg-orange-300">

                            </div>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 p-1">
                            <div className="w-full h-full rounded-md bg-orange-300">

                            </div>
                        </CarouselItem>
                        <CarouselItem className="basis-1/4 p-1">
                            <div className="w-full h-full rounded-md bg-orange-300">

                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default Featured