import { NextRequest, NextResponse } from 'next/server'
import { UserSchema } from '@/lib/ZodSchema/UserSchema'
import db from '@/lib/db'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

interface body {
	username: string
	name: string
	email: string
	password: string
}

export async function POST(req: NextRequest) {
	const body: body = await req.json()
	console.log('On server', body)
	const parsed = UserSchema.safeParse(body)
	if (!parsed.success) {
		const error = parsed.error.errors[0].message
		return NextResponse.json(error)
	}

	// Check if user already exists
	const [userList, fields] = (await db.execute(
		'SELECT `email` FROM `users` WHERE email = ?',
		[body.email]
	)) as any[]

	// If multiple users with same email, return error
	if (userList) {
		return NextResponse.json(
			{ error: `User with email ${body.email} already exists` },
			{
				status: 400,
			}
		)
	}

	const salt = await bcrypt.genSalt(Math.random())
	const hashedPassword = await bcrypt.hash(body.password, salt)

	try {
		const [results, fields] = await db.execute(
			'INSERT INTO `users` (user_name, name, email, email_verified, password) VALUES (?, ?, ? , ?, ?)',
			[body.username, body.name, body.email, 0, hashedPassword]
		)
	} catch (err) {
		return NextResponse.json({
			error: 'Error creating user',
			errormessage: err,
			status: 500,
		})
	}

	return NextResponse.json('User Registered Successfully!')
}

export async function GET(req: NextRequest) {
	console.log('enter server ')
	const body = await req.json()

	return NextResponse.json('Hello')
}
