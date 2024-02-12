'use client'

import { LandscapeTypesArray, PropertyTypesArray } from "@/utils/data"
import Select from "../Select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../ui/use-toast"
import { Loader2 } from "lucide-react"

interface DetailProps {
    country: string
    city: string
    location: string
    name: string
    propertyType: string
    landscapeType: string
    id: string
}

const Details = ({id, country, city, location, name, propertyType, landscapeType}: DetailProps) => {

    const [data, setData] = useState({
        country: country,
        city: city,
        location: location,
        name: name,
        propertyType: propertyType,
        landscapeType: landscapeType
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
        <div className="w-full sm:w-1/2 lg:w-1/3">
            <form className="w-full flex flex-col gap-2 p-2 sm:p-4 rounded-sm shadow-sm border-2 border-gray-300" id="infoForm"
            onSubmit={(e) => {
                e.preventDefault()
                setIsUpdating(true)
                updateInfo()
            }}>
                <h1 className="text-2xl font-semibold">Update property info</h1>
                <div className="w-full">
                    <label htmlFor="country" className="text-sm font-semibold text-gray-800">Country</label>
                    <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                       value={data.country} placeholder="country" onChange={(e) => setData({...data, country: e.target.value})}/>
                </div>
                <div className="w-full">
                    <label htmlFor="city" className="text-sm font-semibold text-gray-800">City</label>
                    <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                        value={data.city} placeholder="city" onChange={(e) => setData({...data, city: e.target.value})}/>
                </div>
                <div className="w-full">
                    <label htmlFor="location" className="text-sm font-semibold text-gray-800">Location</label>
                    <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                       value={data.location} placeholder="location" onChange={(e) => setData({...data, location: e.target.value})}/>
                </div>
                <div className="w-full">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-800">Name</label>
                    <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                       value={data.name} placeholder="name" onChange={(e) => setData({...data, name: e.target.value})}/>
                </div>
                <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Property</p>
                        <Select onChange={(value: any) => setData({
                            ...data,
                            propertyType: value
                            })} data={data.propertyType} options={PropertyTypesArray}/>
                </div>
                <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Landscape</p>
                        <Select onChange={(value: any) => setData({...data, landscapeType: value})}
                         data={data.landscapeType} options={LandscapeTypesArray} />
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
                <AlertDialogAction asChild type="submit"><button form="infoForm">Continue</button></AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </form>
        </div>
    )
}

export default Details