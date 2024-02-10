'use client'
import * as z from 'zod'
import { PasswordResetSchema } from '@/lib/ZodSchema/UserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
type Props = {
	token: string
}
type PasswordResetSchemaT = z.infer<typeof PasswordResetSchema>

const PasswordChangeForm = ({ token }: Props) => {
	const [success, setSuccess] = useState(false)

	const form = useForm<PasswordResetSchemaT>({
		resolver: zodResolver(PasswordResetSchema),
		mode: 'onTouched',
	})
	
	const onSubmit: SubmitHandler<PasswordResetSchemaT> = async (data) => {
		console.log(data, token)
		const response = await fetch('/api/forgotpassword', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...data, token }),
		})
		const res = await response.json()
	}

	return (
		<section className="mt-4 max-w-lg mx-auto">
			<Card className="mx-auto max-w-lg shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
				<CardHeader className="">
					<CardTitle>Create New Password</CardTitle>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="New Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmNewPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm New Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Reset</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</section>
	)
}

export default PasswordChangeForm
