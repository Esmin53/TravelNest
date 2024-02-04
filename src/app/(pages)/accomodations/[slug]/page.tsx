import Badge from "@/components/Badge";
import BookProperty from "@/components/BookProperty";
import { authOptions } from "@/lib/auth";
import { ExtendedProperty } from "@/types/db";
import { CigaretteOff, CookingPot, Heater, PawPrint, Snowflake, WashingMachine, Wifi } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
    params: {
      slug: string
    }
  }

const page = async ({params}: PageProps) => {
    
    const { slug } = params;
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:3000/api/accomodations/${slug}`)

    const data: ExtendedProperty = await response.json()


    return (
        <div className="w-full h-full flex-1 p-2 flex flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-2 flex-wrap-reverse">
                <h2 className="text-2xl xs:text-3xl sm:my-4 my-2 antialiased truncate">{data.name}</h2>
                <p className=" text-gray-700 font-semibold">${data.price}/night</p>
            </div>
            <div className="w-full h-52 xs:h-64 md:h-80 lg:h-96 rounded-2xl bg-pink-200"></div>
            <div className="flex gap-2 items-center p-1 w-full flex-wrap">
                <p className="text-lg font-semibold truncate">{data.location}, </p>            
                <p className="xs:text-lg text-gray-700 truncate mr-auto">{data.city}</p>
                <p className="text-lg truncate">{data.country}</p>
            </div>
            <div className="flex gap-2 items-center p-1">
                <p className="text-sm text-gray-600">{data.bedrooms} bedroom</p>
                <div className="w-0 h-6 shadow border-l border-gray-400" />
                <p className="text-sm text-gray-600">{data.bathrooms} bathrooms</p>
                <div className="w-0 h-6 shadow border-l border-gray-400" />
                <p className="text-sm text-gray-600">{data.rooms} other rooms</p>
            </div>
            <div className="flex w-full justify-between items-center">
                <h2 className="text-lg my-2">Badges</h2>
                <div className="flex gap-2">
                    <p className="text-gray-600">{data.propertyType.charAt(0).toUpperCase() + data.propertyType.slice(1)}</p>
                    <div className="w-0 h-6 shadow border-l border-gray-400" />
                    <p className="text-gray-600">{data.landscapeType.charAt(0).toUpperCase() + data.landscapeType.slice(1)}</p>
                </div>
                
            </div>

            <div className="flex flex-wrap lg:grid lg:grid-flow-col gap-2">
                <Badge icon={<PawPrint className={`${data.pets ? 'text-green-400' : 'text-red-400'}`} />} title="Pets"/>
                <Badge icon={<Snowflake className={`${data.airConditioning ? 'text-green-400' : 'text-red-400'}`} />} title="Air conditioning"/>
                <Badge icon={<CookingPot className={`${data.kitchen ? 'text-green-400' : 'text-red-400'}`} />} title="Kitchen"/>
                <Badge icon={<Wifi className={`${data.freeWiFi ? 'text-green-400' : 'text-red-400'}`} />} title="Free WiFi"/>
                <Badge icon={<WashingMachine className={`${data.washingMachine ? 'text-green-400' : 'text-red-400'}`} />} title="Washing machine"/>
                <Badge icon={<CigaretteOff className={`${data.noSmoking ? 'text-green-400' : 'text-red-400'}`} />} title="No smoking"/>
                <Badge icon={<Heater className={`${data.heating ? 'text-green-400' : 'text-red-400'}`} />} title="Heating"/>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between mt-4 items-center sm:items-start">
                <Link href={`/account/${data.user.id}`} className="flex flex-col p-2 sm:p-4 rounded-md justify-center items-center w-full bg-slate-50 shadow my-4 gap-2
                sm:w-fit">
                    <div className="w-28 h-28 rounded-md bg-green-400 relative overflow-hidden">
                        {data.user.image && <Image src={data.user.image} fill alt="Users image" />}
                    </div>
                    <p className="text-sm">{data.user.email}</p>
                    <h2 className="text-lg text-gray-800">{data.user.name}</h2>
                </Link>
                {session?.user ? <BookProperty price={data.price} id={data.id} hostId={data.hostId} bookings={data.bookings} propertyName={data.name} location={data.location}/> : 
                <div className="flex flex-col p-2 shadow-sm border border-gray-200 w-full sm:w-96 min-h-60 justify-center items-center">
                    <p className="text-gray-400 w-full text-start px-2">Sign in required</p>
                    <Link href='/sign-in' className="text-white w-full h-12 bg-gray-900 rounded-sm h-10 flex justify-center items-center hover:bg-gray-800">
                        Sign in to book this property</Link>    
                </div>}
            </div>
        </div>
    )
}

export default page