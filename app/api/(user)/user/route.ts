import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(req: NextRequest) {
  const serchParams = req.nextUrl.searchParams;
  const query = serchParams.get('q')?.toLowerCase();
  let exclude: number = parseInt(serchParams.get('exclude') as string);
  if (!exclude) exclude = 0;

  const [results] = await db.query(
    'SELECT user_id, user_name, name, email  FROM `users` where ( email like ? or user_name like ? or name like ? ) and user_id not in ( ? );',
    ['%' + query + '%', '%' + query + '%', '%' + query + '%', exclude]
  );

  return NextResponse.json(results);
}
