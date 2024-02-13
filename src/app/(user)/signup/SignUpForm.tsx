'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSchema } from '@/lib/ZodSchema/UserSchema'
import { useForm } from 'react-hook-form'
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
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	})

	async function onSubmit(data: z.infer<typeof UserSchema>) {
		const response = await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const { message } = await response.json()
		console.log('Message', message)
		if (response.status != 201) {
			toast({
				title: 'Sign Up Failed!',
				description: message,
				variant: 'destructive',
			})
		}

		if (response.status === 201) {
			toast({
				title: 'Sign Up Successful!',
				description: 'Please check your email to verify your account',
			})
			router.push('/signin')
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
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Unique Name across Project Gallery"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Your Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Email" {...field} />
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
												placeholder="Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Sign Up</Button>
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
