import { Property } from "@prisma/client"
import Accomodation from "./Accomodation"


const AccomodationsFeed = async ({queryString}: {
    queryString: string
}) => {

    const response = await fetch(`http://localhost:3000/api/accomodations?${queryString}`, {
        cache: 'no-store'
    })

    const data = await response.json()

    return (
        <div className="w-full space-y-2">
        <h1 className="text-xl font-bold">Your results</h1>
        <p className="text-gray-500">Showing 20 out of 68 results</p>
        <div className="w-full h-[1px] shadow-sm bg-gray-400 my-4" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                data && data.map((item: Property) => {
                    return <Accomodation {...item}/>
                })
            }
        </div>
        </div>
    )
}

export default AccomodationsFeed;