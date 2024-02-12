import { useMutation } from "@tanstack/react-query"
import { Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"



const UpdatePrice = ({price, id}: { price: number, id: string }) => {
    const [newPrice, setNewPrice] = useState<number >(price)
    const [isUpdating, setIsUpdating] = useState<boolean >(false)

    const { mutate: updatePrice } = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/list-property/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        price: newPrice
                    })
                })

                const data = await response.json()

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
        <form className="w-full p-2 sm:p-4 pt-2 border-2 border-gray-300 shadow-sm flex flex-col gap-2" id="priceForm"
        onSubmit={(e) => {
            e.preventDefault()
            setIsUpdating(true)
            updatePrice()
        }}>
        <p className="text-lg font-semibold text-gray-800">Update Price</p>
        <div className="flex items-center gap-1">
        <input type="string" className="w-24 h-10 sm:h-12 border-2 border-gray-400 rounded-md pl-2" placeholder="Price"
        value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))}/>
        <p className="text-gray-800 ml-auto">$ Per day</p>

        <AlertDialog>
                <AlertDialogTrigger asChild disabled={isUpdating}>
                <button className="sm:w-12 sm:h-12 h-10 w-10 bg-gray-900 hover:bg-gray-800 rounded-sm text-white flex items-center justify-center">
                    {isUpdating ? <Loader2 className="animate-spin" /> : <Check />}
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
                <AlertDialogAction asChild type="submit"><button form="priceForm">Continue</button></AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
        </div>
        </form>
    )

}

export default UpdatePrice