"use client"

import { useEffect, useState } from "react"
import { DatePicker } from "./DatePicker"
import { Button } from "./ui/button"
import { differenceInDays, eachDayOfInterval, format, isAfter, isBefore, isWithinInterval } from "date-fns"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { Booking } from "@prisma/client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Loader2 } from "lucide-react"

interface BookingProps {
    price: number
    id: string
    hostId: string
    bookings: Booking[]
    propertyName: string
    location: string
}

const BookProperty = ({price, id, hostId, bookings, propertyName, location}: BookingProps) => {

    const [isLoading, setIsLoading] = useState<boolean >(false)
    const [bookingInfo, setBookingInfo] = useState<{
        checkInDate: Date | undefined
        checkOutDate: Date | undefined
        nights: number
        propertyName: string
        location: string
    } >({
        checkInDate: undefined,
        checkOutDate: undefined,
        nights: 0,
        propertyName: propertyName,
        location: location
    })

    let bookedDays: Date[] = [];

    bookings.forEach((item) => {
        const dates = eachDayOfInterval({start: item.checkInDate, end: item.checkOutDate})
        dates.map((item) => {
            bookedDays.push(item)
        })
    })

    bookedDays = [...new Set(bookedDays)]

    const isAnyDayWithinInterval = (start: Date, end: Date, daysArray: Date[]) => {

      
        return daysArray.some(day => isWithinInterval(day, { start: start, end: end }));
      };


    const {mutate: book} = useMutation({
        mutationFn: async () => {
            try {
                if(!bookingInfo.checkInDate || !bookingInfo.checkOutDate) {
                    toast({variant: 'destructive', title: 'Invalid date',
                     description: 'Please provide valid check-in and check-out dates'})
                    return
                } 
                    
                if (isAnyDayWithinInterval(bookingInfo.checkInDate, bookingInfo.checkOutDate, bookedDays)) {
                    toast({
                      variant: 'destructive',
                      title: 'Invalid date',
                      description: 'Please make sure there are no booked days between your check-in and check-out dates!',
                    });
                    return;
                  }
                


                if(isBefore(bookingInfo.checkOutDate, bookingInfo.checkInDate)) {
                    toast({variant: 'destructive', title: 'Invalid date',
                    description: 'Check-out date must be after check-in date!'})
                   return
                }

                const response = await fetch('http://localhost:3000/api/book-accomodation', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...bookingInfo,
                        price: bookingInfo.nights * price,
                        propertyId: id,
                        hostId: hostId
                    })
                })

                if(!response.ok) {
                    throw new Error()
                }

                const data = await response.json();


                toast({variant: 'default', title: 'Booking success', description: 'Your booking was created successfully'})

            } catch (error) {
                    toast({variant: 'destructive', title: 'Something went wrong',
                    description: 'There was an error booking your stay, please try again later!'})
            }
        },
        onSettled: () => {
            setIsLoading(false);
        }
    })

    useEffect(() => {
        if(bookingInfo.checkInDate && bookingInfo.checkOutDate) {
            setBookingInfo({...bookingInfo, nights: differenceInDays(bookingInfo.checkOutDate, bookingInfo.checkInDate)})
        }

    }, [bookingInfo.checkInDate, bookingInfo.checkOutDate])

    return (
        <div className="flex xl:flex-1 gap-2 xl:gap-0 lg:flex-row flex-col">
            <div className="flex xl:flex-row flex-col gap-4 flex-1 items-center xl:justify-center">
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700 font-semibold">Check in date</p>
                    <DatePicker bookedDays={bookedDays} className='w-[96vw] xs:w-96'
                    onChange={(value: Date | undefined) => setBookingInfo({...bookingInfo, checkInDate: value})}/>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-700 font-semibold">Check out date</p>
                    <DatePicker bookedDays={bookedDays} className='w-[96vw] xs:w-96'
                    onChange={(value: Date | undefined) => setBookingInfo({...bookingInfo, checkOutDate: value})} />
                </div>
            </div>
            <form className="flex flex-col p-4 gap-4 shadow-sm border border-gray-200 w-full sm:w-96 min-h-60"
            id="bookPropertyForm" onSubmit={(e) => {
                e.preventDefault()
                setIsLoading(true)
                book()
            }}>
                <p>{price}$ <span className="text-gray-600">per night</span></p>
                <div className="flex w-full rounded-xl border-gray-500 border min-h-14">
                    <div className="w-1/2 h-full py-2 px-4 flex flex-col cursor-pointer">
                        <p className="text-xs text-gray-600 font-semibold">Check in</p>
                        <p className="text-sm">{bookingInfo.checkInDate ? format(bookingInfo.checkInDate, 'PPP') : 
                        <span>Pick a date</span>}</p>
                    </div>
                    <div className="h-full w-0 border-l border-gray-500" />
                    <div className="w-1/2 h-full py-2 px-4 flex flex-col">
                        <p className="text-xs text-gray-600 font-semibold">Check out</p>
                        <p className="text-sm">{bookingInfo.checkOutDate ? format(bookingInfo.checkOutDate, 'PPP') : 
                        <span>Pick a date</span>}</p>                            
                    </div>
                </div>
                <div className="w-full flex justify-between border-b border-gray-400 pb-1">
                    <p>{bookingInfo.checkInDate && bookingInfo.checkOutDate ?
                    <p>Nights: {bookingInfo.nights}</p> : <span>Choose check-in and check-out date</span>
                        }</p>
                    <p>{bookingInfo.nights && <span>{bookingInfo.nights * price}</span>}$</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild disabled={isLoading || !bookingInfo.checkInDate || !bookingInfo.checkOutDate}>
                        <Button>                 
                            {isLoading ? (<Loader2 className="animate-spin"/>) : ('Book me in')}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you 100% sure you want to book this property from {bookingInfo.checkInDate && format(bookingInfo.checkInDate, 'PPP')}
                                {" "} to {bookingInfo.checkOutDate && format(bookingInfo.checkOutDate, 'PPP')}?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>No</AlertDialogCancel>
                            <AlertDialogAction asChild type="submit"><button form="bookPropertyForm">Yes</button></AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </div>
    )
}

export default BookProperty