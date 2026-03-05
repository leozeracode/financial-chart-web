'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@user/Components/RegisterForm'
import { useAuthStore } from '@user/Resources/UseAuthStore'

export const RegisterPage: React.FC = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <RegisterForm />
    </main>
  )
}
