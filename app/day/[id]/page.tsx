"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDiary } from "@/lib/diary-context"
import { ContentBoard } from "@/components/content-board"
import { DayQuiz } from "@/components/day-quiz"
import { SessionsList } from "@/components/sessions-list"
import { ArrowLeft, Trophy, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DayPage() {
  const params = useParams()
  const id = params.id as string
  const dayIndex = Number.parseInt(id) - 1
  const { days, markDayComplete, unmarkDayComplete, resetDay } = useDiary()
  const day = days[dayIndex]
  const [showXPToast, setShowXPToast] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  if (!day) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Day not found</p>
      </div>
    )
  }

  const hasEntries = day.entries.length > 0
  const canMarkComplete = hasEntries && !day.completed

  const handleToggleComplete = () => {
    if (day.completed) {
      unmarkDayComplete(dayIndex)
    } else if (hasEntries) {
      const xpAwarded = markDayComplete(dayIndex)
      if (xpAwarded) {
        setShowXPToast(true)
        setTimeout(() => setShowXPToast(false), 2000)
      }
    }
  }

  const handleResetDay = () => {
    resetDay(dayIndex)
    setShowResetConfirm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* XP Toast */}
      {showXPToast && (
        <div className="fixed top-20 right-4 z-50 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right">
          <span className="font-bold">+25 XP</span> for completing the day!
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <p className="text-xs font-medium text-primary">Level {day.day}</p>
                <h1 className="font-bold text-foreground">
                  {day.title} - {day.date}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {day.xp > 0 && (
                <div className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-full">
                  <Trophy className="w-4 h-4 text-secondary-foreground" />
                  <span className="font-bold text-sm text-secondary-foreground">{day.xp} XP</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset Day</span>
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        variant={day.completed ? "default" : "outline"}
                        size="sm"
                        onClick={handleToggleComplete}
                        disabled={!hasEntries && !day.completed}
                        className={cn(
                          "gap-2",
                          day.completed && "bg-accent text-accent-foreground hover:bg-accent/90",
                          !hasEntries && !day.completed && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {!hasEntries && !day.completed ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        {day.completed ? "Completed" : "Mark Done"}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  {!hasEntries && !day.completed && (
                    <TooltipContent>
                      <p>Add content to the board first</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Quest Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-primary font-medium">Quest: {day.questName}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Sessions */}
            <SessionsList sessions={day.sessions} />

            {/* Content Board */}
            <ContentBoard dayIndex={dayIndex} entries={day.entries} />
          </div>

          {/* Sidebar - Quiz */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <DayQuiz dayIndex={dayIndex} quiz={day.quiz} completed={day.quizCompleted} />
          </aside>
        </div>
      </main>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm w-full">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Reset {day.title}?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This will remove all entries, XP, and quiz progress for this day. This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowResetConfirm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleResetDay} className="flex-1">
                  Reset Day
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
