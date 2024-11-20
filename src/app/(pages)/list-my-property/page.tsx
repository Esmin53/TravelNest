'use client'

import { LandscapeTypesArray, PropertyTypesArray, propertyArray } from "@/utils/data";
import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Bath, Bed, Check, ChevronDown, ChevronUp, CigaretteOff, CookingPot, Heater, Loader, Loader2, PawPrint, Snowflake, Sofa, WashingMachine, Wifi } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query"
import { ListPropertyRequest } from "@/lib/validators/list";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import UserInfo from "@/components/UserInfo";
import { toast } from "@/components/ui/use-toast";
import ListMyPropertySkeleton from "@/components/skeletons/ListMyPropertySkeleton";
import Select from "@/components/Select";
import AdditionalInfo from "@/components/AdditionalInfo";

const ListMyProperty = () => {
    const [data, setData] = useState<ListPropertyRequest >({
        images: [],
        country: "",
        city: "",
        location: "",
        bedrooms: 1,
        bathrooms: 0,
        rooms: 1,
        price: 100,
        propertyType: '',
        landscapeType: '',
        name: '',
        pets: false,
        airConditioning: false,
        kitchen: false,
        freeWiFi: true,
        washingMachine: false,
        noSmoking: true,
        heating: false
    })

    const [imageUpload, setImageUpload] = useState<File[] >([])
    const [isUploading, setIsUploading] = useState<boolean >(false)
    const [isLoading, setIsLoading] = useState<boolean >(true)
    let tempArray: string[] = []

    const router = useRouter()

    const checkData = async () => {
        if(data.country.length < 2 || data.city.length < 2 || data.location.length < 2 ||  data.name.length < 2 || data.landscapeType === '' || data.propertyType === '') {
            toast({
                variant: 'destructive',
                title: 'Invalid request',
                description: 'Please provide all required information!'
            })
            return
        } 
        if(imageUpload.length < 1) {
            toast({
                variant: 'destructive',
                title: 'Invalid request',
                description: 'You have to add between 1 and 6 images'
            })
            return
        } 
        if(!data.price || data.price < 1) {
            toast({
                variant: 'destructive',
                title: 'Invalid request',
                description: 'Please provide valid price'
            })
            return
        } 

        await uploadImages()
    }

    const {mutate: list} = useMutation( {
        mutationFn: async () => {
            if(!data.images) {
                return
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/list-property`, {
                method: 'POST',
                body: JSON.stringify(data)
            })

            const res = await response.json()

            router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/accomodations/${res}`)
        },
        onSettled: () => {
            setIsUploading(false)
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Something went wrong',
                description: 'There was an error listing your property, please try again later!'
            })
        }
    })

    const uploadImages = async () => {
        return new Promise<void >(async (resolve, reject) => {
            
            if(imageUpload === null || !imageUpload?.length) {
                resolve()
                return
            }
            setIsUploading(true)
            
            try {
                const uploadPromises = imageUpload.map(async (item) => {
    
                    const imageRef = ref(storage, `images/${item.name + uuidv4() }`)
    
                     await uploadBytes(imageRef, item)
    
                     const url = await getDownloadURL(imageRef)
                        tempArray.push(url)
                    })
                    
                await Promise.all(uploadPromises)
           
                resolve()
                
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Something went wrong',
                    description: 'There was an error listing your property, please try again later!'
                })
                reject()
            }
        }).then(() => {
            setData({...data, images: tempArray})
        })
    }

    useEffect(() => {
        if(!data.images.length) {
            return
        }

        list()

    }, [data.images, list])

    useEffect(() => {
        if(data.rooms < 0) setData({...data, rooms: 0})
        if(data.bedrooms < 0) setData({...data, bedrooms: 0})
        if(data.bathrooms < 0) setData({...data, bathrooms: 0})

    }, [data.bedrooms, data.bathrooms, data.rooms, data])

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if(!session) {
                router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`)
            } else {
                setIsLoading(false)
            }
        }

        checkSession()

    }, [router])

    if (isLoading) {
        return <ListMyPropertySkeleton />
    }

    return (
        <div className="w-full h-full flex-1 py-2">
            {isUploading ? <div className="w-screen left-0 h-full z-40 fixed flex flex-col items-center justify-center bg-slate-50 top-0
            opacity-80 gap-1">
                <p className="sm:text-2xl sm:font-semibold text-center antialiased p-2">Your listing is being created, this might take few minutes</p>
                <Loader className="w-6 h-6 sm:w-10 sm:h-10 animate-spin" />
            </div> : null}
            <form className="w-full flex flex-col sm:flex-row gap-4 h-full p-1 sm:p-2 justify-center">   

                
                <div className="w-full sm:w-1/2 lg:w-2/3 flex gap-0 sm:gap-4 flex-col lg:flex-row px-0 xs:px-[15%] sm:px-2">
                <div className="w-full lg:w-1/2 p-2 flex flex-col gap-2">
                    <h2 className="text-lg">Fill in the following information</h2>
                    <div className="w-full">
                        <label htmlFor="country" className="text-sm font-semibold text-gray-800">Country</label>
                        <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                        placeholder="Country" onChange={(e) => setData({
                            ...data,
                            country: e.target.value
                        })}/>
                    </div>

                    <div className="w-full">
                        <label htmlFor="City" className="text-sm font-semibold text-gray-800">City/Region</label>
                        <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                        placeholder="City" onChange={(e) => setData({
                            ...data,
                            city: e.target.value
                        })}/>
                    </div>

                    <div className="w-full">
                        <label htmlFor="location" className="text-sm font-semibold text-gray-800">Location</label>
                        <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                        placeholder="location" onChange={(e) => setData({
                            ...data,
                            location: e.target.value
                        })}/>
                    </div>

                    <div className="w-full">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-800">Name</label>
                        <input className="w-full h-10 sm:h-12 px-2 outline-none border-2 border-gray-400 rounded-md" 
                        placeholder="Name" onChange={(e) => setData({
                            ...data,
                            name: e.target.value
                        })}/>
                    </div>
                    
                    <h2 className="text-lg mt-auto -mb-1">Host info</h2>
                    <UserInfo />
                    </div>

                    <div className="w-full lg:w-1/2 p-2 flex flex-col gap-2">
                    <h2 className="text-lg">Add some images <span className="text-sm text-gray-400">(Up to 6)</span></h2>
                    <div className="w-full h-44 xs:h-56 border-2 border-gray-400 border-dashed rounded-md cursor-pointer 
                    justify-center items-center relative grid grid-cols-3 grid-rows-2 p-1 gap-1">
                        { imageUpload?.map((item, index) => {
                            const url = URL.createObjectURL(item)
                            return <div className="relative w-full h-full" key={index}>
                                <Image fill alt="Uploaded image" src={url} className="rounded-sm object-cover" />
                            </div> 
                        })}
                             
                    </div>

                    <input type="file" multiple={true} onChange={(e) => {
                        e.preventDefault() 
                                    {/*@ts-ignore*/}
                        setImageUpload((prev) => [...prev, e.target.files[0]])}
                        }/>
                    <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Rooms</p>
                        <div className="w-full h-12 flex justify-between items-center p-1 border-b-2 border-gray-400 py-2">
                        <div className="flex gap-2 sm:gap-4 items-center">
                            <Bed />
                            <p className="font-semibold border-b-2 border-b-black">{data.bedrooms}</p>
                            <div>
                                <ChevronUp className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-sm" onClick={() => setData({
                                    ...data,
                                    bedrooms: data.bedrooms + 1,                                 
                                })}/>
                                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => setData({
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
                                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => setData({
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
                                <ChevronDown className="w-5 h-5 cursor-pointer" onClick={() => setData({
                                    ...data,
                                    rooms: data.rooms - 1                                   
                                })}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-1">
                        <p className="text-sm font-semibold text-gray-800">Price</p>
                        <div className="flex justify-between items-center">
                        <input type="string" className="w-24 h-10 sm:h-12 border-2 border-gray-400 rounded-md pl-2" placeholder="Price"
                        value={data.price} onChange={(e) => setData({...data, price: Number(e.target.value)})}/>
                        <p className="text-gray-800">$ Per day</p>

                        </div>
                    </div>
                    </div>
                    </div>         
                </div>

                <div className=" w-full sm:w-1/2 lg:w-1/3 flex gap-0 sm:gap-4 flex-col px-1 xs:px-[15%] sm:px-2 sm:py-2">
                        <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Property</p>
                        <Select onChange={(value: any) => setData({
                            ...data,
                            propertyType: value
                            })} data={data.propertyType} options={PropertyTypesArray}/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Landscape</p>
                        <Select onChange={(value: any) => setData({
                            ...data,
                            landscapeType: value
                            })} data={data.landscapeType} options={LandscapeTypesArray}/>
                    </div>
                <h2 className="text-lg">Additional info</h2>
                    <div className="w-full flex flex-col gap-2">
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
                    </div>

                    <button className="w-full h-10 sm:h-12 hover:bg-mainBlue/90 bg-mainBlue text-white 
                    rounded-md font-bold flex justify-center items-center mt-4 sm:mt-10" onClick={async (e) => {
                        e.preventDefault()
                        checkData()
                    }} disabled={isUploading}>
                        {isUploading ? <span className="animate-spin"><Loader2 /></span> : 'Submit'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ListMyProperty;