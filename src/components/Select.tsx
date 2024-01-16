"use client"

import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandItem } from "./ui/command"
import { ListPropertyRequest } from "@/lib/validators/list"


const Select = ({onChange, 
            data, 
            options}: {
    onChange: (value: string) => void;
    data: any
    options: {
        title: string
        value: string
    }[]
}) => {
    const [isOpen, setIsOpen] = useState<boolean >(false)

    return (
        <Popover open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
        <PopoverTrigger className="w-full h-10 sm:h-12 border-2 border-gray-400 rounded-md flex justify-between items-center px-2">
                <p>{
                   options.find((item) => item.value === data)?.title 
                   || <span className="text-gray-400">
                    Select property type...
                   </span>
                }</p> 
                <ChevronDown />
        </PopoverTrigger>
            <PopoverContent className="">
                <Command >
                    <CommandGroup>
                        {options.map((item) => {
                            return <CommandItem
                            key={item.value}
                            value={item.value}
                            
                            onSelect={(currentValue) => {
                                setIsOpen(false)
                                //@ts-ignore
                                onChange(currentValue)
                            }}>
                                {item.value == data && <Check className="w-5 h-5 mr-1"/>} {item.title}
                            </CommandItem>
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Select