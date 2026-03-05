import { useContext } from "react"
import { useChatStore } from "./UseChatStore"
import { SignalRContext } from "@shared/Providers/SignalRProvider"

export const useSignalR = () => {
  const context = useContext(SignalRContext)
  const chatState = useChatStore() 
  
  if (!context) {
    throw new Error('useSignalR must be used within a SignalRProvider')
  }

  return {
    ...chatState,
    sendMessage: context.sendMessage,
    isConnected: chatState.connectionStatus === 'connected',
  }
}