"use client"
 import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
 
const SignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean >(false)

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
            <div className="w-full max-w-md flex flex-col gap-2 items-center px-2 h-full xs:h-fit">
                <h1 className="text-lg xs:text-3xl text-gray-800 sm:mb-8">Travel Nest</h1>
                <p className="text-3xl antialiased text-center mb-auto xs:mb-0 -mt-2 xs:mt-0">Sign in or create an account</p>
                <p className="text-center xs:my-2 xs:text-md text-xs">
                    Start planning your journey anywhere in the world, or list your property with just a few clicks.
                </p>
                <button className="w-full h-10 xs:h-12 rounded-md text-white bg-blue-500 hover:bg-blue-400 font-semibold my-1 xs:my-2"
                onClick={() => {
                    setIsLoading(true)
                    signIn('google', {redirect: true, callbackUrl: 'http://localhost:3000'})
                    setIsLoading(false)
                }}>
                    { isLoading ? 
                        <span>
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </span> 
                            : 
                        <span>
                            Sign in with Google
                        </span>
                        }
                </button>
                <p className="w-full text-sm text-center py-2">or</p>
                <input type="text" className="w-full h-10 xs:h-12 px-2 border border-gray-500 rounded-md outline-none my-1 xs:my-2" placeholder="Email"/>
                <button className="w-full h-10 xs:h-12 rounded-3xl text-white bg-blue-300 font-semibold my-1 xs:my-2">
                    Continue
                </button>
                <p className="text-sm text-gray-500 mt-20">By continuing, you have read and agree to our Terms and Conditions, Privacy Statement.</p>
            </div>
        </div>
    )
}

export default SignIn