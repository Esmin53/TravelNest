import { getServerSession } from "next-auth"
import Review from "./Review"
import ReviewForm from "./ReviewForm"
import { ExtendedReview } from "@/types/db"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Ghost } from "lucide-react"

const Reviews = async ({propertyId, hostId}: { propertyId: string, hostId: string}) => {
    const session = await getServerSession(authOptions)
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/review/${propertyId}`, {
        cache: 'no-store'
    })

    const data: ExtendedReview[] = await response.json()
    
    const existingReview = data.filter((item) => item.guest.id === session?.user.id)

    const existingBooking = await db.booking.findFirst({
        where: {
            propertyId: propertyId,
            guestId: session?.user.id
        }
    })

    return (
        <div className="w-full border-t border-gray-300 py-4">
            {existingBooking && session?.user.id && session?.user.id !== hostId && <ReviewForm propertyId={propertyId} alreadyReviewed={existingReview[0]} />}
            <h1 className="text-xl font-bold">Reviews and ratings</h1>
            <p className="text-gray-500">Ratings and impressions by previous guests</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 py-4">
                {data.length > 0 ? data.map((item: ExtendedReview) => {
                    return <Review key={item.id} {...item} />
                }) : <div className="flex flex-col justify-center items-center py-2 gap-1">
                        <Ghost className="w-12 h-12 text-gray-400" />
                        <h2 className="text-gray-400 text-lg text-center">There are no reviews for this accomodation so far</h2>
                    </div>}
            </div>
        </div>
    )
}

export default Reviews