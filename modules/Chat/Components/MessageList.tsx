'use client'

import { useEffect, useRef } from 'react'
import { ScrollArea } from '@shadcn/ui/scroll-area'
import { useSignalR } from '@chat/Resources/UseSignalR'
import { MessageBubble } from '@chat/Components/MessageBubble'

export const  MessageList: React.FC = () => {
  const { messages, isTyping } = useSignalR()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No messages yet</p>
          <p className="text-muted-foreground text-sm">
            Start a conversation by sending a message
          </p>
        </div>
      </div>
    )
  }

  return (
  <ScrollArea className="flex-1 w-full h-full"> 
  <div className="flex flex-col gap-4 p-4">
        {messages.map((message, index) => (
          <MessageBubble key={`${message.userName}-${message.timestamp}-${index}`} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
            </div>
            <span className="text-sm">Someone is typing...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
