import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JoinUs = () => {

    return (
        <div className="w-full justify-center items-center gap-4 flex flex-col flex-1 pb-6">
            <div className="w-full py-2 sm:py-6 flex justify-center items-center flex-col gap-4 sm:gap-6 p-2">
                <h1 className="text-center text-3xl sm:text-4xl text-gray-900 font-semibold">
                Join Travelnest</h1>
                <p className="sm:text-lg w-full sm:w-4/5 md:w-3/5 text-center">Welcome to the heart of Travelnest. Join us on a journey where connections are forged, experiences are shared, and possibilities are endless. Whether you&apos;re a traveler seeking unique stays, a property owner ready to showcase your space, or someone passionate about transforming the way we explore the world, your place is here.</p>
            </div>
            <div className="w-full flex flex-col gap-4 p-4">
                <div className="w-full h-56 xs:h-72 sm:h-96 relative rounded-md overflow-hidden">
                    <Image src={'/banners/listproperty.jpg'} fill alt="List property banner"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-log">Connect with a Global Audience</h2>
                        <p className=" text-gray-500">Welcome to a world where your space becomes a destination for guests from around the globe. Join us, and open your doors to international travelers seeking unique stays.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-log">Maximize Your Earnings with Every Stay</h2>
                        <p className=" text-gray-500">Turn your space into a lucrative asset, with each stay contributing to your financial success. Our platform empowers you to set your rates, and with our global reach, your property has the opportunity to become a sought-after destination for travelers.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-log">Effortless Achievement in Three Easy Phases</h2>
                        <p className=" text-gray-500">Whether you&apos;re a seasoned host or just beginning your hosting adventure, our intuitive tools and clear guidance make the entire experience effortless. Enjoy the simplicity of managing your property and connecting with guests globally.</p>
                    </div>

                </div>
            </div>
            
            <div className="w-full flex flex-col-reverse lg:flex-row gap-2 z-20 p-2 px-2 lg:px-6 justify-center items-center">
                <div className="w-full lg:w-1/2 flex flex-col gap-2 items-center xs:px-4 px-2">
                    <p className="text-3xl font-bold mb-2 md:mb-4 text-center">Get quality bookings quickly</p>
                    <div className="flex gap-2 items-start w-full sm:w-5/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">With straightforward steps and user-friendly tools, you can effortlessly present your property in its best light to potential guests.</p>
                    </div>
                    <div className="flex gap-2 items-start w-full sm:w-5/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">Let simplicity be your ally as you open your doors to a global audience, ensuring that every traveler can effortlessly discover and choose your unique space.</p>
                    </div>
                    <div className="flex gap-2 items-start w-full sm:w-5/6 lg:w-3/4 my-2">
                        <CheckCircle className="w-7 h-7"/>
                        <p className="flex-1">From confirming bookings to facilitating hassle-free arrivals and departures, we&apos;ve got you covered</p>
                    </div>
                    <Link href='/list-my-property' className="w-full sm:w-96 h-10 sm:h-12 bg-blue-400 hover:bg-blue-500 font-semibold rounded-md
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
                    <p className="text-3xl font-bold mb-2 md:mb-4">Start earning now</p>
                    <div className="flex  gap-1 w-full  sm:w-3/4 lg:w-full p-2 border-l-2 border-gray-300">
                        <p>Embark on the seamless journey of becoming a host by setting up your account effortlessly with just a few clicks.</p>
                    </div>
                    <div className="flex  gap-1 w-full  sm:w-3/4 lg:w-full p-2 border-l-2 border-gray-300">
                        <p className="text-start">Our streamlined process ensures that you can showcase your space quickly and effortlessly, saving you valuable time.</p>
                    </div>
                    <div className="flex  gap-1 w-full  sm:w-3/4 lg:w-full p-2 border-l-2 border-gray-300">
                        <p>Our platform offers a global stage for your unique property, ensuring that it captures the attention of travelers seeking extraordinary stays. </p>
                    </div>
                    <div className="flex  gap-1 w-full  sm:w-3/4 lg:w-full p-2 border-l-2 border-gray-300">
                        <p>Our user-friendly tools and intuitive features enable you to effortlessly coordinate arrivals and departures, ensuring a smooth and efficient process for both you and your guests. </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JoinUs;