'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChatWindow } from '@chat/Components/ChatWindow'
import { useAuthStore } from '@user/Resources/UseAuthStore'
import { Button } from '@shadcn/ui/button'
import { LogOut } from 'lucide-react'

export const ChatPage: React.FC = () => {
    const router = useRouter()
    const { isAuthenticated, user, logout } = useAuthStore()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="flex h-screen flex-col bg-background overflow-hidden">
            <nav className="flex h-12 shrink-0 items-center justify-between border-b px-4 py-2">
                <span className="text-sm text-muted-foreground">
                    Logged in as <span className="font-medium text-foreground">{user?.username}</span>
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 size-4" />
                    Logout
                </Button>
            </nav>

            <main className="flex-1 min-h-0">
                <ChatWindow />
            </main>
        </div>
    )
}
