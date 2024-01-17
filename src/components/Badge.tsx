import { cn } from "@/lib/utils"
import { ReactNode } from "react"


interface BadgeProps {
    title: string
    icon: ReactNode
    className?: string
}

const Badge = ({ title, icon, className }: BadgeProps) => {


    return (
        <div className={cn(className, "flex p-2 gap-1 bg-slate-100 rounded-md shadow-sm")}>
            {icon}
            <p className="font-semibold text-gray-800">{title}</p>
        </div>
    )
}

export default Badge