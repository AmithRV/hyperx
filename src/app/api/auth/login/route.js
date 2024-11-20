import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, password } = reqBody;

    return NextResponse.json({
      message: 'succes',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
