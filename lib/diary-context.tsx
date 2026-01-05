"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { initialDays, type DayData, type DiaryEntry } from "./diary-data"

interface DiaryContextType {
  days: DayData[]
  totalXP: number
  badges: number
  addEntry: (dayIndex: number, entry: Omit<DiaryEntry, "id" | "timestamp">) => void
  deleteEntry: (dayIndex: number, entryId: string) => void
  markDayComplete: (dayIndex: number) => boolean
  unmarkDayComplete: (dayIndex: number) => void
  completeQuiz: (dayIndex: number, earnedXP: number) => void
  resetDiary: () => void
  resetDay: (dayIndex: number) => void
  updateEntryPosition: (dayIndex: number, entryId: string, position: { x: number; y: number }) => void
  updateEntryRotation: (dayIndex: number, entryId: string, rotation: number) => void
  updateEntryTimestamp: (dayIndex: number, entryId: string, timestamp: Date) => void
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined)

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState<DayData[]>(initialDays)

  const totalXP = days.reduce((acc, day) => acc + day.xp, 0)
  const badges = Math.floor(totalXP / 60)

  const addEntry = (dayIndex: number, entry: Omit<DiaryEntry, "id" | "timestamp">) => {
    setDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              entries: [
                ...day.entries,
                {
                  ...entry,
                  id: crypto.randomUUID(),
                  timestamp: new Date(),
                  position: entry.position || { x: 0, y: 0 },
                  rotation: entry.rotation || 0,
                },
              ],
            }
          : day,
      ),
    )
  }

  const deleteEntry = (dayIndex: number, entryId: string) => {
    setDays((prev) =>
      prev.map((day, i) => (i === dayIndex ? { ...day, entries: day.entries.filter((e) => e.id !== entryId) } : day)),
    )
  }

  const markDayComplete = (dayIndex: number): boolean => {
    let xpAwarded = false
    setDays((prev) =>
      prev.map((day, i) => {
        if (i === dayIndex) {
          // Only award XP if not already claimed
          if (!day.dayCompletedXPClaimed) {
            xpAwarded = true
            return { ...day, completed: true, dayCompletedXPClaimed: true, xp: day.xp + 25 }
          }
          return { ...day, completed: true }
        }
        return day
      }),
    )
    return xpAwarded
  }

  const unmarkDayComplete = (dayIndex: number) => {
    setDays((prev) => prev.map((day, i) => (i === dayIndex ? { ...day, completed: false } : day)))
  }

  const completeQuiz = (dayIndex: number, earnedXP: number) => {
    setDays((prev) =>
      prev.map((day, i) => (i === dayIndex ? { ...day, quizCompleted: true, xp: day.xp + earnedXP } : day)),
    )
  }

  const resetDiary = () => {
    setDays(
      initialDays.map((day) => ({
        ...day,
        entries: [],
        completed: false,
        quizCompleted: false,
        dayCompletedXPClaimed: false,
        xp: 0,
      })),
    )
  }

  const resetDay = (dayIndex: number) => {
    setDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              entries: [],
              completed: false,
              quizCompleted: false,
              dayCompletedXPClaimed: false,
              xp: 0,
            }
          : day,
      ),
    )
  }

  const updateEntryPosition = (dayIndex: number, entryId: string, position: { x: number; y: number }) => {
    setDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              entries: day.entries.map((entry) => (entry.id === entryId ? { ...entry, position } : entry)),
            }
          : day,
      ),
    )
  }

  const updateEntryRotation = (dayIndex: number, entryId: string, rotation: number) => {
    setDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              entries: day.entries.map((entry) => (entry.id === entryId ? { ...entry, rotation } : entry)),
            }
          : day,
      ),
    )
  }

  const updateEntryTimestamp = (dayIndex: number, entryId: string, timestamp: Date) => {
    setDays((prev) =>
      prev.map((day, i) =>
        i === dayIndex
          ? {
              ...day,
              entries: day.entries.map((entry) => (entry.id === entryId ? { ...entry, timestamp } : entry)),
            }
          : day,
      ),
    )
  }

  return (
    <DiaryContext.Provider
      value={{
        days,
        totalXP,
        badges,
        addEntry,
        deleteEntry,
        markDayComplete,
        unmarkDayComplete,
        completeQuiz,
        resetDiary,
        resetDay,
        updateEntryPosition,
        updateEntryRotation,
        updateEntryTimestamp,
      }}
    >
      {children}
    </DiaryContext.Provider>
  )
}

export function useDiary() {
  const context = useContext(DiaryContext)
  if (!context) throw new Error("useDiary must be used within DiaryProvider")
  return context
}
