import { Property } from "@prisma/client"
import Accomodation from "./Accomodation"
import { Ghost } from "lucide-react"


const AccountProperties = ({properties}: {properties: Property[]}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
            {properties && properties.length ? properties.map((item) => {
                return <Accomodation {...item} />
            }) : <div className="flex flex-col py-10 justify-center items-center">
                    <Ghost className="w-14 h-14 text-gray-300" />
                    <h2 className="sm:text-lg text-gray-400 font-semibold sm:truncate text-center">You have not listed any properties so far.</h2>
                </div>}
        </div>
    )
}

export default AccountProperties