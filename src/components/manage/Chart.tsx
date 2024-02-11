import { useState } from "react"

interface ChartProps {
    data: {
        January?: number
        February?: number
        March?: number
        April?: number
        May?: number
        June?: number
        July?: number
        August?: number
        September?: number
        October?: number
        November?: number
        December?: number
    }
}

const Chart = ({data}: ChartProps) => {

    const maxEntry = Object.entries(data).reduce((max, entry) => {
        return entry[1] > max[1] ? entry : max;
      }, ['', -Infinity]);

      function calculatePercentage(part: number | undefined) {
        if(!part) {
            return 1
        }
        return (part / maxEntry[1]) * 100;
      }

    return (
        <div className="px-1  py-2 sm:p-8 border border-gray-500 rounded-md w-full sm:w-fit overflow-hidden shadow-sm">
            <h2 className="sm:text-lg font-semibold my-1 sm:my-2">Overview</h2>
            <div className="h-36 xs:h-60 sm:72 md:h-80 flex w-full sm:w-fit p-1 sm:p-2 gap-1 sm:gap-2">
            <div className="h-full w-12 flex flex-col justify-between">
                <p className="text-xs sm:text-sm">{maxEntry[1]}$</p>
                <p className="text-xs sm:text-sm">{maxEntry[1] * 0.75}$</p>
                <p className="text-xs sm:text-sm">{maxEntry[1] * 0.5}$</p>
                <p className="text-xs sm:text-sm">{maxEntry[1] * 0.25}$</p>
                <p className="text-xs sm:text-sm">0$</p>
            </div>
            <div className="grid grid-flow-col gap-1 md:gap-2 items-end w-full">
                    <div style={{height: `${calculatePercentage(data?.January)}%`}} 
                    className={`w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm`}> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Jan</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.February)}%`}}  
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Feb</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.March)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Mar</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.April)}%`}} 
                    className="w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Apr</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.May)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">May</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.June)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Jun</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.July)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Jul</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.August)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Aug</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.September)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Sep</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.October)}%`}} 
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Oct</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.November)}%`}}
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Nov</span>
                    </div>
                    <div style={{height: `${calculatePercentage(data?.December)}%`}}
                    className=" w-full sm:w-10 md:w-12 bg-gray-900 relative flex justify-center rounded-t-sm"> 
                        <span className="text-xs sm:text-sm absolute bottom-10 text-white rotate-90 sm:rotate-0 
                        sm:text-gray-900 sm:-bottom-6 sm:font-semibold">Dec</span>
                    </div>


            </div>
        </div>
        </div>

    )
}

export default Chart