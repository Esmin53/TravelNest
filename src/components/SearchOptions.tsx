"use client"

import { LandscapeTypesArray, PropertyTypesArray } from "@/utils/data"
import Select from "./Select"
import { ChevronDown, ChevronUp, CigaretteOff, CookingPot, Heater, PawPrint, Snowflake, WashingMachine, Wifi, X } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"


interface SearchOptionsProps {
    onChange: (value: string) => void
    onPropertyChange: (value: string) => void
    onLandscapeChange: (value: string) => void
}

const SearchOptions = ({ onChange, onPropertyChange, onLandscapeChange }: SearchOptionsProps) => {

    const searchParams = useSearchParams()

    const [isOpen, setIsOpen] = useState<boolean >(false)
    const [params, setParams] = useState<{
        pets: boolean
        airConditioning: boolean
        kitchen: boolean
        freeWiFI: boolean
        washingMachine: boolean
        noSmoking: boolean
        heating: boolean
        landscapeType: string | null
        propertyType: string | null
    } >({
        pets: searchParams.get('pets')?.toLowerCase() === 'true' || false,
        airConditioning:  searchParams.get('airConditioning')?.toLowerCase() === 'true' || false,
        kitchen: searchParams.get('kitchen')?.toLowerCase() === 'true' || false,
        freeWiFI: searchParams.get('freeWiFi')?.toLowerCase() === 'true' || false,
        washingMachine: searchParams.get('washingMachine')?.toLowerCase() === 'true' || false,
        noSmoking: searchParams.get('noSmoking')?.toLowerCase() === 'true' || false,
        heating: searchParams.get('heating')?.toLowerCase() === 'true' || false,
        landscapeType: searchParams.get('landscapeType')?.split('=')[0] || null,
        propertyType: searchParams.get('propertyType')?.split('=')[0] || null,
    })

    return (
        <div className={`w-full ${isOpen && 'h-[13rem] md:h-fit'}`}>
            <div className="flex w-full justify-between px-2">
                <p className="text-sm text-gray-800 font-semibold">More search options</p>
                {isOpen ? <ChevronUp  onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer"/> : 
                <ChevronDown onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer"/>}
            </div>

            { isOpen ? <div className="flex justify-between w-full items-center py-1 flex-col sm:flex-row px-2 md:px-0">
                <div className="flex lg:space-x-4 space-x-2 p-2 sm:w-fit sm:justify-start w-full justify-between xs:px-[15%] sm:px-2">
                    <PawPrint className={`${params.pets && 'text-green-400'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, pets: !params.pets})
                        onChange('pets=true')
                    }
                    }/>
                    <Snowflake className={`${params.airConditioning && 'text-sky-600'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, airConditioning: !params.airConditioning})
                        onChange('airConditioning=true')
                        }}/>
                    <CookingPot className={`${params.kitchen && 'text-green-400'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, kitchen: !params.kitchen})
                        onChange('kitchen=true')
                        }}/>
                    <Wifi className={`${params.freeWiFI && 'text-green-600'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, freeWiFI: !params.freeWiFI})
                        onChange('freeWiFi=true')
                    }}/>
                    <WashingMachine className={`${params.washingMachine && 'text-green-400'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, washingMachine: !params.washingMachine})
                        onChange('washingMachine=true')
                    }}/>
                    <CigaretteOff className={`${params.noSmoking && 'text-red-400'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, noSmoking: !params.noSmoking})
                        onChange('noSmoking=true')
                    }}/>
                    <Heater className={`${params.heating && 'text-red-400'} cursor-pointer rounded-md`} 
                    onClick={() => {
                        setParams({...params, heating: !params.heating})
                        onChange('heating=true')
                    }}/>
                </div>
            <div className="h-20 flex gap-1 lg:gap-2 items-center flex-col sm:flex-row sm:w-fit w-full xs:px-[15%] sm:px-2">
                <div className="flex flex-col w-full sm:w-48 lg:w-72">
                    <p className="text-sm text-gray-800">Property type</p>
                    <div className="w-full sm:w-48 lg:w-72">
                    <Select onChange={(value: any) => {
                        setParams({...params, propertyType: value})
                        onPropertyChange(`propertyType=${value}`)
                    }} 
                    data={params.propertyType} options={PropertyTypesArray}/>
                </div>
                </div>

                <div className="flex flex-col w-full sm:w-52 lg:w-80 ">
                    <p className="text-sm text-gray-800">Landscape type</p>
                    <div className="w-full sm:w-52 lg:w-80 flex gap-1 items-center">
                    <Select onChange={(value: any) => {
                        setParams({...params, landscapeType: value})
                        onLandscapeChange(`landscapeType=${value}`)
                    }} 
                    data={params.landscapeType} options={LandscapeTypesArray}/>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm  flex justify-center items-center 
                text-red-400 cursor-pointer"
                 onClick={() => {
                    setParams({...params, propertyType: null, landscapeType: null });
                    onPropertyChange(''); 
                    onLandscapeChange('');
                }}>
                    <X />
                 </div>
                </div>
                </div>


            </div>
            </div> : null}
        </div>
    )
}

export default SearchOptions