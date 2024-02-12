"use client"

import { Check } from "lucide-react"
import Details from "./Detail"
import ManageAdditionalInfo from "./ManageAdditionalInfo"
import ManageRooms from "./ManageRooms"
import { Property } from "@prisma/client"
import { ExtendedProperty } from "@/types/db"
import { useState } from "react"
import UpdatePrice from "./UpdatePrice"



const ManageInfo = ({id, price, pets, airConditioning, heating, kitchen, freeWiFi, noSmoking, washingMachine,
                    country, city, location, name, propertyType, landscapeType, bedrooms, bathrooms, rooms}: Property) => {
    
    return (
        <div className="w-full flex flex-col py-4 sm:py-6 border-b border-t border-gray-300">
            <div className="w-full pb-4 flex flex-col border-b border-gray-300 gap-2">
                <h1 className="text-2xl xs:text-3xl font-bold">Edit property info</h1>
            </div>
            <div className="w-full py-2 flex sm:flex-row flex-col sm:gap-4 gap-2">
                <Details id={id} country={country} city={city} location={location} name={name} propertyType={propertyType} landscapeType={landscapeType}/>
                <div className="w-full sm:w-1/2 lg:w-2/3 flex flex-col lg:flex-row gap-2">
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <UpdatePrice price={price} id={id}/>
                    <ManageAdditionalInfo id={id} pets={pets} airConditioning={airConditioning} heating={heating}
                     kitchen={kitchen} freeWiFi={freeWiFi} noSmoking={noSmoking} washingMachine={washingMachine} />
                </div>
                <div className="w-full lg:w-1/2">
                    <ManageRooms id={id} rooms={rooms} bedrooms={bedrooms} bathrooms={bathrooms}/>
                </div>
                </div>

            </div>
        </div>
    )
}

export default ManageInfo