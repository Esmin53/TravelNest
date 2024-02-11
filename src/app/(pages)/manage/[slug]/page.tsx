import Chart from "@/components/manage/Chart";
import ManageBookings from "@/components/manage/ManageBookings";
import { ExtendedProperty } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AccountInfoProps {
    params: {
        slug: string
    }
}

const Manage = async ({params}: AccountInfoProps) => {

    const { slug } = params
    
    const response = await fetch(`http://localhost:3000/api/manage/${slug}`, {
        headers: headers(),
        cache: 'no-store'
    });

    const data = await response.json()

    const {property, bookings} = data


    if(!data.property) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-6 p-2">
            <div className="w-full flex justify-between">
                <h2 className="sm:text-xl font-semibold">Manage property:</h2>
                <p className="text-lg text-gray-800">{property.name}</p>
            </div>
            <div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-1 xs:gap-2">
                {property.images && property.images.map((item: string, index: number) => {
                    return <div key={index} className="h-32 xs:h-44 sm:h-52 md:h-60 rounded-sm xs:rounded-md p-2 relative overflow-hidden">
                    <Image src={item} fill alt="Visited location image" className="object-cover md:object-fill"/>
                </div>})}
            </div>
            <div>
                <Chart data={bookings}/>
            </div>
            
            <ManageBookings id={property.id} />
            
        </div>
    )
}

export default Manage;