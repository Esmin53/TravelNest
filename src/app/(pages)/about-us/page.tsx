import Image from "next/image";


const AboutUs = () => {

    return (
        <div className="w-full flex flex-col justify-center max-w-6xl items-center px-2">
            <div className="w-full max-w-6xl  h-[16rem] xs:h-[22rem] sm:h-[27rem] xs:rounded-md flex flex-col mt-1
                sm:px-12 lg:px-24 gap-2 sm:gap-3 justify-center items-center relative overflow-hidden">
                <Image src='/banners/about.jpg' fill alt="Homepage banner" className="object-cover"/>
            </div>
            <p className="py-2 text-xl antialiased text-gray-600 mb-4">About Us</p>
            <p className="sm:text-3xl text-2xl text-center text-gray-800 py-1 sm:py-4">Where Wanderlust Meets Comfort:
            <br /> Your Perfect Stay Awaits! </p>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center py-2 md:py-6 space-y-4 md:gap-x-24 gap-x-12 md:mb-6">
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2 py-4 mb-6">
                <div className="w-full md:w-1/2 h-[14rem] xs:h-[24rem] md:h-[32rem] relative">
                    <Image fill src="/banners/about2.jpg" alt="Red cabin in a snowy forest" className="object-cover rounded-sm" />
                </div>
                <div className="w-full md:w-1/2 md:py-4 md:h-[32rem] gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-gray-800 md:py-2 borer-b border-gray-600">Travel the world</h1>
                    <p className="mx-2 xs:mx-16 lg:mx-32 text-center text-lg lg:text-xl text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repudiandae, maxime quasi dolorem eaque tempora, laudantium optio architecto suscipit voluptas earum, cum quae rem. Atque!</p>
                </div>
            </div>
            <p className="sm:text-3xl text-2xl text-center text-gray-800 md:py-4">Your property, our platform:
            <br /> Elevate your listing, captivate your guests. </p>
            <div className="w-full flex flex-col sm:flex-row justify-between py-6 space-y-4 md:gap-x-24 gap-x-12 md:mb-6">
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos hic et reprehenderit illum velit nesciunt voluptas quia sunt pariatur quidem.</p>
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row gap-2 py-4 mb-6">
                <div className="w-full md:w-1/2 md:py-4 md:h-[32rem] gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-gray-800 md:py-2 borer-b border-gray-600">Travel the world</h1>
                    <p className="mx-2 xs:mx-16 lg:mx-32 text-center text-lg lg:text-xl text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repudiandae, maxime quasi dolorem eaque tempora, laudantium optio architecto suscipit voluptas earum, cum quae rem. Atque!</p>
                </div>
                <div className="w-full md:w-1/2 h-[14rem] xs:h-[24rem] md:h-[32rem] relative">
                    <Image fill src="/banners/about3.jpg" alt="Red cabin in a snowy forest" className="object-cover rounded-sm" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs;1