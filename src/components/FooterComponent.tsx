import { authOptions } from "@/lib/auth"
import { LandscapeTypesArray, PropertyTypesArray } from "@/utils/data"
import { Facebook, Github, Instagram, Mail } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"

const FooterComponent = async () => {
    const session = await getServerSession(authOptions)

    return (
    <div className="flex w-full justify-center border-t border-gray-300 bg-slate-50 py-4 lg:py-6 shadow-sm">
            <div className="w-full max-w-7xl gap-4 flex flex-col py-2">
                <div className="flex w-full gap-4 sm:gap-6 justify-center items-center 
                text-lg xs:text-2xl  text-gray-600">
                    <Link href={'/'} className="">Home</Link>
                    <Link href={'/about-us'} className="">About us</Link>
                    <Link href={'/join-us'} className="">Join us</Link>
                    {session ? <Link href={'/list-my-property'} className="">List property</Link> 
                    : <Link href={'/sign-in'} className="">Sign in</Link>}
                </div>
                <div className="w-full flex flex-col xl:flex-row items-center xl:justify-evenly px-2 gap-2 ">
                    <div className=" w-full gap-2 xs:gap-4 grid grid-rows-2 sm:grid-rows-1 grid-flow-col xl:w-fit xs:text-center max-w-4xl 
                    xs:text-lg text-gray-600 border-b-2 xl:border-b-0 border-gray-500 py-2 xl:py-0">
                        {PropertyTypesArray.map((item) => {
                            return <Link key={item.value} href={`/accomodations?propertyType=${item.value}`}>{item.title}</Link>
                        })}
                    </div>

                    <div className="grid grid-flow-col grid-rows-3 font-semibold xs:font-normal 
                    xs:grid-rows-2 sm:grid-rows-1 w-full xl:w-fit gap-2 text-sm text-gray-600 xs:text-center">
                        {LandscapeTypesArray.map((item) => {
                            return <Link key={item.value} href={`/accomodations?landscapeType=${item.value}&`}>{item.title}</Link>
                        })}
                    </div> 
                </div>
                <div className="w-full flex justify-evenly items-center text-sm flex-wrap gap-2 p-2">
                    <div className="flex gap-4">
                        
                        <div className="relative cursor-pointer overflow-hidden hover:overflow-visible ease-in-out duration-300">
                            <p className="absolute -top-10 p-1 py-2 text-sm font-semibold bg-white rounded-sm shadow z-20">
                                tufekcic.esmin@gmail.com</p>
                            <Mail className="xs:w-5 xs:h-5 w-6 h-6"/>
                        </div>
                        <a href="https://www.facebook.com/esmin.tufekcic/" target="_blank" className="font-semibold">
                            <Facebook className="xs:w-5 xs:h-5 w-6 h-6"/>
                        </a>
                        <a href="https://www.facebook.com/esmin.tufekcic/" target="_blank" className="font-semibold">
                            <Instagram className="xs:w-5 xs:h-5 w-6 h-6"/>
                        </a>
                        <a href="https://github.com/Esmin53/TravelNest" target="_blank" className="font-semibold">
                            <Github className="xs:w-5 xs:h-5 w-6 h-6"/>
                        </a>
                    </div>
                    <p>&copy; All material herein © 2024 Travelnest Pte. Ltd. All Rights Reserved.</p>
                    <p>Images from 
                    <a href="https://www.freepik.com/" target="_blank" className="font-semibold"> Freepik </a> and 
                    <a href="https://unsplash.com/" target="_blank" className="font-semibold"> Unsplash </a></p>
                    <p>Developed by <a href="https://github.com/Esmin53" target="_blank" className="font-semibold">esmin53</a></p>
                </div>
            </div>
        </div>
  
    )
}

export default FooterComponent