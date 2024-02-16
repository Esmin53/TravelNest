import EditProfileInfo from "@/components/EditProfileInfo"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"


const Settings = async () => {
    const session = await getServerSession(authOptions)

    const user = await db.user.findFirst(({
        where: {
            id: session?.user.id
        }
    }))
    
    return (
        <div className="w-full flex flex-col gap-6 p-2">
            {user && <EditProfileInfo data={user}/>}
        </div>
    )
}

export default Settings