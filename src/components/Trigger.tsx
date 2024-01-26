import { ReactNode } from "react"

type Trigger = {
    subtitle: string
    title: string
    icon: ReactNode
}

const SearchTrigger = ({subtitle, title, icon}: Trigger) => {

    return (
        <div className="w-full border-2 border-gray-700 sm:border-gray-500 rounded-md h-10 sm:h-12 p-2 flex 
        lg:gap-2 gap-1 items-center cursor-pointer z-40 shadow-lg sm:shadow-none" onClick={() => console.log("Click")}>
          {icon}
          <span className="flex flex-col gap justify-start items-start">
            <p className="text-xs -mb-1 sm:mb-0">{subtitle}</p>
            <p className="sm:text-sm font-semibold truncate">{title}</p>
          </span>
        </div>
    )
}

export default SearchTrigger