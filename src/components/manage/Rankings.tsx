import { DollarSign, Star, UserPlus, Users } from "lucide-react"

interface RankigsProps {
    data: {
        property: string
        revenue: number
        bookings: number
        incomingRevenue: number
    }[],
    bestRated: {
        property: string
        rating: number
    }
}

const Rankings = ({data, bestRated}: RankigsProps) => {

    

    const highRevenue = data?.reduce((max, current) => (max?.revenue > current?.revenue ? max : current)) 
    const mostVisited = data?.reduce((max, current) => (max?.bookings > current?.bookings) ? max : current) 
    const newRevenue =  data?.reduce((max, current) => (max?.incomingRevenue > current?.incomingRevenue) ? max : current) 

    return (
        <div className="w-full">
        <h1 className="text-xl font-bold">Property rankings</h1>
        <p className="text-gray-500">Here are best rankings of your properties</p>
        <div className="w-full md:h-44 rounded-md xs:p-4 py-4 md:py-8 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 md:gap-1">
            <div className="flex-1 h-full flex flex-col py-2 pl-4 xs:px-4 lg:px-8 justify-center gap-2 md:gap-4 border-l-2 xs:border-l-0 xs:border-r-[2px] border-gray-300">
                <p className="lg:text-lg text-gray-400">Biggest revenue</p>
                
                <div>
                <h2 className="text-2xl xs:text-xl lg:text-2xl font-semibold">{highRevenue?.property || 'No bookings'}</h2>
                    <p className="text-sm lg:text-md flex gap-1 items-center font-semibold text-gray-700">
                        <DollarSign className="w-5 h-5" />
                        {highRevenue?.revenue || 0}</p>
                </div>
            </div>
            <div className="flex-1 h-full flex flex-col py-2 pl-4 xs:px-4 lg:px-8 justify-center gap-2 md:gap-4 border-l-2 xs:border-l-0 md:border-r-[2px] border-gray-300">
                <p className="lg:text-lg text-gray-400">Most bookings</p>
                
                <div>
                <h2 className="text-2xl xs:text-xl lg:text-2xl font-semibold">{mostVisited?.property ||'No bookings'}</h2>
                    <p className="text-sm lg:text-md flex gap-1 items-center font-semibold text-gray-700">
                        <Users className="w-5 h-5" />
                        {mostVisited?.bookings || 0}</p>
                </div>


            </div>

            <div className="flex-1 h-full flex flex-col py-2 pl-4 xs:px-4 lg:px-8 justify-center gap-2 md:gap-4 border-l-2 xs:border-l-0 xs:border-r-[2px] border-gray-300">
                <p className="lg:text-lg text-gray-400">Best reviewed</p>
                
                <div>
                    <h2 className="text-2xl xs:text-xl lg:text-2xl font-semibold">{bestRated?.property || 'No properties'}</h2>
                    <p className="text-sm lg:text-md flex gap-1 items-center font-semibold text-gray-700">
                        <Star className="w-5 h-5" />
                        {bestRated?.rating || 0}</p>
                </div>


            </div>
            <div className="flex-1 h-full flex flex-col py-2 pl-4 xs:px-4 lg:px-8 justify-center gap-2 md:gap-4 border-l-2 xs:border-l-0 border-gray-300">
                <p className="lg:text-lg text-gray-400">Upcoming revenue</p>
                
                <div>
                <h2 className="text-2xl xs:text-xl lg:text-2xl font-semibold">{newRevenue?.property || 'No bookings'}</h2>
                    <p className="text-sm lg:text-md flex gap-1 items-center font-semibold text-gray-700">
                        <DollarSign className="w-5 h-5" />
                        <UserPlus className="w-5 h-5 -ml-1.5" />
                        {newRevenue?.incomingRevenue || 0}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Rankings