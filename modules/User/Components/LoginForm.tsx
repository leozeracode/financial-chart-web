'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/modules/Shared/Shadcn/ui/button'
import { Input } from '@/modules/Shared/Shadcn/ui/input'
import { Spinner } from '@/modules/Shared/Shadcn/ui/spinner'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@shadcn/ui/card'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@shadcn/ui/form'

import { loginSchema, type LoginFormData } from '@user/Resources/Validations'
import { useAuthStore } from '@user/Resources/UseAuthStore'
import { login } from '@user/Repositories/AuthRepository'

export const LoginForm: React.FC = () => {
    const router = useRouter()
    const { setAuth, setLoading, setError, isLoading, error } = useAuthStore()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: LoginFormData) {
        setLoading(true)
        setError(null)

        try {
            const response = await login(data)

            const userMock = {
                id: `${crypto.randomUUID()}`,
                username: data.email,
                email: data.email,
                createdAt: new Date().toISOString()
            }

            setAuth(userMock, response.accessToken)
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col gap-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                                {error}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner className="mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <p className="text-muted-foreground text-center text-sm">
                            {"Don't have an account?"}{' '}
                            <Link
                                href="/register"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
