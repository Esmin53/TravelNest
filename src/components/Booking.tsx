"use client"

import { Booking, BookingStatus } from "@prisma/client"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { CheckIcon, Loader2, } from "lucide-react"
import { useSession } from "next-auth/react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { toast } from "./ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
  

interface BookingProps {
    checkInDate: Date
    checkOutDate: Date
    hostId: string
    status: BookingStatus
    location: string
    propertyName: string
    id: string
    guestId: string
    nights: number
    price: number
    onChange?: (oldStatus: string, newStatus: string, booking: Booking) => void
}

const Booking = ({checkInDate, checkOutDate, hostId, status, location, propertyName, id, guestId, nights, price, onChange}: BookingProps) => {

    const session = useSession()
    const [bookingStatus, setBookingStatus] = useState(status)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isError, setIsError] = useState<string | null>()

    const {mutate: updateStatus} = useMutation({
        mutationFn: async () => {
            try {
                setIsUpdating(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id,
                        status: bookingStatus
                    })
                })

                const data: Booking = await response.json()

                

               onChange && onChange(status, data.status, data)
            } catch (error) {
                console.log(error)
            }
        },
        onSettled: () => {
            setIsUpdating(false)
        }
    })

    useEffect(() => {
        if(isToday(checkInDate) && status !== 'IN_PROCESS') {
            setIsError('Check-in due today')
        } else if(isToday(checkOutDate) && status !== 'COMPLETED') {
            setIsError('Check-out due today')
        }else if(isBefore(new Date(), checkInDate) && status !== 'PENDING' ) {
            setIsError('Check-in date not reached yet')
        } else if(isAfter(new Date(), checkOutDate) && status !== 'COMPLETED') {
            setIsError('Check-out date passed')
        } else if(isAfter(new Date(), checkInDate) && isBefore(new Date(), checkOutDate) && status !== 'IN_PROCESS') {
            setIsError('This booking is suposed to be in process!')
        }
    }, [status, checkInDate, checkOutDate])
      
    return <div className={`bg-gray-100 shadow sm:rounded-sm p-2 flex flex-col border border-gray-300`}>
        <p className="text-xs font-bold">{isError}</p>
        <div className="w-full flex justify-between items-center">
            <p>{location}</p>
            <Link href={`/accomodations/${id}`} className="font-semibold">{propertyName}</Link>
        </div>
        <div className="w-full flex justify-between items-center text-sm xs:text-md md:text-sm lg:text-md">
            <p className={`${isToday(checkInDate) && status !== 'IN_PROCESS' ? 'text-emerald-400 font-semibold' : ''}`}>{format(checkInDate, 'PPP')}</p>
            <span className="text-lg font-bold">-</span>
            <p className={`${isToday(checkOutDate) && status !== 'COMPLETED' ? 'text-red-400 font-semibold' : ''}`}>{format(checkOutDate, 'PPP')}</p>
        </div>
        {session.data?.user.id === hostId && <div className="w-full flex justify-between items-center gap-1 mt-auto">

                <Select defaultValue={bookingStatus}
                onValueChange={(value: BookingStatus) => {
                    setBookingStatus(value);
                    if(value === 'COMPLETED' && isBefore( new Date(), checkOutDate)) {
                        toast({variant: 'destructive', title: 'Warning', description: 'Are you sure you want to mark this booking as completed, check-out date is not yet due!'})
                    }
                    if(value === 'IN_PROCESS' && isBefore( new Date(), checkInDate)) {
                        toast({variant: 'destructive', title: 'Warning', description: 'Are you sure you want to mark this booking as in process, check-in date is not yet due!'})
                    }
                    if(value !== 'COMPLETED' && isAfter(new Date(), checkOutDate)) {
                        toast({variant: 'destructive', title: 'Warning', description: 'This booking should be marked as completed!'})
                    }
                    if(value !== 'IN_PROCESS' && isAfter(new Date(), checkInDate) && isBefore(new Date(), checkOutDate)) {
                        toast({variant: 'destructive', title: 'Warning', description: 'This booking should be marked as in process!'})
                    }

                }}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Booking status" defaultValue={status} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PENDING" defaultChecked={status === 'PENDING' && true}>Pending</SelectItem>
                        <SelectItem value="IN_PROCESS" defaultChecked={status === 'IN_PROCESS' && true}>In process</SelectItem>
                        <SelectItem value="COMPLETED" defaultChecked={status === 'COMPLETED' && true}>Finshed</SelectItem>
                    </SelectContent>
                </Select>
                <button className="w-9 h-9 bg-gray-900 hover:bg-gray-800 rounded-sm flex items-center 
                justify-center text-white" onClick={() => updateStatus()} disabled={isUpdating}>
                    {isUpdating ? <Loader2 className="animate-spin"/>  : <CheckIcon />}
                </button>
        </div>}
        <div className="w-full flex justify-between items-center border-b border-gray-700 py-1">
            <p>{nights}</p>
            <p>${price}</p>
        </div>
        {session.data?.user.id === hostId ? <div className="w-full flex justify-between items-center mt-2">
            <p className="text-sm">Guest ID:</p>
            <Link href={`/account/${guestId}`} className="text-sm">{guestId}</Link>
        </div> : <div className="w-full flex justify-between items-center mt-2">
            <p className="text-sm">Host ID:</p>
            <Link href={`/account/${hostId}`} className="text-sm">{hostId}</Link>
        </div>}
    </div>
}

export default Booking