'use client'

import { MessageList } from '@chat/Components/MessageList'
import { ChatInput } from '@chat/Components/ChatInput'
import { SignalRStatus } from '@chat/Components/SignalRStatus'

export const ChatWindow: React.FC = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold">Financial Chat</h1>
          <p className="text-muted-foreground text-sm">Real-time stock quotes</p>
        </div>
        <SignalRStatus />
      </header>

      <div className="flex-1 min-h-0">
        <MessageList />
      </div>

      <footer className="shrink-0">
        <ChatInput />
      </footer>
    </div>
  )
}
