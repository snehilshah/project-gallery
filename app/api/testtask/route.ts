import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  var data = {
    message: 'result from get',
  };

  return NextResponse.json(data);
}
