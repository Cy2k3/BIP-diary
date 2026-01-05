"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useDiary } from "@/lib/diary-context"
import {
  Calendar,
  Trophy,
  ChevronRight,
  CheckCircle2,
  Lock,
  TrendingUp,
  BookOpen,
  CalendarDays,
  RotateCcw,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScheduleModal } from "@/components/schedule-modal"

const dayIcons = ["🎮", "🎨", "🖼️", "💼", "🏆"]

export default function HomePage() {
  const { days, totalXP, badges, resetDiary } = useDiary()
  const completedDays = days.filter((d) => d.completed).length
  const progressPercent = (completedDays / days.length) * 100
  const [showSchedule, setShowSchedule] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    resetDiary()
    setShowResetConfirm(false)
  }

  const xpToNextBadge = 60 - (totalXP % 60)
  const badgeProgress = ((totalXP % 60) / 60) * 100

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Creative Learning Diary</h1>
                <p className="text-xs text-muted-foreground">Gamification in Academia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full">
                <Trophy className="w-4 h-4 text-secondary-foreground" />
                <span className="font-bold text-secondary-foreground">{totalXP} XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">
            <Calendar className="w-3 h-3 mr-1" />
            December 8-12, 2025
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">Blended Intensive Program</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            Welcome to my memories
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => setShowSchedule(true)} className="gap-2">
              <CalendarDays className="w-4 h-4" />
              View Full Schedule
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(true)}
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Diary
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Overview */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Your Progress</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {completedDays} of {days.length} days completed
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Level 1</span>
                <span>Level 5</span>
              </div>
            </CardContent>
          </Card>

          {/* Badges Section */}
          <Card className="border-2 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-foreground">Badges Earned</span>
                </div>
                <span className="text-sm text-muted-foreground">{xpToNextBadge} XP to next badge</span>
              </div>

              {/* Badge Progress */}
              <div className="mb-4">
                <Progress value={badgeProgress} className="h-2" />
              </div>

              {/* Display Badges */}
              <div className="flex flex-wrap gap-3">
                {badges > 0 ? (
                  Array.from({ length: badges }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center"
                    >
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Complete quizzes and days to earn badges!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {days.map((day, index) => {
            const isAccessible = true
            const hasEntries = day.entries.length > 0

            return (
              <Link
                key={day.day}
                href={isAccessible ? `/day/${day.day}` : "#"}
                className={cn(!isAccessible && "pointer-events-none")}
              >
                <Card
                  className={cn(
                    "group transition-all duration-200 border-2 h-full",
                    isAccessible ? "hover:border-primary/50 hover:shadow-lg cursor-pointer" : "opacity-50",
                    day.completed && "border-accent/50 bg-accent/5",
                  )}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Day Icon */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0",
                          day.completed ? "bg-accent/20" : "bg-primary/10",
                        )}
                      >
                        {isAccessible ? dayIcons[index] : <Lock className="w-6 h-6 text-muted-foreground" />}
                      </div>

                      {/* Day Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-primary">Level {day.day}</span>
                          {day.completed && <CheckCircle2 className="w-4 h-4 text-accent" />}
                        </div>
                        <h3 className="font-bold text-foreground">{day.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{day.date}</p>
                        <p className="text-sm text-muted-foreground truncate">Quest: {day.questName}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-xs text-muted-foreground">{day.sessions.length} sessions</span>
                          {hasEntries && (
                            <Badge variant="secondary" className="text-xs">
                              {day.entries.length} entries
                            </Badge>
                          )}
                          {day.xp > 0 && (
                            <Badge variant="outline" className="text-xs">
                              +{day.xp} XP
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                          isAccessible && "group-hover:translate-x-1",
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <footer className="border-t border-border bg-card/30 py-6 mt-8">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            Created by <span className="font-semibold text-foreground">Hillary Ncube</span>
          </p>
        </div>
      </footer>

      {showSchedule && <ScheduleModal onClose={() => setShowSchedule(false)} />}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm w-full">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Reset Diary?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This will remove all your entries, XP, badges, and quiz progress. This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowResetConfirm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReset} className="flex-1">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
