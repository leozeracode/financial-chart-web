export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
export const SIGNALR_HUB_URL = `${API_BASE_URL}/chathub`

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
