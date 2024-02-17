import { db } from "@/lib/db"
import Image from "next/image"

interface AccountProps {
    id: string
}

const AccountInfo = async ({id}: AccountProps) => {
    
    const user = await db.user.findFirst({
        where: {
            id: id
        }
    })

    return (
        <div className="w-full p-2 xs:pb-4 flex sm:flex-row flex-col items-center sm:items-start border-b border-gray-500">
            <div className="relative h-48 w-48 bg-red-300 rounded-md overflow-hidden">
                {user?.image && <Image fill src={user?.image} alt="User profile image" />}
            </div>
            <div className="flex flex-col p-2 sm:p-4 gap-1 xs:gap-2 justify-center  flex-1">
                <h2 className="text-xl xs:text-2xl text-center sm:text-start">Name: {user?.name}</h2>
                <p className="text-md xs:text-lg truncate flex gap-1 border-b border-gray-300 pb-2 justify-center sm:justify-start"><span className="xs:flex hidden">Email:</span> {user?.email}</p>
                <p className="text-gray-700 text-sm md:text-md py-2">{user?.description}</p>
            </div>
        </div>
    )
}

export default AccountInfo