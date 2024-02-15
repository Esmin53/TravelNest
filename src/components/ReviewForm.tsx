"use client"

import { useMutation } from "@tanstack/react-query"
import { Loader2, Star } from "lucide-react"
import { useState } from "react"
import { toast } from "./ui/use-toast"
import { ExtendedReview } from "@/types/db"
import { User } from "@prisma/client"
import Image from "next/image"
import { useSession } from "next-auth/react"

const ReviewForm = ({propertyId, alreadyReviewed}: { propertyId: string, alreadyReviewed?: ExtendedReview}) => {
    const [rating, setRating] = useState<number | null>(alreadyReviewed?.rating || null)
    const [review, setReview] = useState<string>(alreadyReviewed?.review || '')
    const [isLoading, setIsLoading] = useState(false)

    const session = useSession()

    const {mutate: postReview} = useMutation({
        mutationFn: async () => {
            try {
                if(!rating) {
                    toast({variant: 'destructive', title: 'No rating', description: 'Please rate your stay 1 - 5 before submiting your review!'});
                }
                if(!review || review.length < 3) {
                    toast({variant: 'destructive', title: 'No review', description: 'Your review must contain atleast 3 characters!'});                    
                }

                const response = await fetch(`http://localhost:3000/api/review/${propertyId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        rating,
                        review
                    })
                })

                const data = await response.json()
                toast({variant: 'default', title: 'Update succesful', description: 'Your review has been updated successfully'})
            } catch (error) {
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error publishing your review, please try again later!'});                         
            }
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    const {mutate: updateReview} = useMutation({
        mutationFn: async () => {
            try {
                if(!rating) {
                    toast({variant: 'destructive', title: 'No rating', description: 'Please rate your stay 1 - 5 before submiting your review!'});
                }
                if(!review || review.length < 3) {
                    toast({variant: 'destructive', title: 'No review', description: 'Your review must contain atleast 3 characters!'});                    
                }

                const response = await fetch(`http://localhost:3000/api/review/${propertyId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        rating,
                        review,
                        id: alreadyReviewed?.id
                    })
                })

                const data = await response.json()
                toast({variant: 'default', title: 'Update succesful', description: 'Your review has been updated successfully'})
            } catch (error) {
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error publishing your review, please try again later!'});                         
            }
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full bordr-b border-gray-300 py-4">
            <h1 className="text-xl font-bold">Rate your stay</h1>
            <p className="text-gray-500">Write a review of this accomodation based on your experience</p>
            <div className="flex gap-2 items-center pt-2 pb-1">
            <div className="w-14 h-14 rounded-full bg-gray-300 relative overflow-hidden">
                    {session.data?.user.image && <Image src={session.data?.user.image} alt="User image" fill/>}
                </div>
                <div className="flex flex-col justify-center">
                    <p>{session.data?.user.name}</p>
                    <p className="text-sm text-gray-600">{session.data?.user.email}</p>
                </div>
            </div>
            <div className="flex gap-1 py-2">
                <Star className={`w-8 h-8 text-gray-700 ${rating && rating > 0 ? 'text-yellow-400' : 'text-gray-700'} cursor-pointer`}
                 onClick={() => setRating(1)}/>
                <Star className={`w-8 h-8 text-gray-700 ${rating && rating > 1 ? 'text-yellow-400' : 'text-gray-700'} cursor-pointer`}
                 onClick={() => setRating(2)}/>
                <Star className={`w-8 h-8 text-gray-700 ${rating && rating > 2 ? 'text-yellow-400' : 'text-gray-700'} cursor-pointer`}
                 onClick={() => setRating(3)}/>
                <Star className={`w-8 h-8 text-gray-700 ${rating && rating > 3 ? 'text-yellow-400' : 'text-gray-700'} cursor-pointer`}
                 onClick={() => setRating(4)}/>
                <Star className={`w-8 h-8 text-gray-700 ${rating && rating > 4 ? 'text-yellow-400' : 'text-gray-700'} cursor-pointer`}
                 onClick={() => setRating(5)}/>

            </div>
            {alreadyReviewed ? 
                <form className="lg:w-1/2 w-full" onSubmit={(e) => {
                     e.preventDefault()
                     setIsLoading(true)
                    updateReview()
                }} id="updateReviewForm">
                <textarea placeholder="Write about your stay" value={review} onChange={(e) => setReview(e.target.value)}
                className="p-1 border-2 border-gray-300 rounded-md min-h-44 xs:min-h-52 w-full outline-none shadow-md"/>
                <button className="w-full h-10 sm:h-12 rounded-md bg-blue-400 text-white font-sembiold shadow-sm 
                hover:bg-blue-500 flex items-center justify-center"
                type="submit" form="updateReviewForm">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Update your review'}
                </button>
                </form>
                :
                <form className="lg:w-1/2 w-full" onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    postReview()
                }} id="postReviewForm">
                <textarea placeholder="Write about your stay" value={review} onChange={(e) => setReview(e.target.value)}
                className="p-1 border-2 border-gray-300 rounded-md min-h-44 xs:min-h-52 w-full outline-none shadow-md"/>
                <button className="w-full h-10 sm:h-12 rounded-md bg-blue-400 text-white font-sembiold shadow-sm
                 hover:bg-blue-500 flex items-center justify-center"
                type="submit" form="postReviewForm">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Publish your review'}
                </button>
                </form>
            }
        </div>
    )
}

export default ReviewForm