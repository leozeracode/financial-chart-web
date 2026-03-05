import { useEffect, useState, useRef, useEffectEvent } from 'react';
import * as signalR from '@microsoft/signalr';

interface Message {
    userName: string;
    content: string;
    timestamp: string;
}

export const useChat = () => {
    const connectionRef = useRef<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const isMounted = useRef(true); 

    const onMessageReceived = useEffectEvent((user: string, content: string, timestamp: string) => {
        setMessages(prev => [...prev, { userName: user, content, timestamp }]);
    });

    useEffect(() => {
        isMounted.current = true;
        const token = localStorage.getItem('accessToken');
        
        if (connectionRef.current) return;

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5001/chatHub", { 
                accessTokenFactory: () => token! 
            })
            .withAutomaticReconnect()
            .build();

        async function start() {
            await new Promise(res => setTimeout(res, 100));

            if (!isMounted.current) return;

            try {
                if (newConnection.state === signalR.HubConnectionState.Disconnected) {
                    await newConnection.start();
                    if (isMounted.current) {
                        setIsConnected(true);
                        console.log("SignalR: Conexão Estabelecida.");
                        
                        newConnection.on("ReceiveMessage", onMessageReceived);
                        newConnection.on("LoadHistory", (history) => setMessages(history));
                    }
                }
            } catch (err) {
                if (isMounted.current) {
                    console.error("SignalR Start Error: ", err);
                }
            }
        }

        connectionRef.current = newConnection;
        start();

        return () => {
            isMounted.current = false; 
            if (connectionRef.current) {
                if (connectionRef.current.state === signalR.HubConnectionState.Connected) {
                    connectionRef.current.stop();
                }
                connectionRef.current = null;
                setIsConnected(false);
            }
        };
    }, []);

    const sendMessage = async (message: string) => {
        if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
            try {
                await connectionRef.current.send("SendMessage", message);
            } catch (e) {
                console.error("Erro ao enviar:", e);
            }
        }
    };

    return { messages, sendMessage, isConnected };
};