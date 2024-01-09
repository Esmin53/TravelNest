import Image from "next/image"


const UserAvatar = ({image}: {
        image: string
    }) => {

    return <Image src={image} alt="User Avatar" fill className="rounded-full"/>
}

export default UserAvatar;