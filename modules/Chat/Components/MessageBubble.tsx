'use client'

import type { Message } from '@chat/Types/Index'
import { useAuthStore } from '@user/Resources/UseAuthStore'
import { User } from 'lucide-react'

interface MessageBubbleProps {
  message: Message
}

export const  MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { user } = useAuthStore()
  const isOwnMessage = user?.username === message.userName

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (isOwnMessage) {
    return (
      <div className="flex items-start justify-end gap-3">
        <div className="flex max-w-[75%] flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">{formattedTime}</span>
            <span className="text-sm font-medium">You</span>
          </div>
          <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="size-4 text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <User className="size-4 text-muted-foreground" />
      </div>
      <div className="flex max-w-[75%] flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message.userName}</span>
          <span className="text-muted-foreground text-xs">{formattedTime}</span>
        </div>
        <div className="bg-muted rounded-lg rounded-tl-none p-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
