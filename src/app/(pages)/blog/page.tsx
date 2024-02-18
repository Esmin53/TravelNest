import Image from "next/image";

const  Blog = () => {

    return (
        <div className="w-full flex flex-col px-2 pt-1 pb-6 items-center">
            <div className="w-full h-56 xs:h-72 sm:h-96 relative rounded-sm xs:rounded-md overflow-hidden">
                <Image alt="Blog cover page" src='/banners/homepage.jpg' fill/>
            </div>
            <h2 className="text-xl text-gray-400 font-semibold w-full flex justify-center items-center">Blog</h2>
            <h1 className="text-2xl text-gray-600">Welcome to Travelnest Blog</h1>
        </div>
    )
}

export default Blog;