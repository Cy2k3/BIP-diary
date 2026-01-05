"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DayData } from "@/app/page"
import { Award, Star, Zap, Crown, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface BadgesPanelProps {
  days: DayData[]
}

const badges = [
  {
    id: "first-entry",
    name: "First Steps",
    description: "Add your first journal entry",
    icon: Star,
    check: (days: DayData[]) => days.some((d) => d.entries.length > 0),
  },
  {
    id: "day-complete",
    name: "Quest Master",
    description: "Complete your first day",
    icon: Target,
    check: (days: DayData[]) => days.some((d) => d.completed),
  },
  {
    id: "media-mix",
    name: "Multimedia Pro",
    description: "Use all entry types",
    icon: Zap,
    check: (days: DayData[]) => {
      const types = new Set(days.flatMap((d) => d.entries.map((e) => e.type)))
      return types.size >= 3
    },
  },
  {
    id: "halfway",
    name: "Halfway Hero",
    description: "Complete 3 days",
    icon: Award,
    check: (days: DayData[]) => days.filter((d) => d.completed).length >= 3,
  },
  {
    id: "complete",
    name: "BIP Champion",
    description: "Complete all 5 days",
    icon: Crown,
    check: (days: DayData[]) => days.every((d) => d.completed),
  },
]

export function BadgesPanel({ days }: BadgesPanelProps) {
  const earnedCount = badges.filter((b) => b.check(days)).length

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="w-5 h-5 text-secondary" />
          Achievements
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {earnedCount}/{badges.length} badges earned
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {badges.map((badge) => {
          const earned = badge.check(days)
          const Icon = badge.icon

          return (
            <div
              key={badge.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                earned ? "bg-secondary/20 border-secondary/40" : "bg-muted/30 border-border opacity-50",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  earned ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("font-medium text-sm", earned ? "text-foreground" : "text-muted-foreground")}>
                  {badge.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">{badge.description}</p>
              </div>
              {earned && <span className="text-xs font-medium text-secondary">✓</span>}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
