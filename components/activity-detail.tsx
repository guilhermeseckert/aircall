"use client"

import { formatDate, formatTime, formatDuration } from "@/utils/date-utils"
import { ArrowLeft, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, Archive, ArchiveRestore } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCall } from "@/hooks/use-calls"

interface ActivityDetailProps {
  callId: string
  onBack: () => void
}

export default function ActivityDetail({ callId, onBack }: ActivityDetailProps) {
  const { call, isLoading, error, archiveCall, isArchiving } = useCall(callId)

  const handleArchiveToggle = () => {
    if (!call) return
    archiveCall({ callId: call.id, isArchived: !call.is_archived })
  }

  const getCallIcon = () => {
    if (!call) return null

    if (call.call_type === "missed") {
      return <PhoneMissed className="text-red-500" size={24} />
    }
    if (call.call_type === "voicemail") {
      return <Voicemail className="text-amber-500" size={24} />
    }
    if (call.direction === "inbound") {
      return <PhoneIncoming className="text-green-500" size={24} />
    }
    return <PhoneOutgoing className="text-blue-500" size={24} />
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
        Loading call details...
      </div>
    )
  }

  if (error || !call) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
        <Button onClick={onBack} variant="ghost" className="mb-2">
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
        <p>Failed to load call details. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-border p-4">
        <Button onClick={onBack} variant="ghost" className="mr-2">
          <ArrowLeft size={18} />
        </Button>
        <h2 className="text-lg font-semibold">Call Details</h2>
      </div>

      <div className="flex flex-1 flex-col items-center p-6 md:max-w-[600px] md:self-center md:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">{getCallIcon()}</div>

        <h3 className="mb-1 text-2xl font-semibold">{call.from}</h3>
        <p className="mb-6 text-sm text-muted-foreground">via {call.via}</p>

        <div className="mb-8 grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          <div className="flex flex-col">
            <span className="mb-1 text-xs text-muted-foreground">Direction</span>
            <span className="font-medium capitalize">{call.direction}</span>
          </div>

          <div className="flex flex-col">
            <span className="mb-1 text-xs text-muted-foreground">Call Type</span>
            <span className="font-medium capitalize">{call.call_type}</span>
          </div>

          <div className="flex flex-col">
            <span className="mb-1 text-xs text-muted-foreground">Duration</span>
            <span className="font-medium">{formatDuration(call.duration)}</span>
          </div>

          <div className="col-span-2 flex flex-col md:col-span-2">
            <span className="mb-1 text-xs text-muted-foreground">Called To</span>
            <span className="font-medium">{call.to}</span>
          </div>

          <div className="col-span-2 flex flex-col md:col-span-3">
            <span className="mb-1 text-xs text-muted-foreground">Date & Time</span>
            <span className="font-medium">
              {formatDate(new Date(call.created_at))} at {formatTime(new Date(call.created_at))}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-auto w-full max-w-[300px]"
          onClick={handleArchiveToggle}
          disabled={isArchiving}
        >
          {call.is_archived ? (
            <>
              <ArchiveRestore size={16} className="mr-2" />
              Unarchive Call
            </>
          ) : (
            <>
              <Archive size={16} className="mr-2" />
              Archive Call
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

