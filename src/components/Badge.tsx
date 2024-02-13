import { cn } from "@/lib/utils"
import { ReactNode } from "react"


interface BadgeProps {
    title: string
    icon: ReactNode
    containerClassName?: string
    titleClassname?: string
}

const Badge = ({ title, icon, containerClassName, titleClassname }: BadgeProps) => {


    return (
        <div className={cn(containerClassName, "flex p-1 sm:p-2 gap-1 bg-slate-100 rounded-md shadow-sm items-center")}>
            {icon}
            <p className={cn(titleClassname, "text-sm sm:text-md font-semibold text-gray-800")}>{title}</p>
        </div>
    )
}

export default Badge