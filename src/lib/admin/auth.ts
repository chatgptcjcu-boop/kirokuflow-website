import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const adminCookieName = 'kf_admin';

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'kiroku-admin';
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === '1';
}

export function isAdminRequest(request: NextRequest) {
  return request.cookies.get(adminCookieName)?.value === '1';
}
