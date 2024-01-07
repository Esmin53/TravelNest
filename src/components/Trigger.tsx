import { ReactNode } from "react"

type Trigger = {
    subtitle: string
    title: string
    icon: ReactNode
}

const SearchTrigger = ({subtitle, title, icon}: Trigger) => {

    return (
        <div className="w-full sm:w-1/3 border-2 border-gray-700 sm:border-gray-500 rounded-md h-10 sm:h-12 p-2 flex 
        lg:gap-2 gap-1 items-center cursor-pointer z-30 shadow-lg sm:shadow-none">
          {icon}
          <span className="flex flex-col gap">
            <p className="text-xs -mb-1 sm:mb-0">{subtitle}</p>
            <p className="sm:text-sm font-semibold truncate">{title}</p>
          </span>
        </div>
    )
}

export default SearchTrigger