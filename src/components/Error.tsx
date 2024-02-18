import { Link } from "lucide-react"
import Image from "next/image"


const ErrorDialog = () => {
    
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center items-center py-4 md:py-6 gap-6 min-h-[92vh] sm:min-h-[90vh]">
            <Image width={500} height={500} alt="error" src='/error.jpg' />
            <div className="pb-10">
                <h2 className="text-center sm:text-start text-2xl sm:text-3xl font-semibold text-gray-800">There was an error getting to this page</h2>
                <p className="xs:text-lg text-gray-500 py-2 sm:py-4 text-center lg:text-start">Please refresh the page or try again later</p>
                <a href="/" className="text-sm text-blue-400 px-8 flex justify-end w-full">Back to homepage?</a>
            </div>
        </div>
    )
}

export default ErrorDialog