import AccountProperties from "@/components/AccountProperties";
import Dashboard from "@/components/manage/Dashboard";
import Rankings from "@/components/manage/Rankings";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import { authOptions } from "@/lib/auth";
import { Property } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const Overview = async () => {

    const session = await getServerSession(authOptions); 

    if(!session || !session.user) {
        redirect('/');
    }

    const response = await fetch('http://localhost:3000/api/manage', {
        headers: headers(),
        cache: 'no-store'
    });

    const data: {
        property: Property[]
        bookings: {}
        rankings: []
    } = await response.json()

    const {property, bookings, rankings} = data

    console.log("rankigs: ", rankings)

    if(!data) {
        return <div className="w-full flex flex-col gap-6 p-2">
            <DashboardSkeleton />
        </div>
    }

    return (
        <div className="w-full flex flex-col gap-6 p-2">
            {session.user.name && <Dashboard data={bookings} name={session.user.name} />}
            <Rankings data={rankings}/>
            <div className="w-full">
                <h1 className="text-xl font-bold">My Properties</h1>
                <p className="text-gray-500">All properties listed by {session?.user.name}</p>
                <AccountProperties  properties={data.property} />
            </div>
        </div>
    )
}

export default Overview;