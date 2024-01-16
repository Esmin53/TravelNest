import { ReactNode } from "react"


interface InfoProps {
    title: string
    icon: ReactNode
    data: boolean
    onChange: (value: boolean) => void
}

const AdditionalInfo = ({
    onChange,
    title,
    icon,
    data } : InfoProps) => {

    return (
        <div className="w-full flex justify-between items-center">
        <p className="text-sm sm:text-lg flex gap-2">
            {icon}
            {title}</p>
              <div className="flex gap-1 items-center text-lg">
                <p className={`text-sm ${data === true ? 'text-white bg-green-400' : 'text-green-400'} 
                rounded-sm cursor-pointer px-2`} onClick={() => onChange(true)}>Yes</p> 
                <span>/</span> 
                <p className={`text-sm ${data === false ? 'text-white bg-red-400' : 'text-red-400'} 
                rounded-sm cursor-pointer px-2`} onClick={() => onChange(false)}>No</p> 
            </div>
    </div>
    )
}

export default AdditionalInfo