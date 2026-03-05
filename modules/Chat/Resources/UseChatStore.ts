import { create } from 'zustand'
import type { Message } from '@chat/Types/Index'
import type { ConnectionStatus } from '@shared/Types/Index'

interface ChatState {
  messages: Message[]
  connectionStatus: ConnectionStatus
  isTyping: boolean

  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setConnectionStatus: (status: ConnectionStatus) => void
  setTyping: (typing: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  connectionStatus: 'disconnected',
  isTyping: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) =>
    set({
      messages,
    }),

  setConnectionStatus: (status) =>
    set({
      connectionStatus: status,
    }),

  setTyping: (typing) =>
    set({
      isTyping: typing,
    }),

  clearMessages: () =>
    set({
      messages: [],
    }),
}))
