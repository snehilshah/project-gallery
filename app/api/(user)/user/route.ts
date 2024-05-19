import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(req: NextRequest) {
  const serchParams = req.nextUrl.searchParams;
  const query = serchParams.get('q')?.toLowerCase();

  const [results, _] = await db.execute(
    'SELECT user_name, name, email  FROM `users` where email like ? or user_name like ? or name like ?;',
    ['%' + query + '%', '%' + query + '%', '%' + query + '%']
  );

  return NextResponse.json(results);
}
