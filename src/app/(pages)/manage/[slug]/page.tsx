import Chart from "@/components/manage/Chart";
import Dashboard from "@/components/manage/Dashboard";
import ManageBookings from "@/components/manage/ManageBookings";
import ManageInfo from "@/components/manage/ManageInfo";
import { ExtendedProperty } from "@/types/db";
import { Property } from "@prisma/client";
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

    const data: {
        property: Property
        bookings: {}
    } = await response.json()

    const {property, bookings} = data


    if(!data.property) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-6 p-2">

            <Dashboard data={bookings}/>  
            {property && <ManageInfo {...property}/>}          
            <ManageBookings id={property.id} />
            
        </div>
    )
}

export default Manage;