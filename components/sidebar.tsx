import { Button } from "@/components/ui/button"
import { Inbox, Archive, Send, File, Trash2, AlertCircle, Star, Users, Settings, LifeBuoy } from "lucide-react"

export function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="flex-1 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Inbox className="h-4 w-4" />
          Inbox
          <span className="ml-auto text-xs font-medium">128</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Star className="h-4 w-4" />
          Starred
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Send className="h-4 w-4" />
          Sent
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <File className="h-4 w-4" />
          Drafts
          <span className="ml-auto text-xs font-medium">3</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Archive className="h-4 w-4" />
          Archive
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500">
          <Trash2 className="h-4 w-4" />
          Trash
        </Button>
      </div>
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Users className="h-4 w-4" />
          Team
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <AlertCircle className="h-4 w-4" />
          Spam
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LifeBuoy className="h-4 w-4" />
          Help
        </Button>
      </div>
    </div>
  )
}

