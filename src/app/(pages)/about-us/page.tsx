import Image from "next/image";


const AboutUs = () => {

    return (
        <div className="w-full flex flex-col justify-center max-w-6xl items-center px-2 pb-6">
            <div className="w-full h-[16rem] xs:h-[22rem] sm:h-[27rem] xs:rounded-md flex flex-col mt-1
                sm:px-12 lg:px-24 gap-2 sm:gap-3 justify-center items-center relative overflow-hidden">
                <Image src='/banners/about.jpg' fill alt="Homepage banner" className="object-cover"/>
            </div>
            <p className="py-2 text-xl antialiased text-gray-600 mb-4">About Us</p>
            <p className="sm:text-3xl text-2xl text-center text-gray-800 py-1 sm:py-4">Where Wanderlust Meets Comfort:
            <br /> Your Perfect Stay Awaits! </p>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center py-2 md:py-6 space-y-4 md:gap-x-24 gap-x-12 md:mb-6">
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Welcome to a sanctuary where exploration and relaxation seamlessly intertwine - your perfect stay begins here. At Travelnest,  </p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">we&apos;ve curated an immersive experience that caters to the wanderlust in you, all while ensuring the utmost comfort throughout your journey.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Whether you&apos;re an intrepid traveler seeking new horizons or someone longing for a tranquil escape, our platform is designed to meet your unique desires..</p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2 py-4 mb-6">
                <div className="w-full md:w-1/2 h-[14rem] xs:h-[24rem] md:h-[32rem] relative">
                    <Image fill src="/banners/about2.jpg" alt="Red cabin in a snowy forest" className="object-cover rounded-sm" />
                </div>
                <div className="w-full md:w-1/2 md:py-4 md:h-[32rem] gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-gray-800 md:py-2 borer-b border-gray-600">Travel the world</h1>
                    <p className="mx-2 xs:mx-16 lg:mx-20 text-center text-lg lg:text-xl text-gray-800">Embark on a virtual adventure as you browse through our carefully selected collection of accommodations. From chic urban retreats to serene countryside hideaways, each listing is handpicked to offer a blend of wanderlust-inducing charm and the cozy comforts of home. Discover spaces that transcend the ordinary, where every stay is an opportunity to create cherished memories</p>
                </div>
            </div>
            <p className="sm:text-3xl text-2xl text-center text-gray-800 md:py-4">Your property, our platform:
            <br /> Elevate your listing, captivate your guests. </p>
            <div className="w-full flex flex-col sm:flex-row justify-between py-6 space-y-4 md:gap-x-24 gap-x-12 md:mb-6">
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">Welcome to a collaboration where your property takes center stage, and our platform becomes the canvas for its extraordinary story. At Travelnest, we believe that each property has its own unique charm waiting to be discovered.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4">With our dedicated team and innovative platform, we&apos;re here to elevate your listing beyond the ordinary, ensuring it stands out and captivates every potential guest.</p>
                <p className="sm:text-center md:text-lg text-gray-800 border-l-2 sm:border-l-0 sm:border-t-2 border-gray-500 py-2 px-2 sm:py-4"> Your property becomes more than just a listing; it becomes a destination in itself, with every detail thoughtfully presented to captivate the imagination of discerning guests.</p>
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row gap-2 py-4 mb-6">
                <div className="w-full md:w-1/2 md:py-4 md:h-[32rem] gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-gray-800 md:py-2 borer-b border-gray-600">Captivate the world</h1>
                    <p className="mx-2 xs:mx-16 lg:mx-20 text-center text-lg lg:text-xl text-gray-800">Your property becomes more than just a listing; it becomes a destination in itself, with every detail thoughtfully presented to captivate the imagination of discerning guests. From stunning visuals to compelling narratives, we work tirelessly to ensure that your property&apos;s story is told in a way that leaves a lasting impression.
                        Elevate your listing with Travelnest, where your property finds its spotlight, and guests are enchanted by the possibilities that unfold. Join us in redefining hospitality, one captivating stay at a time.</p>
                </div>
                <div className="w-full md:w-1/2 h-[14rem] xs:h-[24rem] md:h-[32rem] relative">
                    <Image fill src="/banners/about3.jpg" alt="Red cabin in a snowy forest" className="object-cover rounded-sm" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs;1