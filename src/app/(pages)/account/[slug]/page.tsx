import AccountInfo from "@/components/AccountInfo";
import AccountProperties from "@/components/AccountProperties";
import ErrorDialog from "@/components/Error";
import { Property, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface AccountInfoProps {
    params: {
        slug: string
    }
}

const Profile = async ({params}: AccountInfoProps) => {

    const { slug } = params

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/${slug}`)

    const data: User & {property: Property[]} = await response.json()

    if(!data || !data?.id) {
        return <ErrorDialog />
    }

    return (
        <div className="w-full p-2 space-y-4">

            <AccountInfo id={slug}/>
            <div className="w-full">
                <h1 className="text-xl font-bold">Listings</h1>
                <p className="text-gray-500">All properties listed by {data?.name}</p>
                <AccountProperties properties={data?.property} />
            </div>
        </div>
    )
}

export default Profile;