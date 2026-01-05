"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useDiary } from "@/lib/diary-context"
import type { DiaryEntry } from "@/lib/diary-data"
import {
  Plus,
  Type,
  ImageIcon,
  Sparkles,
  Video,
  X,
  Pin,
  Trash2,
  Upload,
  RotateCw,
  Move,
  Calendar,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentBoardProps {
  dayIndex: number
  entries: DiaryEntry[]
}

type EntryType = "text" | "image" | "gif" | "video"

const entryTypeConfig = {
  text: { icon: Type, label: "Note", color: "bg-blue-500/10 border-blue-500/30" },
  image: { icon: ImageIcon, label: "Image", color: "bg-green-500/10 border-green-500/30" },
  gif: { icon: Sparkles, label: "GIF", color: "bg-pink-500/10 border-pink-500/30" },
  video: { icon: Video, label: "Video", color: "bg-orange-500/10 border-orange-500/30" },
}

export function ContentBoard({ dayIndex, entries }: ContentBoardProps) {
  const { addEntry, deleteEntry, updateEntryRotation, updateEntryTimestamp } = useDiary()
  const [isAdding, setIsAdding] = useState(false)
  const [activeType, setActiveType] = useState<EntryType>("text")
  const [textContent, setTextContent] = useState("")
  const [caption, setCaption] = useState("")
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editingRotation, setEditingRotation] = useState<string | null>(null)
  const [editingTimestamp, setEditingTimestamp] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdd = () => {
    if (activeType === "text" && textContent.trim()) {
      addEntry(dayIndex, { type: "text", content: textContent, rotation: 0 })
      setTextContent("")
    } else if (filePreview) {
      addEntry(dayIndex, { type: activeType, content: filePreview, caption, rotation: 0 })
      setFilePreview(null)
      setCaption("")
    }
    setIsAdding(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    setIsAdding(false)
    setFilePreview(null)
    setTextContent("")
    setCaption("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleTypeChange = (type: EntryType) => {
    setActiveType(type)
    setFilePreview(null)
    setTextContent("")
    setCaption("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getAcceptType = () => {
    switch (activeType) {
      case "image":
        return "image/*"
      case "gif":
        return "image/gif"
      case "video":
        return "video/*"
      default:
        return ""
    }
  }

  const handleRotationChange = (entryId: string, rotation: number) => {
    updateEntryRotation(dayIndex, entryId, rotation)
  }

  const handleTimestampChange = (entryId: string, dateTimeString: string) => {
    const newDate = new Date(dateTimeString)
    if (!isNaN(newDate.getTime())) {
      updateEntryTimestamp(dayIndex, entryId, newDate)
    }
  }

  const formatDateTimeLocal = (date: Date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleDragStart = (e: React.DragEvent, entryId: string) => {
    setDraggingId(entryId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    setDraggingId(null)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Pin className="w-4 h-4 text-primary" />
            Content Board
          </CardTitle>
          <Button size="sm" onClick={() => setIsAdding(true)} className="gap-1.5">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Add New Entry Form */}
        {isAdding && (
          <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">New Entry</p>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Type Selector */}
            <div className="flex flex-wrap gap-2">
              {(Object.entries(entryTypeConfig) as [EntryType, typeof entryTypeConfig.text][]).map(([type, config]) => {
                const Icon = config.icon
                return (
                  <Button
                    key={type}
                    variant={activeType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeChange(type)}
                    className="gap-1.5"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {config.label}
                  </Button>
                )
              })}
            </div>

            {/* Input Fields */}
            {activeType === "text" ? (
              <Textarea
                placeholder="Write your thoughts, reflections, or key learnings..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <div className="space-y-3">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={getAcceptType()}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {filePreview ? (
                    <div className="space-y-3">
                      {activeType === "video" ? (
                        <video src={filePreview} controls className="max-h-[200px] mx-auto rounded-lg" />
                      ) : (
                        <img
                          src={filePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-[200px] mx-auto rounded-lg object-contain"
                        />
                      )}
                      <p className="text-xs text-muted-foreground">Click to change file</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload{" "}
                        {activeType === "gif" ? "a GIF" : activeType === "image" ? "an image" : "a video"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activeType === "video"
                          ? "MP4, WebM, etc."
                          : activeType === "gif"
                            ? "GIF files only"
                            : "JPG, PNG, WebP, etc."}
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  placeholder="Add a caption (optional)..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            )}

            <Button
              onClick={handleAdd}
              disabled={activeType === "text" ? !textContent.trim() : !filePreview}
              className="w-full"
            >
              Pin to Board
            </Button>
          </div>
        )}

        {/* Pinned Content Grid */}
        {entries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Pin className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No content pinned yet</p>
            <p className="text-xs">Add notes, images, GIFs or videos</p>
          </div>
        ) : (
          <div ref={boardRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => {
              const config = entryTypeConfig[entry.type]
              const Icon = config.icon
              const rotation = entry.rotation || 0
              const timestamp = entry.timestamp instanceof Date ? entry.timestamp : new Date(entry.timestamp)

              return (
                <div
                  key={entry.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, entry.id)}
                  onDragOver={(e) => handleDragOver(e, entry.id)}
                  onDrop={(e) => handleDrop(e, entry.id)}
                  className={cn(
                    "group relative rounded-xl border-2 p-4 transition-all hover:shadow-md cursor-grab active:cursor-grabbing",
                    config.color,
                    draggingId === entry.id && "opacity-50 scale-95",
                  )}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Control Buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 flex items-center justify-center bg-background/80 rounded-md">
                      <Move className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 bg-background/80 hover:bg-primary/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingRotation(editingRotation === entry.id ? null : entry.id)
                        setEditingTimestamp(null)
                      }}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 bg-background/80 hover:bg-primary/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingTimestamp(editingTimestamp === entry.id ? null : entry.id)
                        setEditingRotation(null)
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-7 h-7 bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteEntry(dayIndex, entry.id)
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Rotation Editor */}
                  {editingRotation === entry.id && (
                    <div
                      className="absolute -top-16 left-0 right-0 bg-card border rounded-lg p-3 shadow-lg z-10"
                      style={{ transform: `rotate(${-rotation}deg)` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Rotate:</span>
                        <Slider
                          value={[rotation]}
                          onValueChange={(value) => handleRotationChange(entry.id, value[0])}
                          min={-15}
                          max={15}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs font-mono w-8">{rotation}°</span>
                      </div>
                    </div>
                  )}

                  {editingTimestamp === entry.id && (
                    <div
                      className="absolute -top-20 left-0 right-0 bg-card border rounded-lg p-3 shadow-lg z-10"
                      style={{ transform: `rotate(${-rotation}deg)` }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Change Date & Time:</span>
                        </div>
                        <Input
                          type="datetime-local"
                          value={formatDateTimeLocal(timestamp)}
                          onChange={(e) => handleTimestampChange(entry.id, e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
                  </div>

                  {/* Content */}
                  {entry.type === "text" && (
                    <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-6">{entry.content}</p>
                  )}

                  {(entry.type === "image" || entry.type === "gif") && (
                    <div className="space-y-2">
                      <img
                        src={entry.content || "/placeholder.svg"}
                        alt={entry.caption || "Pinned media"}
                        className="w-full rounded-lg object-cover max-h-[200px]"
                      />
                      {entry.caption && <p className="text-xs text-muted-foreground italic">{entry.caption}</p>}
                    </div>
                  )}

                  {entry.type === "video" && (
                    <div className="space-y-2">
                      <video src={entry.content} controls className="w-full rounded-lg max-h-[200px]" />
                      {entry.caption && <p className="text-xs text-muted-foreground italic">{entry.caption}</p>}
                    </div>
                  )}

                  {/* Timestamp */}
                  <button
                    className="text-[10px] text-muted-foreground mt-3 hover:text-primary transition-colors flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingTimestamp(editingTimestamp === entry.id ? null : entry.id)
                      setEditingRotation(null)
                    }}
                  >
                    <Calendar className="w-3 h-3" />
                    {timestamp.toLocaleString()}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
