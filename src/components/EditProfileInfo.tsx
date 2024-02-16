'use client'

import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface AccountProps {
        data: User
}

const EditProfileInfo = ({data}: AccountProps) => {
    const [newName, setNewName] = useState<string >(data?.name || '')
    const [newDescription, setNewDescription] = useState(data?.description ||'')
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const {mutate: changeUsername} = useMutation({
        mutationFn: async () => {
            try {
                if(!newName || newName === data.name) {
                    toast({variant: 'destructive', title: 'No rating', description: 'Please provide a valid new username!'});
                    return
                }

                const response = await fetch('http://localhost:3000/api/account', {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: newName
                    })
                })

                const resData = await response.json()
                console.log(resData)

                toast({variant: 'default', title: 'Update succesful', description: 'Your username has been changed successfully'})
            } catch (error) {
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error updating your account, please try again later!'});                           
            }
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    const {mutate: changeDescription} = useMutation({
        mutationFn: async () => {
            try {
                if(!newDescription || newDescription === data.description) {
                    toast({variant: 'destructive', title: 'No rating', description: 'Please provide a valid new description!'});
                    return
                }

                const response = await fetch('http://localhost:3000/api/account', {
                    method: 'PUT',
                    body: JSON.stringify({
                        description: newDescription
                    })
                })

                const resData = await response.json()
                console.log(resData)

                toast({variant: 'default', title: 'Update succesful', description: 'Your description has been updated successfully'})
            } catch (error) {
                toast({variant: 'destructive', title: 'Something went wrong', description: 'There was an error updating your account, please try again later!'});                           
            }
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full p-2 xs:pb-4 flex sm:flex-row flex-col items-center sm:items-start border-b border-gray-500">
            <div className="relative h-48 w-48 bg-red-300 rounded-md overflow-hidden">
                {data?.image && <Image fill src={data?.image} alt="User profile image" />}
            </div>
            <div className="flex flex-col p-2 sm:p-4 gap-1  justify-center flex-1">
                <form className="flex flex-col w-full" id="usernameForm" onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    changeUsername()
                }}>
                    <label htmlFor="name">Update username</label>
                    <div className="flex w-full gap-1">
                        <input type="text" name="name" placeholder="Edit your username" value={newName} onChange={(e) => setNewName(e.target.value)}
                        className="lg:w-1/2 w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md "/>

                        <AlertDialog>
                            <AlertDialogTrigger asChild disabled={isLoading}>
                                <button className="w-12 h-12 bg-blue-400 flex justify-center items-center text-white rounded-md shadow-sm
                                     hover:bg-blue-500">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <Check />}</button>
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
                                    <AlertDialogAction asChild type="submit"><button form="usernameForm">Continue</button></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>
                <form className="w-full lg:w-[35.25rem]" id="descriptionForm" onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    changeDescription()
                }}>
                <label htmlFor="description">Description</label>
                <textarea placeholder="Tell your future guests about yourself" value={newDescription} 
                onChange={(e) => setNewDescription(e.target.value)} name="description"
                className="p-1 border-2 border-gray-400 rounded-md min-h-44 xs:min-h-52 w-full outline-none shadow-sm"/>
                <AlertDialog>
                <AlertDialogTrigger asChild disabled={isLoading}>
                <button className="w-full h-10 sm:h-12 rounded-md bg-blue-400 text-white font-sembiold shadow-sm
                 hover:bg-blue-500 flex items-center justify-center">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Update description'}
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
                <AlertDialogAction asChild type="submit"><button form="descriptionForm">Continue</button></AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
                </form>
            </div>
        </div>
    )
}

export default EditProfileInfo;