"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ScheduleModalProps {
  onClose: () => void
}

export function ScheduleModal({ onClose }: ScheduleModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">BIP Schedule - Gamification in Academia</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="overflow-auto p-4">
          <img
            src="/images/whatsapp-20image-202025-12-10-20at-2018.jpg"
            alt="BIP Schedule December 8-12, 2025"
            className="w-full rounded-lg"
          />
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            Co-funded by the European Union • Wyższa Szkoła Gospodarki (WSG)
          </p>
        </div>
      </div>
    </div>
  )
}
