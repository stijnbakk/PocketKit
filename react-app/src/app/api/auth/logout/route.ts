import { NextResponse } from 'next/server';
import { clearPbAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    await clearPbAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Failed to clear authentication' },
      { status: 500 }
    );
  }
}
