"use client"

import { useState } from "react"
import ActivityFeed from "@/components/activity-feed"
import ActivityDetail from "@/components/activity-detail"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import "@/app/globals.css"

export default function Home() {
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"inbox" | "archived">("inbox")

  const handleCallSelect = (callId: string) => {
    setSelectedCallId(callId)
  }

  const handleBackToList = () => {
    setSelectedCallId(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 p-4 md:p-8">
      <Card className="relative flex h-[80vh] w-full min-w-[320px] max-w-[1200px] flex-col overflow-hidden shadow-lg">
        {selectedCallId ? (
          <ActivityDetail callId={selectedCallId} onBack={handleBackToList} />
        ) : (
          <>
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
            <ActivityFeed activeTab={activeTab} onCallSelect={handleCallSelect} />
            <Footer />
          </>
        )}
      </Card>
    </main>
  )
}

