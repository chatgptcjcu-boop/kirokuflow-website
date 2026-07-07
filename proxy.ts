import { NextRequest, NextResponse } from 'next/server';

const locales = ['zh-TW', 'ja-JP', 'ja'];
const defaultLocale = 'ja';
const aiEntrySlugs = [
  '/ai-workflow',
  '/government-ai-trends',
  '/rag-knowledge-base',
  '/content-factory',
  '/case-studies',
  '/ai-governance',
  '/resources'
];

function detectLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('kf_locale')?.value || request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const accept = request.headers.get('accept-language') || '';
  if (accept.toLowerCase().includes('zh')) return 'zh-TW';
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/api') || pathname.startsWith('/admin') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return NextResponse.next();

  if (aiEntrySlugs.includes(pathname)) {
    request.nextUrl.pathname = `/ja${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const locale = detectLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
