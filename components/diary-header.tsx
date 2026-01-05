"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Gamepad2, BookOpen } from "lucide-react"

interface DiaryHeaderProps {
  onShowSchedule: () => void
}

export function DiaryHeader({ onShowSchedule }: DiaryHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Creative Learning Diary
              </h1>
              <p className="text-sm text-muted-foreground">BIP: Gamification in Academia</p>
            </div>
          </div>

          <Button variant="outline" onClick={onShowSchedule} className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">View Schedule</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
