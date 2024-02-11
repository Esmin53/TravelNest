"use client"

import Bookings from "@/components/Bookings";
import PreviewCarousel from "@/components/PreviewCarousel";
import ManageBookings from "@/components/manage/ManageBookings";
import { ExtendedProperty } from "@/types/db";
import { Booking } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Manage = () => {
    
    const pathname = usePathname().split('/')[2];
    const session = useSession();

    const [property, setProperty] = useState<ExtendedProperty  >();
    const [pendingBookings, setPendingBookings] = useState<Booking[]>();
    const [inProgressBookings, setInProgressBookings] = useState<Booking[]>();
    const [completedBookings, setCompletedBookings] = useState<Booking[]>();

    const [upadtedProperty, setUpadtedProperty] = useState();



    const {mutate: getProperty} = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3000/api/manage/${pathname}`);

            const data: ExtendedProperty = await response.json();

            setProperty(data);
        },

    })

    useEffect(() => {
        getProperty()
    }, [])

    if(!property) {
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
                {property.images && property.images.map((item: string, index) => {
                    return <div key={index} className="h-32 xs:h-44 sm:h-52 md:h-60 rounded-sm xs:rounded-md p-2 relative overflow-hidden">
                    <Image src={item} fill alt="Visited location image" className="object-cover md:object-fill"/>
                </div>})}
            </div>
            <div className="w-full grid grid-cols-3 gap-8" >

            </div>
            <div className="w-full">
            <h1 className="text-xl font-bold">Manage bookings for: {property.name}</h1>
            </div>
            <ManageBookings id={property.id} />
            
        </div>
    )
}

export default Manage;