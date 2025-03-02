"use client"

import type { Call } from "@/api/types/call.types"
import { formatDate, formatTime } from "@/utils/date-utils"
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, Archive, ArchiveRestore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCalls } from "@/hooks/use-calls"

interface ActivityFeedProps {
  activeTab: "inbox" | "archived"
  onCallSelect: (callId: string) => void
}

const ActivityFeed = ({ activeTab, onCallSelect }: ActivityFeedProps) => {
  const { calls, isLoading, error, archiveCall, isArchiving, archiveAll, isArchivingAll } = useCalls()

  const filteredCalls = calls.filter((call) => (activeTab === "inbox" ? !call.is_archived : call.is_archived))

  // Group calls by date
  const groupedCalls: Record<string, Call[]> = {}
  filteredCalls.forEach((call) => {
    const date = formatDate(new Date(call.created_at))
    if (!groupedCalls[date]) {
      groupedCalls[date] = []
    }
    groupedCalls[date].push(call)
  })

  const getCallIcon = (call: Call) => {
    if (call.call_type === "missed") {
      return <PhoneMissed className="text-destructive" size={18} />
    } else if (call.call_type === "voicemail") {
      return <Voicemail className="text-warning" size={18} />
    } else if (call.direction === "inbound") {
      return <PhoneIncoming className="text-primary" size={18} />
    } else {
      return <PhoneOutgoing className="text-primary" size={18} />
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-muted-foreground">Loading calls...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <p className="text-muted-foreground">Failed to load calls</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[calc(100vh-13rem)]">
      {filteredCalls.length > 0 && (
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => archiveAll(filteredCalls)}
            disabled={isArchivingAll}
          >
            {activeTab === "inbox" ? (
              <>
                <Archive className="mr-2" size={16} />
                Archive all calls
              </>
            ) : (
              <>
                <ArchiveRestore className="mr-2" size={16} />
                Unarchive all calls
              </>
            )}
          </Button>
        </div>
      )}

      {Object.keys(groupedCalls).length > 0 ? (
        Object.entries(groupedCalls).map(([date, callsForDate]) => (
          <div key={date} className="space-y-1">
            <div className="sticky top-0 bg-background/95 p-2 text-center backdrop-blur">
              <p className="text-xs font-medium text-muted-foreground">{date}</p>
            </div>
            {callsForDate.map((call) => (
              <Card
                key={call.id}
                className="group mx-2 flex cursor-pointer items-center border-0 border-b p-4 hover:bg-accent"
                onClick={() => onCallSelect(call.id)}
              >
                <div className="mr-4">{getCallIcon(call)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{call.from}</p>
                    {call.call_type === "missed" && (
                      <Badge
                        variant="destructive"
                        className="flex h-5 w-5 items-center justify-center rounded-full p-0"
                      >
                        1
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">tried to call on {call.to}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{formatTime(new Date(call.created_at))}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      archiveCall({ callId: call.id, isArchived: !call.is_archived })
                    }}
                    disabled={isArchiving}
                  >
                    {call.is_archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ))
      ) : (
        <div className="flex h-[200px] items-center justify-center">
          <p className="text-muted-foreground">No {activeTab === "inbox" ? "active" : "archived"} calls</p>
        </div>
      )}
    </ScrollArea>
  )
}

export default ActivityFeed

