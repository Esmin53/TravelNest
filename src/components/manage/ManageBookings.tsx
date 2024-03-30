"use client"

import { Booking as BookingType } from "@prisma/client"
import Booking from "../Booking"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Ghost, Loader2, Search } from "lucide-react"
import { DatePicker } from "../DatePicker"
import { endOfMonth,  format, startOfMonth } from "date-fns"
import { toast } from "../ui/use-toast"
import ManageBookigsSkeleton from "../skeletons/ManageBookingsSkeleton"

interface ManageProps {
    id: string
}

const ManageBookings = ({id}: ManageProps) => {

    const [bookings, setBookings] = useState< {
        pendingBookings: BookingType[] | null
        inProcessBookings: BookingType[] | null
        completedBookings: BookingType[] | null
    }>({
        pendingBookings: null,
        inProcessBookings: null,
        completedBookings: null,
    })
    
    const [fromDate, setFromDate] = useState<Date >(startOfMonth(new Date()))
    const [toDate, setToDate] = useState<Date >(endOfMonth(new Date()))
    const [isLoading, setIsLoading] = useState<boolean >(true)

    const {mutate: getBookings} = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/bookings?propertyId=${id}&from=${fromDate}&to=${toDate}`)

                const data = await response.json()
    
                setBookings(data)
            } catch (error) {
                console.log(error)
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error fetching your bookings,  please try again later!'})
            }
        },
        onSettled: () => {
          setIsLoading(false)
        }
    })

    useEffect(() => {
      setIsLoading(true)
         getBookings()
    }, [])

    const handleChange = (oldStatus: string, newStatus: string, booking: BookingType) => {
        if (oldStatus === 'IN_PROCESS') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            inProcessBookings: (prevBookings.inProcessBookings || []).filter(item => item.id !== booking.id),
          }));
        } else if (oldStatus === 'PENDING') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            pendingBookings: (prevBookings.pendingBookings || []).filter(item => item.id !== booking.id),
          }));
        } else if (oldStatus === 'COMPLETED') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            completedBookings: (prevBookings.completedBookings || []).filter(item => item.id !== booking.id),
          }));
        }
      
        if (newStatus === 'IN_PROCESS') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            inProcessBookings: (prevBookings.inProcessBookings || []).concat(booking),
          }));
        } else if (newStatus === 'PENDING') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            pendingBookings: (prevBookings.pendingBookings || []).concat(booking),
          }));
        } else if (newStatus === 'COMPLETED') {
          setBookings((prevBookings) => ({
            ...prevBookings,
            completedBookings: (prevBookings.completedBookings || []).concat(booking),
          }));
        }
      };

    if(isLoading) {
        return <ManageBookigsSkeleton />
    }

    return (
        <div className="flex flex-col w-full gap-6">
          <div className="w-full pb-4 flex flex-col sm:flex-row justify-between xs:items-center border-b border-gray-300 gap-2">
            <h1 className="text-2xl xs:text-3xl font-bold">Manage bookings</h1>
            <div className="flex flex-col xs:flex-row gap-4 xs:gap-2 items-end justify-center">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700">From {format(fromDate, 'PPP')}</p>
                    <DatePicker className='w-[96vw] xs:w-44 lg:w-[280px]'
                    onChange={(value: Date | undefined) => value && setFromDate(value)}/>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700">To {format(toDate, 'PPP')}</p>
                    <DatePicker className='w-[96vw] xs:w-44 lg:w-[280px]'
                    onChange={(value: Date | undefined) => value && setToDate(value)}/>
                </div>
                <button className="w-full xs:w-10 h-10 rounded-sm bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center"
                onClick={() => getBookings()}>
                  <Search />
                </button>
            </div>
          </div>
            <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
                <h1 className="text-xl font-bold">Bookings in Process</h1>
                 <p className="text-gray-500">Here are the guests who are currently staying at your accomodation:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings?.inProcessBookings?.length ? bookings.inProcessBookings.map((booking: BookingType) => {
                        return <Booking key={booking.id} {...booking} onChange={(oldStatus: string,
                            newStatus: string, booking: BookingType) => handleChange(oldStatus, newStatus, booking)}/>
                    }) : <div className="flex flex-col w-full items-center py-2">
                            <Ghost className="w-12 h-12 text-gray-400"/>
                            <h2 className="text-lg text-gray-400 text-center">You have no guests currently staying at this accomodation</h2>
                        </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
                <h1 className="text-xl font-bold">Incoming bookings</h1>
                 <p className="text-gray-500">Here are the bookings that will stay at your place in the future:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings?.pendingBookings?.length ? bookings?.pendingBookings?.map((booking: BookingType) => {
                        return <Booking key={booking.id} {...booking} onChange={(oldStatus: string, 
                            newStatus: string, booking: BookingType) => handleChange(oldStatus, newStatus, booking)} />
                    }) : <div className="flex flex-col w-full items-center py-2">
                    <Ghost className="w-12 h-12 text-gray-400"/>
                    <h2 className="text-lg text-gray-400 text-center">You have no upcoming bookings at this accomodation</h2>
                </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 border-b border-gray-300 pb-4">
                <h1 className="text-xl font-bold">Completed Bookings</h1>
                 <p className="text-gray-500">Here are the guests who have stayed at your place in the past:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings?.completedBookings?.length ? bookings.completedBookings.map((booking: BookingType) => {
                        return <Booking key={booking.id} {...booking} onChange={(oldStatus: string, 
                            newStatus: string, booking: BookingType) => handleChange(oldStatus, newStatus, booking)}/>
                    }) : <div className="flex flex-col w-full items-center py-2">
                    <Ghost className="w-12 h-12 text-gray-400"/>
                    <h2 className="text-lg text-gray-400 text-center">You have no previous bookings at this accomodation</h2>
                </div>}
                </div>
            </div>

        </div>
    )
}

export default ManageBookings