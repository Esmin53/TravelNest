import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JoinUs = () => {

    return (
        <div className="w-full max-w-6xl justify-center items-center gap-4 flex flex-col flex-1">
            <div className="w-full flex flex-col-reverse lg:flex-row gap-2 z-20 p-2 px-2 lg:px-6 justify-center items-center">
                <div className="w-full lg:w-1/2 flex flex-col gap-2 items-center xs:px-4 px-2">
                    <p className="text-3xl font-bold mb-4 text-center">Get quality bookings quickly</p>
                    <div className="flex gap-2 items-start w-full sm:w-4/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">Your review scores on other travel websites are converted and displayed on your property page until you receive your first Booking.com guest review</p>
                    </div>
                    <div className="flex gap-2 items-start w-full sm:w-4/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">Stand out in search results with the ‘New to Travel Nest’ label on your property</p>
                    </div>
                    <div className="flex gap-2 items-start w-full sm:w-4/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">Our listing strength checklist helps you complete your property setup to attract more guests</p>
                    </div>
                    <Link href='/list-my-property' className="w-full sm:w-2/4 h-10 sm:h-12 bg-blue-400 hover:bg-blue-500 font-semibold rounded-md
                     text-white mt-4 flex justify-center items-center">Get started</Link >
                </div>
                <div className="relative w-full md:w-3/4 lg:w-1/2 h-56 xs:sm-64 sm:h-80 md:h-96">
                    <Image src='/banners/join-us.jpg' fill alt="Join us" />
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-2 z-20 p-2 px-2 lg:px-6 justify-center items-center">
                <div className="relative w-full md:w-3/4 lg:w-1/2 h-56 xs:sm-64 sm:h-80 md:h-96">
                    <Image src='/banners/join-us2.jpg' fill alt="Join us" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-2 items-center">
                    <p className="text-3xl font-bold mb-4">Start earning now</p>
                    <div className="flex gap-1 w-full  sm:w-2/3 lg:w-full rounded-md p-4 bg-slate-50 border-t-4 md:border-t-0 md:border-l-4 border-slate-300">
                        <p>Set up account in just a few clicks</p>
                    </div>
                    <div className="flex gap-1 w-full sm:w-2/3  rounded-md p-4 bg-slate-50 lg:w-full border-t-4 md:border-t-0 md:border-l-4 border-slate-300">
                        <p className="text-start">List your properthy in minutes</p>
                    </div>
                    <div className="flex gap-1 w-full sm:w-2/3  rounded-md p-4 bg-slate-50 lg:w-full border-t-4 md:border-t-0 md:border-l-4 border-slate-300">
                        <p>Get guests from all over the world</p>
                    </div>
                    <div className="flex gap-1 w-full sm:w-2/3  rounded-md p-4 bg-slate-50 lg:w-full border-t-4 md:border-t-0 md:border-l-4 border-slate-300">
                        <p>Get guests from all over the world</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JoinUs;