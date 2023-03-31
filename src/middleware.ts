import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(JSON.stringify({
    url: request.url,
    method: request.method,
    geo: request.geo,
    ip: request.headers.get('x-forwarded-for'),
    useragent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString(),
  }));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest).*)',
  ],
}
