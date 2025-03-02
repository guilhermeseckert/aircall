"use client"

import { PhoneCall, Settings, RefreshCw } from "lucide-react"
import { useCalls } from "@/hooks/use-calls"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"

interface HeaderProps {
  activeTab: "inbox" | "archived"
  onTabChange: (tab: "inbox" | "archived") => void
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { reset, isResetting } = useCalls()

  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardHeader className="flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">Activity</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => reset()} disabled={isResetting} title="Reset all calls">
            <RefreshCw size={18} className={cn("text-muted-foreground", isResetting && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="icon" title="Settings">
            <Settings size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <div className="border-t border-border px-4 pb-4">
        <div className="mx-auto flex max-w-sm">
          <div className="relative flex w-full">
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none py-3",
                activeTab === "inbox" ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => onTabChange("inbox")}
            >
              Inbox
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "flex-1 rounded-none py-3",
                activeTab === "archived" ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => onTabChange("archived")}
            >
              Archived
            </Button>
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              style={{
                left: activeTab === "inbox" ? "0%" : "50%",
                width: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Header

