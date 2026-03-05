export interface Message {
  userName: string
  content: string
  timestamp: string
}

export interface SendMessageRequest {
  content: string
}
