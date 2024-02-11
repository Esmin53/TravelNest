"use client"

import { Booking as BookingType } from "@prisma/client"
import Booking from "../Booking"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Ghost, Loader2 } from "lucide-react"

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
    

    const {mutate: getBookings} = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/bookings?propertyId=${id}`)

                const data = await response.json()
    
                setBookings(data)
            } catch (error) {
                console.log(error)
            }
        }
    })

    useEffect(() => {
         getBookings()
    }, [])

    const handleChange = (oldStatus: string, newStatus: string, booking: BookingType) => {
        // Remove from old array
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
      
        // Add to new array
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

    if(!bookings.pendingBookings) {
        return <div className="flex flex-col w-full justify-start items-center gap-2">
            <Loader2 className="animate-spin" />
            <h2>Fetching your bookings...</h2>
        </div>
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Bookings in Process</h1>
                 <p className="text-gray-500">Here are the guests who are currently staying at your accomodation:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings?.inProcessBookings?.length ? bookings.inProcessBookings.map((booking: BookingType) => {
                        return <Booking {...booking} onChange={(oldStatus: string, 
                            newStatus: string, booking: BookingType) => handleChange(oldStatus, newStatus, booking)}/>
                    }) : <div className="flex flex-col w-full items-center py-2">
                            <Ghost className="w-12 h-12 text-gray-400"/>
                            <h2 className="text-lg text-gray-400 text-center">You have no guests currently staying at this accomodation</h2>
                        </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Incoming bookings</h1>
                 <p className="text-gray-500">Here are the bookings that will stay at your place in the future:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings.pendingBookings.length ? bookings?.pendingBookings?.map((booking: BookingType) => {
                        return <Booking {...booking} onChange={(oldStatus: string, 
                            newStatus: string, booking: BookingType) => handleChange(oldStatus, newStatus, booking)} />
                    }) : <div className="flex flex-col w-full items-center py-2">
                    <Ghost className="w-12 h-12 text-gray-400"/>
                    <h2 className="text-lg text-gray-400 text-center">You have no upcoming bookings at this accomodation</h2>
                </div>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Completed Bookings</h1>
                 <p className="text-gray-500">Here are the guests who have stayed at your place in the past:</p>
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings?.completedBookings?.length ? bookings.completedBookings.map((booking: BookingType) => {
                        return <Booking {...booking} onChange={(oldStatus: string, 
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