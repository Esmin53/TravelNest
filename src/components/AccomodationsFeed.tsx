import { Property } from "@prisma/client"
import Accomodation from "./Accomodation"
import Pagination from "./Pagination"
import { Ghost } from "lucide-react"


const AccomodationsFeed = async ({queryString}: {
    queryString: string
}) => {

    const response = await fetch(`http://localhost:3000/api/accomodations?${queryString}`, {
        cache: 'no-store'
    })

    const {accomodations, pagination} = await response.json()

    return (
        <div className="w-full space-y-2">
        <h1 className="text-xl font-bold">Your results</h1>
        <p className="text-gray-500">Total {pagination.totalResults} results</p>
        <div className="w-full h-[1px] shadow-sm bg-gray-400 my-4" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                accomodations && accomodations.map((item: Property) => {
                    return <Accomodation {...item}/>
                })
            }
        </div>
        { !accomodations.length ? (
            <div className="w-full flex flex-col items-center justify-center gap-2 py-6 sm:h-80">
                <Ghost className="sm:w-56 sm:h-56 xs:h-42 xs:w-42 h-28 w-28 text-gray-400" />
                <h2 className="text-sm xs:text-md sm:text-lg text-gray-600 text-center">
                There are no accommodations that match your criteria at the moment. <br /> Please adjust your search filters or try again later.<br />
                 If you need assistance, feel free to contact our support team.</h2>
            </div>
        ) : null }

        <div className="w-full h-[1px] shadow-sm bg-gray-400 my-4" />
        <Pagination redirectUri={queryString} totalPages={pagination.totalPages} currentPage={pagination.currentPage}/>
        </div>
    )
}

export default AccomodationsFeed;