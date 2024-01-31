import Image from "next/image"

interface AccountProps {
    name: string,
    email: string,
    image: string
}

const AccountInfo = ({name, email, image}: AccountProps) => {
    
    return (
        <div className="w-full p-2 xs:pb-4 flex sm:flex-row flex-col items-center sm:items-start border-b border-gray-500">
            <div className="relative h-48 w-48 bg-red-300 rounded-md overflow-hidden">
                <Image fill src={image} alt="User profile image" />
            </div>
            <div className="flex flex-col p-2 sm:p-4 gap-1 xs:gap-2 justify-center">
                <h2 className="text-xl xs:text-2xl text-center sm:text-start">Name: {name}</h2>
                <p className="text-md xs:text-lg truncate flex gap-1"><span className="xs:flex hidden">Email:</span> {email}</p>
            </div>
        </div>
    )
}

export default AccountInfo