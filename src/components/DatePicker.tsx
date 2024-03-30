"use client"

import * as React from "react"
import { format, isAfter, isBefore, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({onChange, bookedDays, className}: {
    onChange: (value: Date | undefined) => void
    bookedDays?: Date[]
    className?: String
}) {
  const [date, setDate] = React.useState<Date>()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const today = new Date();

  const isDayDisabled = (day: Date) => {
      // Disable booked days
      if (bookedDays?.some(bookedDay => isSameDay(day, bookedDay))) {
          return true;
      }

      // Disable days before today
      return isBefore(day, today);
  };

  const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      onChange(date);
  };

  
    React.useEffect(() => {
        onChange(date)
    }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${className} lg:w-[280px] justify-start text-left font-normal`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={bookedDays && isDayDisabled}
          
        />
      </PopoverContent>
    </Popover>
  )
}
