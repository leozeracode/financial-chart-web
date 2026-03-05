'use client'

import { cn } from '@/modules/Shared/Shadcn/Resources/Utils'
import { useSignalR } from '@chat/Resources/UseSignalR'

const STATUS_CONFIG = {
  connected: {
    color: 'bg-green-500',
    label: 'Connected',
  },
  connecting: {
    color: 'bg-yellow-500',
    label: 'Connecting...',
  },
  reconnecting: {
    color: 'bg-yellow-500',
    label: 'Reconnecting...',
  },
  disconnected: {
    color: 'bg-red-500',
    label: 'Disconnected',
  },
} as const

export const  SignalRStatus: React.FC = () => {
  const { connectionStatus } = useSignalR()
  const config = STATUS_CONFIG[connectionStatus]

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'size-2 rounded-full',
          config.color,
          connectionStatus === 'connecting' || connectionStatus === 'reconnecting'
            ? 'animate-pulse'
            : ''
        )}
        aria-hidden="true"
      />
      <span className="text-muted-foreground text-xs">{config.label}</span>
    </div>
  )
}
