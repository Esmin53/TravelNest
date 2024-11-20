"use client"

import { CalendarIcon, Loader2, MapPin, Minus, Plus, Sofa, User } from "lucide-react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import SearchTrigger from "./Trigger"
import { Calendar } from "@/components/ui/calendar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DatePicker } from "./DatePicker"

const SearchBar = ({additionalOptions, propertyType ,landscapeType}: {
    additionalOptions: string
    propertyType: string
    landscapeType: string
}) => {
  const searchParams = useSearchParams()
  
    const [q, setQ] = useState<string >(searchParams.get('q') || '');
    const [rooms, setRooms] = useState({
      bedrooms: Number(searchParams.get('bedrooms')) || 0,
      bathrooms: Number(searchParams.get('bedrooms')) || 0,
      rooms: Number(searchParams.get('bedrooms')) || 0
    })
    const router = useRouter();

    return (
        <div className="w-full max-w-7xl xs:h-22rem sm:h-[27rem] xs:rounded-md flex flex-col mt-1
          sm:px-12 lg:px-24 gap-2 sm:gap-3 justify-center items-center relative 
        overflow-hidden py-2">
            <Image src='/banners/homepage.jpg' fill alt="Homepage banner" className="object-cover"/>
          <h1 className="text-center lg:text-left text-2xl md:text-3xl font-semibold z-20 text-white antialiased">
            From Dreams to Destinations: Where Your Journey Begins.
          </h1>
          <p className="truncate hidden xs:flex text-xs xs:text-sm md:text-lg text-center z-20 text-white">Travel to thousands of unique locations all across the world.</p>
          <div className="flex flex-col sm:flex-row w-full xs:w-2/3 sm:w-full gap-1 xs:gap-2 z-20 sm:p-2 sm:bg-gray-50 rounded-md 
           text-gray-800 sm:text-gray-800 p-0 px-2 xs:px-0">
            <div className="sm:w-1/3 w-full shadow-md sm:shadow-sm">
            <div className="w-full border-2 border-gray-700 sm:border-gray-500 rounded-md h-10 sm:h-12 p-2 flex 
        lg:gap-2 gap-1 items-center z-40 shadow-lg sm:shadow-none" onClick={() => console.log("Click")}>
          <MapPin />
          <span className="flex flex-col gap justify-start items-start">
            <p className="text-xs -mb-1 sm:mb-0">Where to</p>
                <input type="text" className="w-full outline-none text-sm bg-inherit font-semibold flex-1 placeholder:text-gray-700 sm:placeholder:text-gray-400" autoFocus 
                 placeholder="Search for a location..." value={q} onChange={(e) => setQ(e.target.value)}/>
              </span>
              </div>
            </div>



            <Popover>
              <PopoverTrigger className="z-30 sm:w-1/3 w-full shadow-md sm:shadow-sm">
              <SearchTrigger subtitle="Dates" title="Jan 7 - Jan 14" icon={<CalendarIcon />} />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col p-2 gap-1 sm:gap-2 w-fit">
                <p className="text-xs text-gray-600">Not working at the moment</p>
                <h2 className="text-lg border-b-2 border-gray-300">When will you be staying?</h2>
                <div className="flex flex-col md:flex-row gap-1 sm:gap-2 w-fit">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700 font-semibold">Check in date</p>
                    <DatePicker onChange={(value) => console.log(value)} className={'w-[90vw]'}/>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700 font-semibold">Check out date</p>
                    <DatePicker onChange={(value) => console.log(value)} className={'w-[90vw]'}/>
                </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger className="z-30 sm:w-1/3 w-full shadow-md sm:shadow-sm">
              <SearchTrigger subtitle="Rooms" title="Bedrooms, bathrooms and other..." icon={<Sofa />} />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col p-2 gap-1 sm:gap-4 w-[calc(100vw_-_1rem)] xs:w-72 -mt-1.5 sm:mt-0 rounded-sm">
                <h2 className="text-lg border-b-2 border-gray-300">Number of rooms</h2>
                <div className="w-full flex justify-between items-center">
                  <p>Bedrooms</p>
                  <div className="flex gap-2 items-center">
                    <Minus className="w-6 h-6 cursor-pointer text-gray-800" 
                    onClick={() => rooms.bedrooms !== 0 && setRooms({...rooms, bedrooms: rooms.bedrooms - 1})}/>
                    <p className="text-xl font-semibold">{rooms.bedrooms}</p>
                    <Plus className="w-6 h-6 cursor-pointer text-gray-800" 
                    onClick={() => setRooms({...rooms, bedrooms: rooms.bedrooms + 1})}/>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>Bathrooms</p>
                  <div className="flex gap-2 items-center">
                    <Minus className="w-6 h-6 cursor-pointer text-gray-800" 
                    onClick={() => rooms.bathrooms !== 0 && setRooms({...rooms, bathrooms: rooms.bathrooms - 1})}/>
                    <p className="text-xl font-semibold">{rooms.bathrooms}</p>
                    <Plus className="w-6 h-6 cursor-pointer text-gray-800"
                    onClick={() => setRooms({...rooms, bathrooms: rooms.bathrooms + 1})}/>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>Other rooms</p>
                  <div className="flex gap-2 items-center">
                    <Minus className="w-6 h-6 cursor-pointer text-gray-800"
                    onClick={() => rooms.rooms !== 0 && setRooms({...rooms, rooms: rooms.rooms - 1})}/>
                    <p className="text-xl font-semibold">{rooms.rooms}</p>
                    <Plus className="w-6 h-6 cursor-pointer text-gray-800"
                    onClick={() => setRooms({...rooms, rooms: rooms.rooms + 1})}/>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
  
            <button className="py-2 px-4 rounded-sm hover:bg-mainBlue/85 bg-mainBlue text-white font-semibold 
            shadow-lg sm:shadow-sm" onClick={() => {

                router.push('/')
                router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/accomodations?${additionalOptions}${propertyType && propertyType + '&'}${landscapeType &&landscapeType + '&'}${q.length > 0 ? `q=${q}&` : '' }${rooms.bedrooms > 0 ? `bedrooms=${rooms.bedrooms}&` : '' }${rooms.bathrooms > 0 ? `bathrooms=${rooms.bathrooms}&` : '' }${rooms.rooms > 0 ? `rooms=${rooms.rooms}` : '' }`)
                router.refresh()
                }}>
                Search
            </button>
          </div>
        </div>
    )
}

export default SearchBar;