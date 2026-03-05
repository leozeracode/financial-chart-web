'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@user/Components/LoginForm'
import { useAuthStore } from '@user/Resources/UseAuthStore'

export const LoginPage: React.FC = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm />
    </main>
  )
}
