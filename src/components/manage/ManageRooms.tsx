'use client'

import { useMutation } from "@tanstack/react-query"
import { Bath, Bed, ChevronDown, ChevronUp, Loader2, Sofa } from "lucide-react"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"


interface RoomProps {
    bedrooms: number
    bathrooms: number
    rooms: number
    id: string
}

const ManageRooms = ({id, bedrooms, bathrooms, rooms}: RoomProps) => {
    const [data, setData] = useState({
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        rooms: rooms
    })

    const [isUpdating, setIsUpdating] = useState<boolean >(false)

    const { mutate: updateInfo } = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/list-property/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...data
                    })
                })

                const resData = await response.json()

                toast({variant: 'default', title: 'Success', description: 'Data updated successfully!'})
                console.log(resData)
            } catch (error) {
                console.log(error)
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error updating your property, please try again later!'})
            }
        },
        onSettled: () => {
            setIsUpdating(false)
        }
    })

    return (
        <form  id="roomsForm" onSubmit={(e) => {
            e.preventDefault()
            setIsUpdating(true)
            updateInfo()
        }} className="w-full border-2 border-gray-300 shadow-sm p-2 sm:p-4 min-h-fit">
        <p className="text-md font-semibold text-gray-800">Update Rooms</p>
        <div className="w-full h-12 flex justify-between items-center p-1 border-b-2 border-gray-400 mb-2">
        <div className="flex gap-2 sm:gap-4 items-center">
            <Bed />
            <p className="font-semibold border-b-2 border-b-black">{data.bedrooms}</p>
            <div>
                <ChevronUp className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-sm" onClick={() => setData({
                    ...data,
                    bedrooms: data.bedrooms + 1,                                 
                })}/>
                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => data.bedrooms !== 0 && setData({
                    ...data,
                    bedrooms: data.bedrooms - 1,                               
                })}/>
            </div>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
            <Bath />
            <p className="font-semibold border-b-2 border-b-black">{data.bathrooms}</p>
            <div>
            <ChevronUp className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-sm" onClick={() => setData({
                    ...data,
                    bathrooms: data.bathrooms + 1,                                  
                })}/>
                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => data.bathrooms !== 0 && setData({
                    ...data,
                    bathrooms: data.bathrooms - 1,                                  
                })}/>
            </div>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
            <Sofa />
            <p className="font-semibold border-b-2 border-b-black">{data.rooms}</p>
            <div>
            <ChevronUp className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-sm" onClick={() => setData({
                    ...data,
                    rooms: data.rooms + 1                                   
                })}/>
                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => data.rooms !== 0 && setData({
                    ...data,
                    rooms: data.rooms - 1                                   
                })}/>
            </div>
        </div>
    </div>
    <AlertDialog>
                <AlertDialogTrigger asChild disabled={isUpdating}>
                <button
                className="w-full h-10 sm:h-12 rounded-sm bg-gray-900 hover:bg-gray-800 text-white flex justify-center items-center">
                    {isUpdating ? (<Loader2 className="animate-spin"/>) : ('Save changes')}
                </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                Are you 100% sure you want to save these changes.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild type="submit"><button form="roomsForm">Continue</button></AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
    </form>
    )
}

export default ManageRooms