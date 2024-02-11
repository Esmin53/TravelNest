import AccountInfo from "@/components/AccountInfo";
import AccountProperties from "@/components/AccountProperties";
import { Property, User } from "@prisma/client";

interface AccountInfoProps {
    params: {
        slug: string
    }
}

const Profile = async ({params}: AccountInfoProps) => {

    const { slug } = params

    const response = await fetch(`http://localhost:3000/api/account/${slug}`)

    const data: User & {property: Property[]} = await response.json()

    return (
        <div className="w-full p-2 space-y-4">

            <AccountInfo name={data?.name!} email={data?.email!} image={data?.image!} />
            <div className="w-full">
                <h1 className="text-xl font-bold">Listings</h1>
                <p className="text-gray-500">All properties listed by {data?.name}</p>
                <AccountProperties properties={data?.property} />
            </div>
        </div>
    )
}

export default Profile;