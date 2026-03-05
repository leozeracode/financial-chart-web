"use client";

import { useChat } from "@/modules/Hooks/UseChat";
import { useState, useRef, useEffect,  useEffectEvent } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const [authState, setAuthState] = useState<{ loggedIn: boolean; email: string }>({
    loggedIn: false,
    email: ""
  });

  const syncAuth = useEffectEvent(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('userEmail');

    if (!token) {
      router.replace('/login');
    } else if (!authState.loggedIn) {
      setAuthState({ loggedIn: true, email: email || 'Usuário' });
    }
  });

  useEffect(() => {
    syncAuth();
  }, [syncAuth]);

  if (!authState.loggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse">Validando credenciais seguras...</p>
      </div>
    );
  }

  return <ChatView userEmail={authState.email} />;
}

function ChatView({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { messages, sendMessage, isConnected } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && isConnected) {
      await sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleLogout = () => {
    localStorage.clear();
    router.replace('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <header className="mb-4 p-4 bg-gray-800 rounded flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold text-blue-400">Financial Chat</h1>
          <span className="text-sm text-gray-400">Identificado como: <strong className="text-white">{userEmail}</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} title={isConnected ? "Conectado" : "Desconectado"} />
          <button onClick={handleLogout} className="text-xs bg-red-900/50 hover:bg-red-600 px-3 py-1 rounded transition-colors">Sair</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-800/50 rounded p-4 mb-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((msg, idx) => {
          const isMe = msg.userName === userEmail;
          const isBot = msg.userName === "Bot";
          
          return (
            <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                isMe ? "bg-blue-700 rounded-tr-none" : 
                isBot ? "bg-indigo-900 border border-indigo-400 rounded-tl-none" : 
                "bg-gray-700 rounded-tl-none"
              }`}>
                <div className="flex justify-between items-center gap-4 text-[10px] font-bold text-gray-400 mb-1">
                  <span>{msg.userName}</span>
                  <span className="font-normal opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder={isConnected ? "Digite mensagem ou /stock=code..." : "Conectando ao Hub..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
        />
        <button
          onClick={handleSend}
          disabled={!isConnected || !input.trim()}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            isConnected ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}