import ErrorDialog from "@/components/Error";
import Dashboard from "@/components/manage/Dashboard";
import ManageBookings from "@/components/manage/ManageBookings";
import ManageInfo from "@/components/manage/ManageInfo";
import { authOptions } from "@/lib/auth";
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

    if(data?.property?.hostId && data?.property?.hostId  !== session.user.id) {
        redirect('/')
    }

    if(!data || !data?.property) {
        return <ErrorDialog />
    }

    return (
        <div className="w-full flex flex-col gap-6 p-2 pb-4">
            <Dashboard data={bookings} name={property.name}/>  
            {property && <ManageInfo {...property}/>}          
            <ManageBookings id={property.id} />
        </div>
    )
}

export default Manage;