"use client"

import { Trophy } from "lucide-react"

interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          <span className="font-semibold text-foreground">Adventure Progress</span>
        </div>
        <span className="text-sm font-mono text-primary">
          {completed}/{total} Levels Complete
        </span>
      </div>

      <div className="h-4 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && <div className="absolute inset-0 bg-primary-foreground/20 animate-pulse" />}
        </div>
      </div>

      <div className="flex justify-between mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < completed ? "bg-accent" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
