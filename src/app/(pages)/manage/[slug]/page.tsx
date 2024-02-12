import Chart from "@/components/manage/Chart";
import Dashboard from "@/components/manage/Dashboard";
import ManageBookings from "@/components/manage/ManageBookings";
import ManageInfo from "@/components/manage/ManageInfo";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ManageBookigsSkeleton from "@/components/skeletons/ManageBookingsSkeleton";
import { authOptions } from "@/lib/auth";
import { ExtendedProperty } from "@/types/db";
import { Property } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'

interface AccountInfoProps {
    params: {
        slug: string
    }
}

const Manage = async ({params}: AccountInfoProps) => {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect('/')
    }

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

    if(data?.property?.hostId !== session.user.id) {
        redirect('/')
    }

    if(!data.property) {
        return (
            <div className="w-full flex flex-col gap-6 p-2">
                <DashboardSkeleton />
                <ManageBookigsSkeleton />
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-6 p-2">

            <Dashboard data={bookings} name={property.name}/>  
            {property && <ManageInfo {...property}/>}          
            <ManageBookings id={property.id} />
            
        </div>
    )
}

export default Manage;