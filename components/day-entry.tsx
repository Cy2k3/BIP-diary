"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { DayData, DiaryEntry } from "@/app/page"
import { ImageIcon, Video, Type, Sparkles, Trash2, CheckCircle, Clock, MapPin, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface DayEntryProps {
  day: DayData
  dayIndex: number
  onAddEntry: (dayIndex: number, entry: Omit<DiaryEntry, "id" | "timestamp">) => void
  onDeleteEntry: (dayIndex: number, entryId: string) => void
  onToggleComplete: (dayIndex: number) => void
}

type EntryType = "text" | "image" | "gif" | "video"

export function DayEntry({ day, dayIndex, onAddEntry, onDeleteEntry, onToggleComplete }: DayEntryProps) {
  const [activeType, setActiveType] = useState<EntryType | null>(null)
  const [textContent, setTextContent] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [caption, setCaption] = useState("")

  const handleAddEntry = () => {
    if (activeType === "text" && textContent.trim()) {
      onAddEntry(dayIndex, { type: "text", content: textContent })
      setTextContent("")
    } else if ((activeType === "image" || activeType === "gif" || activeType === "video") && mediaUrl.trim()) {
      onAddEntry(dayIndex, { type: activeType, content: mediaUrl, caption })
      setMediaUrl("")
      setCaption("")
    }
    setActiveType(null)
  }

  return (
    <div className="space-y-6">
      {/* Quest Header */}
      <Card className="border-2 border-primary/30 bg-card overflow-hidden">
        <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary mb-1">🎮 Quest: {day.questName}</p>
              <h2 className="text-2xl font-bold text-foreground">
                Level {day.day}: {day.title}
              </h2>
              <p className="text-muted-foreground">{day.date} 2025</p>
            </div>
            <Button
              variant={day.completed ? "default" : "outline"}
              onClick={() => onToggleComplete(dayIndex)}
              className={cn("gap-2", day.completed && "bg-accent text-accent-foreground hover:bg-accent/90")}
            >
              <CheckCircle className="w-4 h-4" />
              {day.completed ? "Completed!" : "Mark Complete"}
            </Button>
          </div>
        </div>

        {/* Sessions */}
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Today's Sessions
          </h3>
          <div className="space-y-2">
            {day.sessions.map((session, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-sm font-mono text-primary min-w-[100px]">{session.time}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{session.title}</p>
                  {session.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Entry Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Add to Your Journal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { type: "text" as const, icon: Type, label: "Text" },
              { type: "image" as const, icon: ImageIcon, label: "Image" },
              { type: "gif" as const, icon: Sparkles, label: "GIF" },
              { type: "video" as const, icon: Video, label: "Video" },
            ].map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant={activeType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveType(activeType === type ? null : type)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>

          {activeType === "text" && (
            <div className="space-y-3">
              <Textarea
                placeholder="Write your thoughts, reflections, or key learnings..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={handleAddEntry} disabled={!textContent.trim()}>
                Add Entry
              </Button>
            </div>
          )}

          {(activeType === "image" || activeType === "gif" || activeType === "video") && (
            <div className="space-y-3">
              <Input
                placeholder={`Paste ${activeType === "gif" ? "GIF" : activeType} URL...`}
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
              />
              <Input
                placeholder="Add a caption (optional)..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <Button onClick={handleAddEntry} disabled={!mediaUrl.trim()}>
                Add {activeType === "gif" ? "GIF" : activeType.charAt(0).toUpperCase() + activeType.slice(1)}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Entries */}
      {day.entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Your Journal Entries ({day.entries.length})
          </h3>

          <div className="grid gap-4">
            {day.entries.map((entry) => (
              <Card key={entry.id} className="group relative overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => onDeleteEntry(dayIndex, entry.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>

                <CardContent className="p-4">
                  {entry.type === "text" && <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>}

                  {entry.type === "image" && (
                    <div className="space-y-2">
                      <img
                        src={entry.content || "/placeholder.svg"}
                        alt={entry.caption || "Journal image"}
                        className="w-full rounded-lg object-cover max-h-[400px]"
                      />
                      {entry.caption && <p className="text-sm text-muted-foreground italic">{entry.caption}</p>}
                    </div>
                  )}

                  {entry.type === "gif" && (
                    <div className="space-y-2">
                      <img
                        src={entry.content || "/placeholder.svg"}
                        alt={entry.caption || "Journal GIF"}
                        className="w-full rounded-lg max-h-[300px] object-contain"
                      />
                      {entry.caption && <p className="text-sm text-muted-foreground italic">{entry.caption}</p>}
                    </div>
                  )}

                  {entry.type === "video" && (
                    <div className="space-y-2">
                      <video src={entry.content} controls className="w-full rounded-lg max-h-[400px]" />
                      {entry.caption && <p className="text-sm text-muted-foreground italic">{entry.caption}</p>}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-3">{entry.timestamp.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
