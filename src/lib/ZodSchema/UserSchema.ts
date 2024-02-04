import { z } from 'zod'

export const UserSchema = z
	.object({
		username: z
			.string()
			.min(3, {
				message: 'Username must be at least 3 characters long',
			})
			.max(20),

		name: z
			.string()
			.min(3, {
				message: 'Name must be at least 3 characters long',
			})
			.max(20),
			
		email: z
			.string()
			.email()
			.refine((value) => !!value, {
				message: 'Valid Email is required',
			}),

		password: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.max(20, {
				message: 'Password must be at most 20 characters long',
			})
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,15}$/,
				'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
			)
			.refine((value) => !!value, { message: 'Password is required' }),

		confirmPassword: z
			.string()
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.max(20, {
				message: 'Password must be at most 20 characters long',
			})
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,15}$/,
				'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
			)
			.refine((value) => !!value, { message: 'Password is required' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
