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
        <div className={cn(containerClassName, "flex p-2 gap-1 bg-slate-100 rounded-md shadow-sm")}>
            {icon}
            <p className={cn(titleClassname, "font-semibold text-gray-800")}>{title}</p>
        </div>
    )
}

export default Badge