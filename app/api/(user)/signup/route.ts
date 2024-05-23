
import { NextRequest, NextResponse } from 'next/server';
import { UserSchema } from '@/lib/ZodSchema/UserSchema';
import db from '@/db/db';
import bcrypt from 'bcrypt';

interface body {
  username: string;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: body = await req.json();
  console.log('On server', body);
  const parsed = UserSchema.safeParse(body);
  if (!parsed.success) {
    const error = parsed.error.errors[0].message;
    return NextResponse.json(error);
  }

  // Check if user already exists
  console.log('Requesting DB');
  const [userList, fields] = (await db.execute(
    'SELECT `user_name`, `email` FROM `users` WHERE email = ? || user_name = ?',
    [body.email, body.username]
  )) as any[];
  console.log('DB recieved');

  console.log('userList', userList);
  console.log('Fields', fields);

  // If multiple users with same email, return error
  if (userList.length > 0) {
    if (userList[0].email === body.email) {
      return NextResponse.json(
        { message: `User with email ${body.email} already exists` },
        {
          status: 400,
        }
      );
    }

    if (userList[0].user_name === body.username) {
      return NextResponse.json(
        { message: `Username ${body.username} already taken :(` },
        {
          status: 400,
        }
      );
    }
  }
  console.log('starting hash');

  // const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(body.password, 10);

  console.log('hash done');
  try {
    const [results, _] = await db.execute(
      'INSERT INTO `users` (user_name, name, email, password) VALUES (?, ?, ? , ?)',
      [body.username, body.name, body.email, hashedPassword]
    );
  } catch (err) {
    return NextResponse.json({
      message: 'Error creating user',
      status: 500,
    });
  }

  console.log('DB insertion done');
  return NextResponse.json(
    { message: 'User Registered Successfully!' },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  console.log('enter server ');
  const body = await req.json();

  return NextResponse.json('Hello');
}
