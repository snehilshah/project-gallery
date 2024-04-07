import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

const ForgotPasswordSchema = z.object({
	email: z
		.string()
		.email()
		.refine((value) => value !== '', {
			message: 'Email is required',
		}),
})

export async function POST(request: NextRequest) {
	const { email } = await request.json()
	console.log('UserEmail', email)

	if (!ForgotPasswordSchema.parse({ email })) {
		return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
	}

	const [userList, fields] = (await db.execute(
		'SELECT `email` FROM `users` WHERE email = ?',
		[email]
	)) as any[]

	console.log('UserList', userList)

	if (userList.length === 0) {
		return NextResponse.json(
			{ error: 'User does not exist' },
			{
				status: 400,
			}
		)
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: process.env.USER_EMAIL,
			pass: process.env.USER_PASSWORD,
		},
	})

	transporter.verify((error, success) => {
		if (error) {
			console.log(error)
		} else {
			console.log('Server is ready to take our messages')
		}
	})

	const forgotPasswordToken = randomUUID().replace(/-/g, '')
	const mailOptions = {
		from: process.env.USER_EMAIL,
		to: email,
		subject: 'Reset Password',
		text: 'Click on the link to reset your password: http://localhost:3000/resetpassword',
		html: `<a href="http://localhost:3000/resetpassword/${forgotPasswordToken}">Click here to reset your password</a>`,
	}
	try {
		const [results, fields] = await db.execute(
			'INSERT INTO `tokens` (email, token, type) VALUES (?, ?, ?)',
			[email, forgotPasswordToken, 'RESET_PASSWORD']
		)
	} catch (err) {
		console.log(err)
		return NextResponse.json({ message: 'Email sent' }, { status: 500 })
	}

	try {
		await transporter.sendMail(mailOptions)
		return NextResponse.json({ message: 'Email sent' }, { status: 200 })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: 'Email not sent' }, { status: 500 })
	}
}

export async function PATCH(request: NextRequest) {
	const { token, newPassword } = await request.json()

	try {
		const [tokenExist, fields] = (await db.execute(
			'SELECT email FROM `tokens` WHERE token = ? AND type = ?',
			[token, 'RESET_PASSWORD']
		)) as any[]

		if (tokenExist.length === 0) {
			return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
		}

		const hashedPassword = await hash(newPassword, 10)

		const [results, fields2] = await db.execute(
			'UPDATE `users` SET password = ? WHERE email = ?',
			[hashedPassword, tokenExist[0].email]
		)

		const [results3, fields3] = await db.execute(
			'DELETE FROM `tokens` WHERE token = ?',
			[token]
		)

		return NextResponse.json({ message: 'Password updated' }, { status: 201 })
	} catch (err) {
		console.log(err)
		return NextResponse.json(
			{ message: 'Error updating password' },
			{ status: 500 }
		)
	}
}
