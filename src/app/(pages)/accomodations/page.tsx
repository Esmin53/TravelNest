import AccomodationsFeed from "@/components/AccomodationsFeed";
import Search from "@/components/Search"

interface AccomodationsProps {
    params: string,
    searchParams: {
        [key: string]: string;
    }
}

const Page = async ({params, searchParams}: AccomodationsProps) => {

    let queryString = new URLSearchParams()


    for (const key in searchParams) {
        queryString.append(key, searchParams[key]);
      }

    return (
        <div className="w-full h-full flex-1 p-1 flex flex-col gap-2">
            <Search />
            <AccomodationsFeed queryString={queryString.toString()} />
        </div>
    )
}

export default Page