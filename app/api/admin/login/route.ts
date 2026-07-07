import { NextRequest, NextResponse } from 'next/server';
import { adminCookieName, getAdminPassword } from '@/src/lib/admin/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.password !== getAdminPassword()) {
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, '1', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}
