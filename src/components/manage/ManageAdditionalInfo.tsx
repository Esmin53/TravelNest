'use client'

import { useState } from "react"
import AdditionalInfo from "../AdditionalInfo"
import { CigaretteOff, CookingPot, Heater, Loader2, PawPrint, Snowflake, WashingMachine, Wifi } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "../ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface AdditionalInfoProps {
    pets: boolean,
    airConditioning: boolean,
    kitchen: boolean,
    freeWiFi: boolean,
    washingMachine: boolean,
    noSmoking: boolean,
    heating: boolean
    id: string
}

const ManageAdditionalInfo = ({id, pets, airConditioning, kitchen, freeWiFi, washingMachine, noSmoking, heating}: AdditionalInfoProps) => {

    const [data, setData] = useState({
        pets: pets,
        airConditioning: airConditioning,
        kitchen: kitchen,
        freeWiFi: freeWiFi,
        washingMachine: washingMachine,
        noSmoking: noSmoking,
        heating: heating
    })
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

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
        <form className="w-full flex flex-col gap-2 px-2 py-4 border-2 border-gray-300 shadow-sm" id="additionalInfoForm"
        onSubmit={(e) => {
            e.preventDefault()
            setIsUpdating(true)
            updateInfo()
        }}>
            <h2 className="text-lg font-semibold pb-2">Update Additional info</h2>
            <AdditionalInfo onChange={(value: boolean) => setData({...data, pets: value})}
            title="Pets" data={data.pets} icon={<PawPrint />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, airConditioning: value})}
             title="Air Conditioning" data={data.airConditioning} icon={<Snowflake />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, kitchen: value})}
             title="Kitchen" data={data.kitchen} icon={<CookingPot />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, freeWiFi: value})}
            title="Free WiFi" data={data.freeWiFi} icon={<Wifi />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, washingMachine: value})}
            title="Washing machine" data={data.washingMachine} icon={<WashingMachine />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, noSmoking: value})}
            title="No smoking" data={data.noSmoking} icon={<CigaretteOff />} />
            <AdditionalInfo onChange={(value: boolean) => setData({...data, heating: value})}
            title="Heating" data={data.heating} icon={<Heater />} />
                <AlertDialog>
                <AlertDialogTrigger asChild>
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
                <AlertDialogAction asChild type="submit"><button form="additionalInfoForm">Continue</button></AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

        </form>
    )
}

export default ManageAdditionalInfo