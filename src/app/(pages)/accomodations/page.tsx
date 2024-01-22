import Search from "@/components/Search"
import { Property } from "@prisma/client";

interface AccomodationsProps {
    params: string,
    searchParams: {
        [key: string]: string;
    }
}

const page = async ({params, searchParams}: AccomodationsProps) => {

    console.log("SearchParams: ", searchParams)

    const queryString = new URLSearchParams()

    for (const key in searchParams) {
        queryString.append(key, searchParams[key]);
      }
     
    const response = await fetch(`http://localhost:3000/api/accomodations?${queryString.toString()}`, {
        cache: 'no-store'
    })

    if (!response.ok) {
        // Handle the error, e.g., throw an exception or return an error response
        console.error(`HTTP error! Status: ${response.status}`);
        return { error: `HTTP error! Status: ${response.status}` };
      }

      const data = await response.json()

      console.log("RESPONSE: => ", data)
    return (
        <div className="w-full h-full flex-1 p-1 flex flex-col gap-2">
            <Search />
            {
                data?.map((item: Property) => {
                    return <p key={item.id} className="w-full h-20 bg-fuchsia-500 text-2xl">{item.name}</p>
                })
            }
        </div>
    )
}

export default page