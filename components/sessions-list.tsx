import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

interface Session {
  time: string
  title: string
  location: string
}

export function SessionsList({ sessions }: { sessions: Session[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Today's Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sessions.map((session, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <span className="text-xs font-mono text-primary min-w-[90px] pt-0.5">{session.time}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{session.title}</p>
              {session.location && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {session.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
