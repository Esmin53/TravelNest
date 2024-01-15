'use client'

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

    //000556954

    const [imageUpload, setImageUpload] = useState<File[] >([])
    const [isUploading, setIsUploading] = useState<boolean >(false)
    const [isOpen, setIsOpen] = useState<boolean >(false)
    const [isLandOpen, setIsLandOpen] = useState<boolean >(false)
    const [isLoading, setIsLoading] = useState<boolean >(true)

    const router = useRouter()

    const {mutate: list} = useMutation( {
        mutationFn: async () => {
            if(!data.images.length || data.images.length === 0) {
                return
            }

            const response = await fetch('http://localhost:3000/api/list-property', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            const res = await response.json()
            //router.push(`http://localhost:3000/accomodations/${res}`)
        },
        onSettled: () => {
            setIsUploading(false)
            setData({
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
        },
    })

    const uploadImages = async () => {
        let tempArray: string[] = []
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
                    setData({...data, images: tempArray})
                resolve()
                
            } catch (error) {
                console.log(error)
                reject()
            }
        })
    }

    useEffect(() => {
        if(!data.images.length) return

        list()

    }, [data.images])

    useEffect(() => {
        if(data.rooms < 0) setData({...data, rooms: 0})
        if(data.bedrooms < 0) setData({...data, bedrooms: 0})
        if(data.bathrooms < 0) setData({...data, bathrooms: 0})

    }, [data.bedrooms, data.bathrooms, data.rooms])

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if(!session) {
                router.push('http://localhost:3000/sign-in')
            } else {
                setIsLoading(false)
            }
        }

        checkSession()

    }, [])

    if (isLoading) {
        return <div className="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-slate-50
        opacity-80 gap-1 -z-10">
            <p className="sm:text-3xl text-center antialiased p-2">Retrieving your information...</p>
            <Loader2 className="w-6 h-6 sm:w-12 sm:h-12 animate-spin" />
        </div>
    }

    return (
        <div className="w-full h-full max-w-6xl py-2">
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
                            return <img src={url} key={index} className="w-full h-full rounded-sm object-center" />
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
                        <Popover open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
                        <PopoverTrigger className="w-full h-10 sm:h-12 border-2 border-gray-400 rounded-md flex justify-between items-center px-2">
                                <p>{
                                   PropertyTypesArray.find((item) => item.value === data.propertyType)?.title 
                                   || <span className="text-gray-400">
                                    Select property type...
                                   </span>
                                }</p> 
                                <ChevronDown />
                        </PopoverTrigger>
                            <PopoverContent className="">
                                <Command >
                                    <CommandGroup>
                                        {PropertyTypesArray.map((item) => {
                                            return <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            
                                            onSelect={(currentValue) => {
                                                setIsOpen(false)
                                                //@ts-ignore
                                                setData({...data, propertyType: item.value })
                                            }}>
                                                {item.value == data.propertyType && <Check className="w-5 h-5 mr-1"/>} {item.title}
                                            </CommandItem>
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="w-full">
                        <p className="text-sm font-semibold text-gray-800">Landscape</p>
                        <Popover open={isLandOpen} onOpenChange={() => setIsLandOpen(prev => !prev)}>
                        <PopoverTrigger className="w-full h-10 sm:h-12 border-2 border-gray-400 rounded-md flex justify-between items-center px-2">
                                <p>{
                                   LandscapeTypesArray.find((item) => item.value === data.landscapeType)?.title 
                                   || <span className="text-gray-400">
                                    Select landscape type...
                                   </span>
                                }</p> 
                                <ChevronDown />
                        </PopoverTrigger>
                            <PopoverContent className="">
                                <Command>
                                    <CommandGroup>
                                        {LandscapeTypesArray.map((item) => {
                                            return <CommandItem
                                            key={item.value}
                                            value={item.value}
                                            onSelect={(currentValue) => {
                                                setIsLandOpen(false)
                                                //@ts-ignore
                                                setData({ ...data, landscapeType: item.value })
                                            }}>
                                               {item.value == data.landscapeType && <Check className="w-5 h-5 mr-1"/>} {item.title}
                                            </CommandItem>
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                <h2 className="text-lg">Additional info</h2>
                    <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <PawPrint />
                            Pets</p>
                              <div className="flex gap-1 items-center text-lg">
                                <p className={`text-sm ${data.pets === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, pets: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.pets === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, pets: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <Snowflake />
                            Air Conditioning</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.airConditioning === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, airConditioning: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.airConditioning === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, airConditioning: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <CookingPot />
                            Kitchen</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.kitchen === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, kitchen: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.kitchen === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, kitchen: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <Wifi />
                            Free WiFi</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.freeWiFi === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, freeWiFi: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.freeWiFi === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, freeWiFi: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <WashingMachine />
                            Washing machine</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.washingMachine === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, washingMachine: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.washingMachine === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, washingMachine: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <CigaretteOff />
                            No smoking</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.noSmoking === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, noSmoking: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.noSmoking === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, noSmoking: false})}>No</p> 
                            </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="text-sm sm:text-lg flex gap-2">
                            <Heater />
                            Heating</p>
                            <div className="flex gap-1 items-center text-lg">
                            <p className={`text-sm ${data.heating === true ? 'text-white bg-green-400' : 'text-green-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, heating: true})}>Yes</p> 
                                <span>/</span> 
                                <p className={`text-sm ${data.heating === false ? 'text-white bg-red-400' : 'text-red-400'} 
                                rounded-sm cursor-pointer px-2`} onClick={() => setData({...data, heating: false})}>No</p> 
                            </div>
                    </div>
                    </div>

                    <button className="w-full h-10 sm:h-12 hover:bg-blue-500 bg-blue-400 text-white 
                    rounded-md font-bold flex justify-center items-center mt-4 sm:mt-10" onClick={async (e) => {
                        e.preventDefault()
                        uploadImages().then(() => {
                            list()
                        })
                    }} disabled={isUploading}>
                        {isUploading ? <span className="animate-spin"><Loader2 /></span> : 'Submit'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ListMyProperty;