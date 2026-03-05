'use client'

import { useState, useCallback } from 'react'
import { Button } from '@shadcn/ui/button'
import { Input } from '@shadcn/ui/input'
import { Spinner } from '@shadcn/ui/spinner'
import { useSignalR } from '@chat/Resources/UseSignalR'
import { Send } from 'lucide-react'

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { sendMessage, isConnected } = useSignalR()

  const isDisabled = !isConnected

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const trimmedMessage = message.trim()
      if (!trimmedMessage || isSending || isDisabled) return

      setIsSending(true)

      try {
        await sendMessage(trimmedMessage)
        setMessage('')
      } catch (error) {
        console.error('Failed to send message:', error)
      } finally {
        setIsSending(false)
      }
    },
    [message, isSending, isDisabled, sendMessage]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e as unknown as React.FormEvent)
      }
    },
    [handleSubmit]
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background p-4">
      <div className="flex items-center gap-2">
        <Input
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isDisabled ? 'Connecting...' : 'Type a message or /stock=code...'}
          disabled={isDisabled}
          className="flex-1"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isSending || isDisabled}
          aria-label="Send message"
        >
          {isSending ? <Spinner /> : <Send className="size-4" />}
        </Button>
      </div>
    </form>
  )
}
