import { ExtendedReview } from "@/types/db"
import { format } from "date-fns";
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link";


const Review = ({review, rating, guest, stayedFor, createdAt}: ExtendedReview) => {

    let ratings: JSX.Element[] = Array.from({ length: rating }, (_, index) => (
        <Star key={index} className="w-4 h-4 text-yellow-400" />
      ));
    return (
        <div className="flex flex-col gap-2 p-2">
            <Link href={`/account/${guest.id}`} className="flex gap-2 items-center">
                <div className="w-14 h-14 rounded-full bg-red-400 relative overflow-hidden">
                    {guest.image && <Image src={guest.image} alt="User image" fill/>}
                </div>
                <div className="flex flex-col justify-center">
                    <p>{guest.name}</p>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                </div>
            </Link>
            <div className="xs:w-fit w-full flex gap-2 flex-wrap justify-between">
                <div className="flex">
                    {ratings}
                </div>
                <p className="text-sm font-semibold">{format(createdAt, 'PPP')}</p>
                <p className="text-sm text-gray-600">{stayedFor}</p>
            </div>
            <p>{review}</p>
        </div>
    )
}

export default Review