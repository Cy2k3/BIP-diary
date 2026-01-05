"use client"

import { cn } from "@/lib/utils"
import type { DayData } from "@/app/page"
import { CheckCircle2, Circle, Star } from "lucide-react"

interface DayNavigationProps {
  days: DayData[]
  selectedDay: number
  onSelectDay: (index: number) => void
}

export function DayNavigation({ days, selectedDay, onSelectDay }: DayNavigationProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {days.map((day, index) => (
        <button
          key={day.day}
          onClick={() => onSelectDay(index)}
          className={cn(
            "flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all duration-200",
            "flex flex-col items-center min-w-[100px]",
            selectedDay === index
              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
              : "border-border bg-card hover:border-primary/50",
            day.completed && "bg-accent/20 border-accent",
          )}
        >
          <div className="flex items-center gap-1 mb-1">
            {day.completed ? (
              <CheckCircle2 className="w-4 h-4 text-accent" />
            ) : selectedDay === index ? (
              <Star className="w-4 h-4 text-primary" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-xs font-medium text-muted-foreground">Level {day.day}</span>
          </div>
          <span className="font-bold text-foreground">{day.title}</span>
          <span className="text-xs text-muted-foreground">{day.date}</span>
        </button>
      ))}
    </div>
  )
}
