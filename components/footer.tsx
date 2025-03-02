import { MessageSquare, User, Phone, Settings } from "lucide-react"

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-border bg-background px-4 py-3">
      <div className="flex gap-4">
        <div className="relative flex items-center">
          <MessageSquare size={20} className="text-muted-foreground" />
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            12
          </span>
        </div>
        <div className="flex items-center">
          <User size={20} className="text-muted-foreground" />
        </div>
      </div>

      <div className="relative flex items-center">
        <button
          type="button"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-[70%] flex h-14 w-14 items-center justify-center rounded-full bg-[#4caf50] text-white shadow-lg transition-colors hover:bg-[#43a047]"
          style={{ top: "-5px" }}
        >
          <Phone size={24} />
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center">
          <Settings size={20} className="text-muted-foreground" />
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    </footer>
  )
}

