import EditProfileInfo from "@/components/EditProfileInfo"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const Settings = async () => {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect("/")
    }

    const user = await db.user.findFirst(({
        where: {
            id: session?.user.id
        }
    }))
    
    return (
        <div className="w-full flex flex-col gap-6 p-2">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold">Account info</h1>
                <p className="text-gray-500 mb-2">Update personal info for your account</p>
                {user && <EditProfileInfo data={user}/>}
            </div>
        </div>
    )
}

export default Settings