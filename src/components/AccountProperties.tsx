import { Property } from "@prisma/client"
import { Carousel } from "./ui/carousel"
import Accomodation from "./Accomodation"


const AccountProperties = ({properties}: {properties: Property[]}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
            {properties && properties.map((item) => {
                return <Accomodation {...item} />
            })}
        </div>
    )
}

export default AccountProperties