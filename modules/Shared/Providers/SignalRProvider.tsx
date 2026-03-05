'use client'

import React, { createContext, useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { useChatStore } from '@chat/Resources/UseChatStore'
import { useAuthStore } from '@user/Resources/UseAuthStore'
import { SIGNALR_HUB_URL } from '@shared/Types/Index'

export const SignalRContext = createContext<{ sendMessage: (msg: string) => Promise<void> } | null>(null)

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const connectionRef = useRef<signalR.HubConnection | null>(null)
    const { addMessage, setMessages, setConnectionStatus } = useChatStore()
    const { token, isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (!isAuthenticated || !token) return

        if (connectionRef.current) return

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(SIGNALR_HUB_URL, {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .build()

        connection.on('ReceiveMessage', (user, content, timestamp) => {
            addMessage({ userName: user, content, timestamp })
        })

        connection.on('LoadHistory', (history) => {
            setMessages(history)
        })

        connection.onreconnecting(() => setConnectionStatus('reconnecting'))
        connection.onreconnected(() => setConnectionStatus('connected'))
        connection.onclose(() => setConnectionStatus('disconnected'))

        async function start() {
            try {
                setConnectionStatus('connecting')
                await connection.start()
                setConnectionStatus('connected')
                console.log('✅ SignalR Conectado!')
            } catch (err) {
                console.error('❌ Erro SignalR:', err)
                setConnectionStatus('disconnected')
            }
        }

        connectionRef.current = connection
        start()

        return () => {
            connection.stop().then(() => {
                connectionRef.current = null
            })
        }
    }, [isAuthenticated, token]) 

    const sendMessage = async (message: string) => {
        if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
            await connectionRef.current.invoke('SendMessage', message)
        }
    }

    return (
        <SignalRContext.Provider value={{ sendMessage }}>
            {children}
        </SignalRContext.Provider>
    )
}
