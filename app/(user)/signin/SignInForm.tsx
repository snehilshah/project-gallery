'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from '@/lib/ZodSchema/UserSchema'
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignalIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Response } from 'next-auth'
import { useEffect } from 'react'

export default function SignInForm() {
	// In case user is already logged in, redirect to home page
	const router = useRouter()
	const { data: Session } = useSession()
	useEffect(() => {
		if (Session) {
			router.push('/')
		}
	}, [Session, router])
	
	const { toast } = useToast()
	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	async function onSubmit(data: z.infer<typeof SignInSchema>) {
		try {
			const response = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			})

			if (!response?.ok) {
				toast({
					title: 'Sign Unsuccessful!',
					description: response?.error,
					variant: 'destructive',
				})
			} else {
				toast({
					title: 'Sign Successful!',
					description: 'You have been signed in successfully.',
				})
			}
		} catch (err) {
			console.log('Error in Sign In', err)
			toast({
				title: 'Sign Unsuccessful!',
				description: 'Something went wrong. Please try again later.',
				variant: 'destructive',
			})
		}
	}

	return (
		<section className="mt-4 max-w-lg mx-auto">
			<Card className="mx-auto max-w-lg shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
				<CardHeader className="">
					<CardTitle>Sign Up for your account</CardTitle>
					<CardDescription>
						Deploy your new project in one-click.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												autoComplete="username"
												placeholder="Email"
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
												autoComplete="current-password"
												placeholder="Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Sign In</Button>
						</form>
					</Form>
					<div className="divider my-6 h-1"></div>
					<div className="mx-10 inline text-sm text-gray-400">
						Already have an account?{' '}
						<SignalIcon className="inline text-gray-800" />{' '}
						<Link className="text-blue-400 hover:underline" href={'/login'}>
							Log In
						</Link>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}
