"use client"

import { DollarSign, UserCheck, UserPlus, Users } from "lucide-react";
import Chart from "./Chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { format, getMonth } from "date-fns";


interface DashboardProps {
    data: {
        [month: string]: {
            revenue: number;
            bookings: number;
            nights: number;
            upcomingBookings: number;
          };
    },
    name: string
}

const Dashboard = ({data, name}: DashboardProps) => {
    const [dashData, setDashData] = useState({
        revenue: 0,
        bookings: 0,
        nights: 0,
        upcomingBookings: 0
    })

    const [analytics, setAnalytics] = useState<{
        revenue: number | null;
        bookings: number | null;
        nights: number | null;
        upcomingBookings: number | null;
    }>({
        revenue: 0,
        bookings: 0,
        nights: 0,
        upcomingBookings: 0
    })

    const numericData = Object.fromEntries(
        Object.entries(data).map(([month, { revenue }]) => [month, revenue])
    );

    const getAnalytics = (month: string) => {
        const monthNumber = getMonth(new Date(`${month} 1, 2024`)) - 1

        const monthName = format(new Date(2022, monthNumber), 'MMMM');
        console.log(monthName); 

        if(data.hasOwnProperty(monthName)) {
            setAnalytics({
                revenue: Object.entries(data).reduce(
                    (acc, [month, { revenue }]) => (month === monthName ? acc + revenue : acc),
                    0
                  ),
                  bookings: Object.entries(data).reduce(
                    (acc, [month, { bookings }]) => ( month === monthName ? acc + bookings : acc),
                    0
                  ),
                  nights: Object.entries(data).reduce(
                    (acc, [month, { nights }]) => ( month === monthName ? acc + nights : acc),
                    0
                  ),
                  upcomingBookings: Object.entries(data).reduce(
                    (acc, [month, { upcomingBookings }]) => ( month === monthName ? acc + upcomingBookings : acc),
                    0
                  ),
            })
        } else {
            setAnalytics({revenue: null, bookings: null, nights: null, upcomingBookings: null})
        }
        
    }

    const filterData = (period: string | null) => {
        setDashData({
            revenue: Object.entries(data).reduce(
                (acc, [month, { revenue }]) => (period ? (month === period ? acc + revenue : acc) : acc + revenue),
                0
              ),
            bookings: Object.entries(data).reduce(
                (acc, [month, { bookings }]) => (period ? (month === period ? acc + bookings : acc) : acc + bookings),
                0
              ),
            nights: Object.entries(data).reduce(
                (acc, [month, { nights }]) => (period ? (month === period ? acc + nights : acc) : acc + nights),
                0
              ),
            upcomingBookings: Object.entries(data).reduce(
                (acc, [month, { upcomingBookings }]) => (period ? (month === period ? acc + upcomingBookings : acc) : acc + upcomingBookings),
                0
              ),
        })
    }


    useEffect(() => {
       filterData(null)
    }, [])
    

    return (
        <div className="w-full flex flex-col rounded-md gap-2 md:gap-4 border-2 border-gray-300 shadow-sm p-2 xs:p-4 sm:p-6">
            <div className="w-full flex flex-col xs:flex-row justify-between xs:items-center gap-2 p-2 border-b border-gray-300">
                <h1 className="text-xl xs:text-3xl font-bold text-gray-900 flex items-center">Dashboard 
                <span className="text-lg xs:text-2xl text-gray-500 font-normal px-2"> - {name}</span></h1>
                <Select 
                onValueChange={(value: string | null) => {
                    if(value === 'All Time') {
                        filterData(null)
                        setAnalytics({revenue: null, bookings: null, nights: null, upcomingBookings: null})
                    } else {
                        filterData(value)
                        value && getAnalytics(value)
                    }
                }}>
                    <SelectTrigger className="w-full xs:w-56 border-2 border-gray-300 shadow-sm rounded-none xs:rounded-md">
                        <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value='All Time'>All time</SelectItem>
                        {Object.keys(data).map((monthName) => {
                            return <SelectItem value={monthName}>{monthName}</SelectItem>                            
                        })}

                    </SelectContent>
                </Select>
            </div>
            <div className="w-full gap-2 md:gap-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 border-b border-gray-300 py-4">
                <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm flex flex-col justify-center 
                py-2 p-6 gap-2 xs:gap-4">  
                    <div  className="flex w-full justify-between items-center">
                        <p className="text-sm xs:text-md font-semibold">Total revenue</p>
                        <p className="xs:w-6 xs:h-6 w-5 h-5"><DollarSign /></p>
                    </div>
                    <div className="w-full flex flex-col">
                        <h2 className="text-xl xs:text-2xl font-bold flex gap-1 items-center"><DollarSign />{dashData?.revenue}</h2>
                        {analytics?.revenue && 
                        <p className="text-xs font-semibold">{(((dashData.revenue - analytics.revenue) / analytics.revenue) * 100).toFixed(2)}% from last month</p>}
                    </div>
                </div>
                <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm flex flex-col justify-center 
                py-2 p-6 gap-2 xs:gap-4">  
                    <div  className="flex w-full justify-between">
                        <p className="text-sm xs:text-md font-semibold">Bookings</p>
                        <p className="xs:w-6 xs:h-6 w-5 h-5"><Users /></p>
                    </div>
                    <div className="w-full flex flex-col">
                        <h2 className="text-xl xs:text-2xl font-bold flex gap-1 items-center">{dashData?.bookings}</h2>
                        {analytics?.bookings && 
                        <p className="text-xs font-semibold">{(((dashData.bookings - analytics.bookings) / analytics.bookings) * 100).toFixed(2)}% from last month</p>}
                    </div>
                </div>
                <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm flex flex-col justify-center 
                py-2 p-6 gap-2 xs:gap-4">  
                    <div  className="flex w-full justify-between">
                        <p className="text-sm xs:text-md font-semibold">Booked nights</p>
                        <p className="xs:w-6 xs:h-6 w-5 h-5"><UserCheck /></p>
                    </div>
                    <div className="w-full flex flex-col">
                        <h2 className="text-xl xs:text-2xl font-bold flex gap-1 items-center">{dashData?.nights}</h2>
                        {analytics?.nights && 
                        <p className="text-xs font-semibold">{(((dashData.nights - analytics.nights) / analytics.nights) * 100).toFixed(2)}% from last month</p>}
                    </div>
                </div>
                <div className="w-full h-24 xs:h-32 border-gray-300 border-2 rounded-md shadow-sm flex flex-col justify-center 
                py-2 p-6 gap-2 xs:gap-4">  
                    <div  className="flex w-full justify-between">
                        <p className="text-sm xs:text-md font-semibold">Upcoming Bookings</p>
                        <p className="xs:w-6 xs:h-6 w-5 h-5"><UserPlus /></p>
                    </div>
                    <div className="w-full flex flex-col">
                    <h2 className="text-xl xs:text-2xl font-bold flex gap-1 items-center">{dashData?.upcomingBookings}</h2>
                        {analytics?.upcomingBookings && 
                        <p className="text-xs font-semibold">{(((dashData.upcomingBookings - analytics.upcomingBookings) / analytics.upcomingBookings) * 100).toFixed(2)}% from last month</p>}
                    </div>
                </div>


            </div>
            <Chart data={numericData}/>
        </div>
    )
}

export default Dashboard