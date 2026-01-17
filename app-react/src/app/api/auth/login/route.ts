import { NextRequest, NextResponse } from 'next/server';
import { createServerPb } from '@/lib/pocketbase';
import { savePbAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, record } = await request.json();

    // Create a server PB instance and set the auth
    const pb = createServerPb();
    pb.authStore.save(token, record);

    // Save to cookie
    await savePbAuthCookie(pb);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Failed to save authentication' },
      { status: 500 }
    );
  }
}
